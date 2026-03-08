import { type Request, type Response } from 'express';

import { getMcpConfig } from '../../config/mcp';
import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { TestRunRepository } from '../../repositories/TestRunRepository';
import { MCPService } from '../../services/MCPService';
import { QaseService } from '../../services/QaseService';
import { ReportService } from '../../services/ReportService';

export class MCPController {
  private mcpService: MCPService;
  private qaseService: QaseService;
  private reportService: ReportService;
  private testRunRepository: TestRunRepository;

  constructor() {
    this.qaseService = new QaseService();
    this.reportService = new ReportService();
    this.mcpService = new MCPService(getMcpConfig().url, this.reportService);
    const prisma = DatabaseService.getInstance().getClient();
    this.testRunRepository = new TestRunRepository(prisma);
  }

  async analyzeElement(req: Request, res: Response): Promise<void> {
    try {
      const { context, selector, url } = req.body;
      if (!url || !selector) {
        res.status(400).json({ error: 'url and selector required' });
        return;
      }
      const analysis = await this.mcpService.analyzeElement(url, selector, context);
      res.json({ analysis });
    } catch (error: any) {
      console.error('[MCPController] MCP analyze element error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async analyzeRun(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;
      const mcpAvailable = await this.mcpService.checkMCPServer();
      if (!mcpAvailable) {
        console.warn('[MCPController] MCP server health check failed, but proceeding with analysis attempt');
      }

      // Get test run to access Qase config
      const run = await this.testRunRepository.findByRunId(runId);
      if (!run) {
        res.status(404).json({ error: 'Run not found' });
        return;
      }

      // MCPService now uses ReportService internally, which handles Qase integration
      // The qaseService and qaseConfig parameters are no longer needed
      console.log(`[MCPController] Analyzing test run ${runId} with unified report data`);

      // Clear stale analyses before re-analyzing to avoid duplicates with outdated data
      const { MCPAnalysisRepository } = await import('../../repositories/MCPAnalysisRepository');
      const prisma = DatabaseService.getInstance().getClient();
      const mcpAnalysisRepository = new MCPAnalysisRepository(prisma);
      const deletedCount = await mcpAnalysisRepository.deleteByTestRun(run.id);
      if (deletedCount > 0) {
        console.log(`[MCPController] Cleared ${deletedCount} stale analyses for run ${runId}`);
      }

      const analyses = await this.mcpService.analyzeTestRun(runId);

      // analyzeTestRun already saves fresh analyses to the database.
      // Return only the fresh analyses — no need to merge stale stored data.
      res.json({
        analyses,
        fresh: analyses.length,
        stored: 0,
      });
    } catch (error: any) {
      console.error('[MCPController] MCP analyze error:', error);
      res.status(500).json({ analyses: [], error: error.message });
    }
  }

  async cleanup(req: Request, res: Response): Promise<void> {
    try {
      await this.mcpService.cleanup();
      res.json({ success: true });
    } catch (error: any) {
      console.error('[MCPController] MCP cleanup error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAnalysisExplanation(req: Request, res: Response): Promise<void> {
    try {
      const { analysisId } = req.params;
      const explanation = await this.mcpService.getAnalysisExplanation(analysisId);
      res.json({ explanation });
    } catch (error: any) {
      console.error('[MCPController] Error getting explanation:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getElementAtPosition(req: Request, res: Response): Promise<void> {
    try {
      const { x, y } = req.body;
      if (typeof x !== 'number' || typeof y !== 'number') {
        res.status(400).json({ error: 'x and y coordinates required' });
        return;
      }
      const result = await (this.mcpService as any).getElementAtPosition(x, y);
      res.json(result);
    } catch (error: any) {
      console.error('[MCPController] MCP get element at position error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const useCLI = process.env.USE_CLI_FOR_NAV === 'true';
      const isAvailable = await this.mcpService.checkMCPServer();
      const tools = isAvailable ? await this.mcpService.listTools() : [];

      // CLI mode can operate without the MCP server running
      const effectivelyAvailable = isAvailable || useCLI;

      res.json({
        available: effectivelyAvailable,
        cliMode: useCLI,
        message:
          useCLI && !isAvailable
            ? 'Playwright CLI mode active (MCP server not required)'
          : isAvailable
            ? 'MCP server is running and ready'
          : 'MCP server is not available. Please start it with: npm run mcp:start',
        tools,
        url: getMcpConfig().url,
      });
    } catch (error: any) {
      const useCLI = process.env.USE_CLI_FOR_NAV === 'true';
      res.status(useCLI ? 200 : 500).json({
        available: useCLI,
        cliMode: useCLI,
        error: useCLI ? undefined : error.message,
        message: useCLI
          ? 'Playwright CLI mode active (MCP server not required)'
          : 'Error checking MCP server status',
      });
    }
  }

  async getStoredAnalyses(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;
      const run = await this.testRunRepository.findByRunId(runId);
      if (!run) {
        res.status(404).json({ error: 'Run not found' });
        return;
      }

      const { MCPAnalysisRepository } = await import('../../repositories/MCPAnalysisRepository');
      const prisma = DatabaseService.getInstance().getClient();
      const mcpAnalysisRepository = new MCPAnalysisRepository(prisma);
      const analyses = await mcpAnalysisRepository.getByTestRun(run.id);

      res.json({ analyses });
    } catch (error: any) {
      console.error('[MCPController] Error getting stored analyses:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async interact(req: Request, res: Response): Promise<void> {
    try {
      const { selector, type, url, value } = req.body;
      if (!type) {
        res.status(400).json({ error: 'type required' });
        return;
      }
      const result = await this.mcpService.interact({ selector, type, url, value });
      res.json({ result });
    } catch (error: any) {
      console.error('[MCPController] MCP interact error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async validateSelector(req: Request, res: Response): Promise<void> {
    try {
      const { selector } = req.body;
      if (!selector) {
        res.status(400).json({ error: 'selector required' });
        return;
      }
      const result = await this.mcpService.validateSelector(selector);
      res.json(result);
    } catch (error: any) {
      console.error('[MCPController] validateSelector error:', error);
      res.status(500).json({ count: 0, error: error.message, matches: [] });
    }
  }

  async navigate(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      if (!url) {
        res.status(400).json({ error: 'url required' });
        return;
      }
      await this.mcpService.navigate(url);
      res.json({ success: true });
    } catch (error: any) {
      console.error('[MCPController] MCP navigate error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async navigateToFailure(req: Request, res: Response): Promise<void> {
    try {
      const { highlight, pageSnapshotContent, selector, suggestedSelectors, testResultId, url } = req.body;
      if (!url) {
        res.status(400).json({ error: 'url required' });
        return;
      }
      console.log('[MCPController] navigateToFailure called:', { highlight, pageSnapshotContent: pageSnapshotContent ? `${pageSnapshotContent.length} chars` : undefined, selector: selector?.substring(0, 60), suggestedSelectors: suggestedSelectors?.length, testResultId, url });
      const result = await this.mcpService.navigateToFailurePoint(
        url,
        selector,
        highlight !== false,
        testResultId,
        suggestedSelectors,
        pageSnapshotContent,
      );
      // Include steps, navigationOutcome, currentUrl, expectedUrl in response
      res.json(result);
    } catch (error: any) {
      console.error('[MCPController] MCP navigate to failure error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
