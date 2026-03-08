/**
 * PlaywrightCLIExecutor — typed wrapper around `npx playwright-cli` subprocess calls.
 *
 * Provides the same browser-automation primitives that PlaywrightMCPClient offers
 * (navigate, snapshot, screenshot, evaluate, click, fill, …) but executes them via
 * CLI subprocesses instead of a persistent SSE/MCP connection.
 *
 * Benefits over the MCP transport:
 *   - No server process to start/manage (`npm run mcp:start` not required)
 *   - Named sessions (`-s=<name>`) for isolation and parallelism
 *   - Persistent auth state via `state-save` / `state-load`
 *   - Deterministic per-command error handling (exit code + stderr)
 *
 * The executor is **not** a 1-to-1 MCP replacement — only the operations actually
 * used by `MCPService.navigateToFailurePoint` (and its helpers) are implemented.
 */

import { exec as execCb } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(execCb);

// ─── Public types ──────────────────────────────────────────────────────────

export type CLIExecutorOptions = {
  /** Path to `playwright-cli.json` config file (used on `open` for httpCredentials) */
  configPath?: string;
  /** Working directory for subprocess execution (defaults to project root) */
  cwd?: string;
  /** Output directory for screenshots/snapshots (passed via config) */
  outputDir?: string;
  /** Named session for this executor (`-s=<sessionName>`) */
  sessionName?: string;
}

export type CLIResult = {
  /** Error message extracted from stderr or non-zero exit */
  error?: string;
  /** Exit code of the subprocess (0 = success) */
  exitCode: number;
  /** Whether the command succeeded (exitCode === 0 and no error marker) */
  ok: boolean;
  /** Page title parsed from stdout (if present) */
  pageTitle?: string;
  /** Page URL parsed from stdout (if present) */
  pageUrl?: string;
  /** Full raw stdout text */
  rawText: string;
  /** Path to a screenshot file saved by the command (relative to cwd) */
  screenshotPath?: string;
  /** Path to a snapshot YAML file saved by the command (relative to cwd) */
  snapshotPath?: string;
}

// ─── Implementation ────────────────────────────────────────────────────────

export class PlaywrightCLIExecutor {
  /** Whether `open()` has been called (session is presumed alive). */
  get isOpen(): boolean {
    return this.opened;
  }
  /** The session name (if any). */
  get session(): string | undefined {
    return this.sessionName;
  }
  private readonly configPath: string;
  private readonly cwd: string;

  /** Track whether `open` has been called for this session. */
  private opened = false;

  private readonly outputDir: string;

  // ── Browser lifecycle ──────────────────────────────────────────────────

  private readonly sessionName: string | undefined;

  constructor(options: CLIExecutorOptions = {}) {
    // Default cwd to the test-e2e project root (4 levels up from dist output)
    this.cwd = options.cwd || join(__dirname, '../../../../..');
    this.configPath = options.configPath || join(this.cwd, 'playwright-cli.json');
    this.outputDir = options.outputDir || join(this.cwd, 'mcp/mcp-output');
    this.sessionName = options.sessionName;
  }

  // ── Navigation ─────────────────────────────────────────────────────────

  /** Click an element by snapshot ref. */
  async click(ref: string): Promise<CLIResult> {
    return this.exec(['click', ref]);
  }

  // ── Page inspection ────────────────────────────────────────────────────

  /** Close the current session's browser. */
  async close(): Promise<CLIResult> {
    const result = await this.exec(['close']);
    this.opened = false;
    return result;
  }

  /**
   * Evaluate a JavaScript expression on the page (or on a specific element).
   * Maps to `playwright-cli eval <expression> [ref]`.
   *
   * IMPORTANT: For large scripts, prefer `runCode()` which takes a full
   * Playwright code snippet. `eval` is best for short expressions that
   * return a serialisable value.
   */
  async evaluate(expression: string, ref?: string): Promise<CLIResult> {
    const args = ['eval', expression];
    if (ref) args.push(ref);
    return this.exec(args);
  }

  // ── Interaction ────────────────────────────────────────────────────────

  /** Fill (clear + type) into an element identified by snapshot ref. */
  async fill(ref: string, text: string): Promise<CLIResult> {
    return this.exec(['fill', ref, text]);
  }

  /** Navigate the current page to `url`. */
  async goto(url: string): Promise<CLIResult> {
    return this.exec(['goto', url]);
  }

  /**
   * Open a new browser session. Must be called before any other command.
   * Passes `--config` to supply httpCredentials for acsb-test.com.
   */
  async open(url?: string, headed = true): Promise<CLIResult> {
    const args = ['--config', this.configPath, 'open'];
    if (headed) args.push('--headed');
    if (url) args.push(url);
    const result = await this.exec(args);
    if (result.ok) this.opened = true;
    return result;
  }

  /** Press a keyboard key (e.g. "Enter", "Tab"). */
  async press(key: string): Promise<CLIResult> {
    return this.exec(['press', key]);
  }

  // ── JavaScript execution ───────────────────────────────────────────────

  /**
   * Read a snapshot YAML file from disk and return its contents.
   * Resolves relative paths against `cwd`.
   */
  readSnapshotFile(snapshotPath: string): null | string {
    const resolved = snapshotPath.startsWith('/')
      ? snapshotPath
      : join(this.cwd, snapshotPath);
    if (!existsSync(resolved)) return null;
    return readFileSync(resolved, 'utf-8');
  }

  /**
   * Run a Playwright code snippet.
   * Maps to `playwright-cli run-code <code>`.
   */
  async runCode(code: string): Promise<CLIResult> {
    return this.exec(['run-code', code]);
  }

  // ── Storage state ──────────────────────────────────────────────────────

  /** Take a screenshot. Returns path to the PNG file. */
  async screenshot(filename?: string): Promise<CLIResult> {
    const args = ['screenshot'];
    if (filename) args.push(`--filename=${filename}`);
    return this.exec(args);
  }

  /** Capture an accessibility snapshot. Returns path to the YAML file. */
  async snapshot(filename?: string): Promise<CLIResult> {
    const args = ['snapshot'];
    if (filename) args.push(`--filename=${filename}`);
    return this.exec(args);
  }

  // ── Snapshot file reading ──────────────────────────────────────────────

  /** Load cookies + localStorage from a JSON file. */
  async stateLoad(filename: string): Promise<CLIResult> {
    return this.exec(['state-load', filename]);
  }

  // ── Session info ───────────────────────────────────────────────────────

  /** Save the browser's cookies + localStorage to a JSON file. */
  async stateSave(filename: string): Promise<CLIResult> {
    return this.exec(['state-save', filename]);
  }

  /** Type text into the currently focused editable element. */
  async type(text: string): Promise<CLIResult> {
    return this.exec(['type', text]);
  }

  // ── Private helpers ────────────────────────────────────────────────────

  /**
   * Execute a playwright-cli command and parse its output into a `CLIResult`.
   *
   * Retries once on transient failures (non-zero exit code with no meaningful
   * stderr — typically a stale session or momentary browser hiccup).
   */
  private async exec(args: string[], retryCount = 0): Promise<CLIResult> {
    const sessionArgs = this.sessionName ? [`-s=${  this.sessionName}`] : [];
    const fullArgs = ['npx', 'playwright-cli', ...sessionArgs, ...args];
    const cmd = fullArgs.map(a => (a.includes(' ') || a.includes('"') ? `'${a}'` : a)).join(' ');

    console.log(`[PlaywrightCLIExecutor] exec: ${cmd}`);

    try {
      const { stderr, stdout } = await execAsync(cmd, {
        cwd: this.cwd,
        encoding: 'utf-8',
        // Increase max buffer for large snapshots / eval results
        maxBuffer: 10 * 1024 * 1024,
        // 60 second timeout per command — generous for navigation on slow envs
        timeout: 60_000,
      });

      if (stderr && stderr.trim().length > 0) {
        console.warn(`[PlaywrightCLIExecutor] stderr: ${stderr.trim().substring(0, 300)}`);
      }

      return this.parseOutput(stdout, 0);
    } catch (error: any) {
      // `exec` throws when exit code !== 0 OR on timeout
      const exitCode: number = error.code ?? 1;
      const stdout: string = error.stdout ?? '';
      const stderr: string = error.stderr ?? '';

      // Retry once on transient failures
      if (retryCount < 1 && exitCode !== 0 && !stderr.includes('SIGTERM')) {
        console.warn(`[PlaywrightCLIExecutor] Retrying after exit code ${exitCode}...`);
        return this.exec(args, retryCount + 1);
      }

      const errorMsg = stderr.trim() || error.message || `Exit code ${exitCode}`;
      console.error(`[PlaywrightCLIExecutor] Command failed: ${errorMsg.substring(0, 500)}`);

      return {
        error: errorMsg,
        exitCode,
        ok: false,
        rawText: stdout,
      };
    }
  }

  /**
   * Parse CLI stdout into a structured `CLIResult`.
   *
   * The playwright-cli output follows a consistent markdown-like format:
   * ```
   * ### Page
   * - Page URL: https://example.com
   * - Page Title: Example
   * ### Snapshot
   * - [Snapshot](path/to/snapshot.yml)
   * ### Result
   * - [Screenshot of viewport](path/to/screenshot.png)
   * ### Error
   * Error: <message>
   * ```
   */
  private parseOutput(stdout: string, exitCode: number): CLIResult {
    const result: CLIResult = {
      exitCode,
      ok: exitCode === 0,
      rawText: stdout,
    };

    // Check for explicit error blocks
    const errorMatch = stdout.match(/### Error\n(.+?)(?:\n###|\n---|\n$)/s);
    if (errorMatch) {
      result.error = errorMatch[1].trim();
      result.ok = false;
    }

    // Extract page URL
    const urlMatch = stdout.match(/Page URL:\s*(https?:\/\/[^\s\n]+)/);
    if (urlMatch) {
      const [, pageUrl] = urlMatch;
      result.pageUrl = pageUrl;
    }

    // Extract page title
    const titleMatch = stdout.match(/Page Title:\s*(.+)/);
    if (titleMatch) {
      const [, pageTitle] = titleMatch;
      result.pageTitle = pageTitle.trim();
    }

    // Extract snapshot path
    const snapshotMatch = stdout.match(/\[Snapshot\]\(([^)]+\.yml)\)/);
    if (snapshotMatch) {
      const [, snapshotPath] = snapshotMatch;
      result.snapshotPath = snapshotPath;
    }

    // Extract screenshot path
    const screenshotMatch = stdout.match(/\[Screenshot[^\]]*\]\(([^)]+\.png)\)/);
    if (screenshotMatch) {
      const [, screenshotPath] = screenshotMatch;
      result.screenshotPath = screenshotPath;
    }

    return result;
  }
}
