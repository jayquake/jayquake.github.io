import 'dotenv/config'; // Load environment variables from .env file
import cors from 'cors';
import express from 'express';
import { existsSync, readFileSync, statSync } from 'fs';
import { createServer } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { join } from 'path';
import { WebSocket, WebSocketServer } from 'ws';

import type { FlowConfig, ProgressUpdate, TestRunConfig } from '../../shared/types';

import { TestRunSummary } from '../../shared/domain/valueObjects/TestRunSummary';
import { PlaywrightUIService } from '../../shared/utils/PlaywrightUIService';
import { ReportPathResolver } from '../../shared/utils/ReportPathResolver';
import { errorHandler, notFoundHandler, performanceMonitor, requestLogger } from './api/middleware';
import artifactsRouter from './api/routes/artifacts';
import cleanupRouter from './api/routes/cleanup';
import databaseRouter from './api/routes/database';
import environmentsRouter from './api/routes/environments';
import mcpRouter from './api/routes/mcp';
import projectsRouter from './api/routes/projects';
import qaseRouter from './api/routes/qase';
import ruleAnalysisRouter, { setRuleLabBroadcast } from './api/routes/ruleAnalysis';
import rulesRouter from './api/routes/rules';
import slackRouter from './api/routes/slack';
import testRunsRouter, { setBroadcastFunction } from './api/routes/testRuns';
import { FlowOrchestrator } from './flowOrchestrator';
import { ProjectManager } from './infrastructure/config/ProjectManager';
import { DatabaseService } from './infrastructure/database/DatabaseService';
import { PathUtils } from './infrastructure/utils/PathUtils';
import { ResultsStorage } from './resultsStorage';
import { MCPService } from './services/MCPService';
import { QaseService } from './services/QaseService';
import { ReportService } from './services/ReportService';
import { TestRunner } from './testRunner';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ path: '/ws', server });

app.use(cors());
app.use(express.json());

// Request logging and monitoring middleware
app.use(requestLogger);
app.use(performanceMonitor(1000)); // Warn for requests taking >1 second

// Serve static files from frontend dist in production
const frontendDist = join(__dirname, '../../build');
app.use(express.static(frontendDist));

// Serve MCP output files (screenshots, traces) as static assets
const mcpOutputDir = join(__dirname, '../../mcp/mcp-output');
app.use('/mcp-output', express.static(mcpOutputDir));

// Initialize DatabaseService first (singleton)
const databaseService = DatabaseService.getInstance();
databaseService.connect().catch((error) => {
  console.error('[Server] Failed to connect to database:', error);
});

// Initialize services with OOP architecture
const projectManager = new ProjectManager();
const testRunner = new TestRunner(); // Keep for backward compatibility with FlowOrchestrator
const flowOrchestrator = new FlowOrchestrator(testRunner, projectManager);
const resultsStorage = new ResultsStorage(); // Keep for backward compatibility
const qaseService = new QaseService();
const reportService = new ReportService();
const playwrightUIService = new PlaywrightUIService();

// Initialize MCP service with centralized config
import { getMcpConfig } from './config/mcp';
const mcpConfig = getMcpConfig();
const mcpService = new MCPService(mcpConfig.url, reportService);

// WebSocket connections
const clients = new Map<string, WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  const clientId = Math.random().toString(36).substring(7);
  clients.set(clientId, ws);
  console.log(`[WebSocket] Client connected: ${clientId}`);

  // Send pong in response to ping to keep connection alive
  ws.on('message', (message: string) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.type === 'ping') {
        // Respond to ping with pong
        ws.send(JSON.stringify({ timestamp: data.timestamp, type: 'pong' }));
      }
    } catch {
      // Ignore parse errors
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log(`[WebSocket] Client disconnected: ${clientId}`);
  });

  ws.on('error', (error) => {
    console.error(`[WebSocket] Error for client ${clientId}:`, error);
  });

  // Send initial connection confirmation
  ws.send(JSON.stringify({ clientId, type: 'connected' }));
});

function broadcastToClients(data: any): void {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Set broadcast function for test runs router
setBroadcastFunction(broadcastToClients);

// Give MCPService access to broadcast so it can send real-time navigation progress
mcpService.setBroadcast(broadcastToClients);

// Give RuleAnalysisService access to broadcast for real-time analysis/discovery progress
setRuleLabBroadcast(broadcastToClients);

// Initialize project root for reports (needed before route definitions)
const projectRoot = PathUtils.getProjectRoot();
console.log(`[Server] Using project root for reports: ${projectRoot}`);

// API endpoint to check if report exists and get its path
// This must be defined BEFORE the /api/runs router is mounted to take precedence
app.get('/api/runs/:runId/report', async (req, res) => {
  try {
    const { runId } = req.params;
    console.log('[Server] Checking report for runId:', runId);

    const { TestRunRepository } = await import('./repositories/TestRunRepository');
    const prisma = DatabaseService.getInstance().getClient();
    const testRunRepository = new TestRunRepository(prisma);
    const run = await testRunRepository.findByRunId(runId);

    // Get reportPath from database if run exists, otherwise try to find it on filesystem
    let dbReportPath: null | string = null;
    if (run) {
      dbReportPath = run.reportPath;
      console.log('[Server] Found run in database, reportPath from DB:', dbReportPath);
    } else {
      console.warn('[Server] Run not found in database, will check filesystem:', runId);
    }

    const resolver = new ReportPathResolver(projectRoot);
    const reportPath = resolver.resolveReportPath(runId, dbReportPath || undefined);
    console.log('[Server] Resolved report path:', reportPath);

    const reportFolder = join(projectRoot, reportPath);
    console.log('[Server] Full report folder path:', reportFolder);

    if (!reportFolder) {
      console.warn('[Server] Report folder is empty');
      return res.status(404).json({ error: 'Report not found' });
    }

    const indexPath = join(reportFolder, 'index.html');
    console.log('[Server] Checking for index.html at:', indexPath);

    if (!existsSync(indexPath)) {
      console.warn('[Server] index.html not found at:', indexPath);
      console.log('[Server] All possible paths:', resolver.getAllPossiblePaths(runId));
      return res.json({
        checkedPath: indexPath,
        error: 'Report not found',
        exists: false,
        possiblePaths: resolver.getAllPossiblePaths(runId),
      });
    }

    const relativePath = reportFolder.replace(projectRoot, '').replace(/^\//, '');
    console.log('[Server] Report exists! Returning URL:', `/api/reports/${runId}/`);

    res.json({
      exists: true,
      reportPath: relativePath,
      reportUrl: `/api/reports/${runId}/`,
    });
  } catch (error: any) {
    console.error('[Server] Error checking report:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get parsed test results from HTML report
// This must be defined BEFORE the /api/runs router is mounted to take precedence
app.get('/api/runs/:runId/test-results', async (req, res) => {
  try {
    const { runId } = req.params;
    console.log('[Server] Getting test results for runId:', runId);
    // Use the already initialized reportService
    const unifiedReport = await reportService.getUnifiedReport(runId);
    console.log('[Server] Got unified report with', unifiedReport.length, 'results');

    const results = unifiedReport.map((r: any) => r.playwright);
    const summary = await reportService.getUnifiedAnalytics(runId);
    
    console.log('[Server] Mapped to', results.length, 'playwright results with summary:', summary);

    res.json({
      results,
      summary,
    });
  } catch (error: any) {
    console.error('[Server] Error getting test results:', error);
    res.status(500).json({ error: 'Failed to get test results', message: error.message });
  }
});

// API Routes
app.use('/api/database', databaseRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/mcp', mcpRouter);
// Mount testRuns router AFTER the /api/runs/:runId/report and /api/runs/:runId/test-results routes are defined
app.use('/api/runs', testRunsRouter);
app.use('/api/qase', qaseRouter);
app.use('/api/rules', rulesRouter);
app.use('/api/rule-lab', ruleAnalysisRouter);
app.use('/api/cleanup', cleanupRouter);
app.use('/api/artifacts', artifactsRouter);
app.use('/api/environments', environmentsRouter);
app.use('/api/slack', slackRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve HTML report files (including index.html, data files, videos, images, etc.)
// This middleware handles all requests to /api/reports/:runId/*
// Must be defined BEFORE the 404 handler to catch these routes
app.use('/api/reports/:runId', async (req, res, next) => {
  const { runId } = req.params;
  console.log('[Server] Serving report file for runId:', runId, 'path:', req.path);

  // Try to get reportPath from database, but don't fail if run doesn't exist
  // Reports might exist on filesystem even if database entry is missing
  let dbReportPath: null | string = null;
  try {
    const { TestRunRepository } = await import('./repositories/TestRunRepository');
    const prisma = DatabaseService.getInstance().getClient();
    const testRunRepository = new TestRunRepository(prisma);
    const run = await testRunRepository.findByRunId(runId);
    if (run) {
      dbReportPath = run.reportPath;
      console.log('[Server] Found run in database, reportPath:', dbReportPath);
    } else {
      console.warn('[Server] Run not found in database, will check filesystem:', runId);
    }
  } catch (error: any) {
    console.warn('[Server] Error checking database for run, will check filesystem:', error.message);
  }

  // Use ReportPathResolver to find the actual report location
  // Reports are stored in project root
  const resolver = new ReportPathResolver(projectRoot);
  const reportPath = resolver.resolveReportPath(runId, dbReportPath || undefined);
  console.log('[Server] Resolved report path:', reportPath);

  const fullReportPath = join(projectRoot, reportPath);
  console.log('[Server] Full report path:', fullReportPath);

  // Check if the report folder exists
  if (!existsSync(fullReportPath)) {
    console.error('[Server] Report folder does not exist:', fullReportPath);
    return res.status(404).json({ error: 'Report folder not found' });
  }

  // Get the requested file path (everything after /api/reports/:runId/)
  let requestedPath = req.path.replace(`/api/reports/${runId}`, '') || '';
  // Normalize: remove leading slash and ensure we have a path
  if (!requestedPath || requestedPath === '/' || requestedPath === '') {
    requestedPath = 'index.html';
  } else {
    requestedPath = requestedPath.startsWith('/') ? requestedPath.slice(1) : requestedPath;
  }
  const filePath = join(fullReportPath, requestedPath);

  // Security: ensure the file is within the report directory
  if (!filePath.startsWith(fullReportPath)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const stats = statSync(filePath);

  if (stats.isDirectory()) {
    // If it's a directory, serve index.html
    const indexPath = join(filePath, 'index.html');
    if (existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    return res.status(404).json({ error: 'Directory index not found' });
  }

  // Set proper content types
  if (filePath.endsWith('.html')) {
    res.setHeader('Content-Type', 'text/html');
  } else if (filePath.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (filePath.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  } else if (filePath.endsWith('.json')) {
    res.setHeader('Content-Type', 'application/json');
  } else if (filePath.endsWith('.png')) {
    res.setHeader('Content-Type', 'image/png');
  } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
    res.setHeader('Content-Type', 'image/jpeg');
  } else if (filePath.endsWith('.webm')) {
    res.setHeader('Content-Type', 'video/webm');
  } else if (filePath.endsWith('.mp4')) {
    res.setHeader('Content-Type', 'video/mp4');
  } else if (filePath.endsWith('.svg')) {
    res.setHeader('Content-Type', 'image/svg+xml');
  }

  // Enable CORS for all report assets
  res.setHeader('Access-Control-Allow-Origin', '*');

  // For HTML files, rewrite asset paths
  if (filePath.endsWith('.html')) {
    let html = readFileSync(filePath, 'utf-8');
    // Rewrite relative paths to use our API endpoint
    html = html.replace(/href="\.\//g, `href="/api/reports/${runId}/`);
    html = html.replace(/src="\.\//g, `src="/api/reports/${runId}/`);
    html = html.replace(/url\(\.\//g, `url(/api/reports/${runId}/`);
    // Also handle absolute paths that might be relative to the report root
    html = html.replace(/href="\/(data|videos|images|screenshots)/g, `href="/api/reports/${runId}/$1`);
    html = html.replace(/src="\/(data|videos|images|screenshots)/g, `src="/api/reports/${runId}/$1`);
    res.send(html);
  } else {
    // For other files, serve directly
    res.sendFile(filePath);
  }
});

// 404 handler for API routes (must be AFTER all routes but BEFORE error handler)
app.use('/api/*', notFoundHandler);

// Run tests for a single project
app.post('/api/runs', async (req, res) => {
  const { config, projectId } = req.body as {
    config: TestRunConfig;
    projectId: string;
  };

  const project = projectManager.getProject(projectId);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const runId = `run-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  // Collect all output updates to aggregate into final results
  const outputUpdates: string[] = [];

  // Start test execution asynchronously
  testRunner
    .runTests(runId, project, config, (update) => {
      broadcastToClients(update);
      // Collect test-output updates
      if (update.type === 'test-output') {
        outputUpdates.push(update.output || '');
      }
    })
    .then(async (result) => {
      // Save results with output
      // Ensure stdout and stderr are strings (not undefined)
      const stdout = result.results.stdout || '';
      const stderr = result.results.stderr || '';

      // Combine aggregated output updates with stdout/stderr
      // Prefer aggregated updates if stdout/stderr are empty
      const aggregatedOutput = outputUpdates.join('');
      const finalStdout = stdout || aggregatedOutput;
      const finalStderr = stderr || '';

      const summary = new TestRunSummary({
        exitCode: result.results.exitCode,
        failed: result.results.failed || 0,
        passed: result.results.passed || 0,
        skipped: result.results.skipped || 0,
        stderr: finalStderr,
        stdout: finalStdout,
        total: result.results.total || 0,
      });

      const testRun = {
        config,
        endTime: new Date().toISOString(),
        id: runId,
        projectId,
        reportPath: result.reportPath || result.results.reportPath, // Use top-level reportPath first
        results: [],
        startTime: new Date().toISOString(),
        status: result.success ? 'completed' : 'failed',
        summary: summary.toJSON(), // Serialize to JSON for storage
      };
      console.log(`[Server] Saving test run to JSON storage with reportPath: ${testRun.reportPath}`);
      await resultsStorage.saveRun(testRun as any);
      console.log(`[Server] Test run saved to JSON storage successfully`);
      // Include stderr in completion message if there were failures
      const completionUpdate: ProgressUpdate = {
        error: result.success ? undefined : result.results.stderr || 'Test run failed',
        output: result.results.stderr || result.results.stdout,
        runId,
        timestamp: new Date().toISOString(),
        type: result.success ? 'run-complete' : 'run-error',
      };
      broadcastToClients(completionUpdate);
    })
    .catch((error) => {
      console.error('[Server] Test execution error:', error);
      broadcastToClients({
        error: error.message,
        runId,
        type: 'run-error',
      });
    });

  res.json({ runId, status: 'started' });
});

// Execute multi-project flow
app.post('/api/flows/execute', async (req, res) => {
  const { flow } = req.body as { flow: FlowConfig };

  const runId = `flow-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  // Start flow execution asynchronously
  flowOrchestrator
    .executeFlow(runId, flow, (update) => {
      broadcastToClients(update);
    })
    .then(async (testRun) => {
      await resultsStorage.saveRun(testRun);
      broadcastToClients({ runId, testRun, type: 'flow-complete' });
    })
    .catch((error) => {
      console.error('[Server] Flow execution error:', error);
      broadcastToClients({
        error: error.message,
        runId,
        type: 'flow-error',
      });
    });

  res.json({ runId, status: 'started' });
});

// Cancel test run
app.post('/api/runs/:runId/cancel', (req, res) => {
  const { runId } = req.params;
  const cancelled = testRunner.cancel(runId);
  res.json({ cancelled });
});

// Get test run results
// Note: GET /api/runs/:runId is handled by testRunsRouter (TestRunController.getRun)

// Get all test runs
app.get('/api/runs', async (req, res) => {
  try {
    const { flowId, projectId } = req.query;
    let runs;

    console.log('[API] GET /api/runs called');
    if (projectId) {
      runs = await resultsStorage.getRunsByProject(projectId as string);
    } else if (flowId) {
      runs = await resultsStorage.getRunsByFlow(flowId as string);
    } else {
      runs = await resultsStorage.getAllRuns();
    }

    console.log('[API] Returning', runs.length, 'runs, first id:', runs[0]?.id);
    res.json(runs);
  } catch (error: any) {
    console.error('[API] Error getting runs:', error);
    res.status(500).json({ error: 'Failed to get test runs' });
  }
});

// Validate Qase config
app.post('/api/qase/validate', (req, res) => {
  const validation = qaseService.validateConfig(req.body);
  res.json(validation);
});

// Store active Playwright UI URLs by runId
// Playwright UI service already initialized above

// API endpoint to register Playwright UI URL
app.post('/api/playwright-ui/register', (req, res) => {
  const { runId, url } = req.body;
  if (runId && url) {
    playwrightUIService.register(runId, url);
    console.log(`[Server] Registered Playwright UI for run ${runId}: ${url}`);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'runId and url required' });
  }
});

// API endpoint to get Playwright UI URL for a run
app.get('/api/playwright-ui/:runId', (req, res) => {
  const { runId } = req.params;
  const url = playwrightUIService.getUrl(runId);
  if (url) {
    res.json({ proxyUrl: `/api/playwright-ui-proxy/${runId}`, url });
  } else {
    res.status(404).json({ error: 'Playwright UI URL not found for this run' });
  }
});

// Proxy endpoint for Playwright UI (bypasses CORS)
app.use('/api/playwright-ui-proxy/:runId', (req, res, next) => {
  const { runId } = req.params;
  const targetUrl = playwrightUIService.getUrl(runId);

  if (!targetUrl) {
    return res.status(404).json({ error: 'Playwright UI not available for this run' });
  }

  // Create proxy middleware on the fly
  const proxy = createProxyMiddleware({
    changeOrigin: true,
    logLevel: 'silent',
    onProxyReq: (proxyReq: any, _req: express.Request) => {
      // Forward all headers
      Object.keys(_req.headers).forEach((key) => {
        if (_req.headers[key]) {
          proxyReq.setHeader(key, _req.headers[key] as string);
        }
      });
    },
    onProxyRes: (proxyRes: any, _req: express.Request, res: express.Response) => {
      // Remove CORS headers from Playwright UI response and add our own
      delete proxyRes.headers['access-control-allow-origin'];
      delete proxyRes.headers['access-control-allow-methods'];
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    },
    target: targetUrl,
    ws: true, // Enable WebSocket proxying
  });

  proxy(req, res, next);
});

// Serve Playwright HTML report and its assets
// Reports are stored in the project root at reports/html/{runId}/
// Note: The /api/runs/:runId/report and /api/runs/:runId/test-results routes are defined above, before the router mount

// MCP API endpoints

// Check MCP server status and list available tools
// Note: All MCP routes are now handled by mcpRouter (mounted at line 113)
// Duplicate routes removed to prevent conflicts

// Error handling middleware
app.use(errorHandler);

// Serve frontend in production (only if dist exists)
if (existsSync(frontendDist)) {
  app.get('*', (_req, res) => {
    res.sendFile(join(frontendDist, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

import { ensureMcpServer } from './infrastructure/mcp/mcpAutoSpawn';

server.listen(PORT, async () => {
  console.log(`[Server] Backend server running on http://localhost:${PORT}`);
  console.log(`[Server] WebSocket server running on ws://localhost:${PORT}/ws`);
  console.log(`[Server] Database connected: ${databaseService ? 'Yes' : 'No'}`);
  console.log(`[Server] Report Service initialized: ${reportService ? 'Yes' : 'No'}`);

  const mcpReady = await ensureMcpServer(mcpConfig);
  console.log(`[Server] MCP Server: ${mcpReady ? 'Connected' : 'Offline'} (${mcpConfig.url})`);
});
