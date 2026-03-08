import { type ChildProcess, spawn } from 'child_process';
import http from 'http';

import type { McpConfig } from '../../config/mcp';

let mcpProcess: ChildProcess | null = null;

function probe(url: string, timeoutMs = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(`${url}/sse`, (res) => {
      res.destroy();
      resolve(res.statusCode !== undefined);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForReady(url: string, maxWaitMs = 8000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    if (await probe(url, 1500)) return true;
    await sleep(500);
  }
  return false;
}

function registerCleanup(): void {
  const cleanup = () => {
    if (mcpProcess && !mcpProcess.killed) {
      console.log('[MCP] Shutting down auto-spawned MCP server...');
      mcpProcess.kill('SIGTERM');
      mcpProcess = null;
    }
  };

  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(0); });
  process.on('SIGTERM', () => { cleanup(); process.exit(0); });
}

export async function ensureMcpServer(config: McpConfig): Promise<boolean> {
  if (!config.autoSpawn) {
    console.log('[MCP] Auto-spawn disabled (production mode or MCP_AUTO_SPAWN=false)');
    return false;
  }

  const reachable = await probe(config.url);
  if (reachable) {
    console.log(`[MCP] Playwright MCP server already running at ${config.url}`);
    return true;
  }

  console.log(`[MCP] Playwright MCP server not detected at ${config.url}`);
  console.log(`[MCP] Auto-starting on port ${config.port}...`);

  try {
    mcpProcess = spawn('npx', ['@playwright/mcp', '--port', String(config.port)], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false,
      env: { ...process.env },
    });

    mcpProcess.stdout?.on('data', (data: Buffer) => {
      const line = data.toString().trim();
      if (line) console.log(`[MCP:stdout] ${line}`);
    });

    mcpProcess.stderr?.on('data', (data: Buffer) => {
      const line = data.toString().trim();
      if (line) console.log(`[MCP:stderr] ${line}`);
    });

    mcpProcess.on('error', (err) => {
      console.error(`[MCP] Failed to start: ${err.message}`);
      mcpProcess = null;
    });

    mcpProcess.on('exit', (code) => {
      if (code !== null && code !== 0) {
        console.warn(`[MCP] Process exited with code ${code}`);
      }
      mcpProcess = null;
    });

    registerCleanup();

    const ready = await waitForReady(config.url);
    if (ready) {
      console.log(`[MCP] Playwright MCP server started successfully on port ${config.port} (pid: ${mcpProcess?.pid})`);
      return true;
    }

    console.warn('[MCP] Server started but did not become reachable in time');
    console.warn('[MCP] Rule Lab and accessibility tree features will be unavailable');
    return false;
  } catch (err: any) {
    console.error(`[MCP] Auto-spawn failed: ${err.message}`);
    console.warn('[MCP] You can start it manually: npm run mcp:start');
    return false;
  }
}

export function getMcpProcess(): ChildProcess | null {
  return mcpProcess;
}
