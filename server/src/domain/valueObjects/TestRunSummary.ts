/**
 * TestRunSummary class encapsulates test run summary data and provides
 * methods for accessing and manipulating summary information.
 */
export class TestRunSummary {
  get exitCode(): number | undefined {
    return this._exitCode;
  }
  get failed(): number {
    return this._failed;
  }
  get hasOutput(): boolean {
    return this.hasStdout || this.hasStderr;
  }
  get hasStderr(): boolean {
    return Boolean(this._stderr) && this._stderr.length > 0;
  }
  // Computed properties
  get hasStdout(): boolean {
    return Boolean(this._stdout) && this._stdout.length > 0;
  }
  get passed(): number {
    return this._passed;
  }
  get skipped(): number {
    return this._skipped;
  }

  get stderr(): string | undefined {
    return this._stderr;
  }

  get stderrLength(): number {
    return this._stderr?.length || 0;
  }

  get stdout(): string | undefined {
    return this._stdout;
  }

  get stdoutLength(): number {
    return this._stdout?.length || 0;
  }

  get summaryKeys(): string[] {
    const keys: string[] = ['total', 'passed', 'failed', 'skipped'];
    if (this._exitCode !== undefined) {
      keys.push('exitCode');
    }
    if (this.hasStdout) {
      keys.push('stdout');
    }
    if (this.hasStderr) {
      keys.push('stderr');
    }
    return keys;
  }

  // Getters
  get total(): number {
    return this._total;
  }

  private _exitCode?: number;

  private _failed: number;

  private _passed: number;

  private _skipped: number;

  private _stderr?: string;

  private _stdout?: string;

  private _total: number;

  constructor(data: {
    exitCode?: number;
    failed: number;
    passed: number;
    skipped: number;
    stderr?: string;
    stdout?: string;
    total: number;
  }) {
    this._total = data.total;
    this._passed = data.passed;
    this._failed = data.failed;
    this._skipped = data.skipped;
    this._stdout = data.stdout;
    this._stderr = data.stderr;
    this._exitCode = data.exitCode;
  }

  /**
   * Create a TestRunSummary from a plain object
   */
  static fromJSON(data: {
    exitCode?: number;
    failed: number;
    passed: number;
    skipped: number;
    stderr?: string;
    stdout?: string;
    total: number;
  }): TestRunSummary {
    return new TestRunSummary(data);
  }

  /**
   * Get combined output text with stderr first if both exist
   */
  getCombinedOutput(): string {
    if (this.hasStderr && this.hasStdout) {
      return `=== STDERR ===\n${this._stderr}\n\n=== STDOUT ===\n${this._stdout}`;
    }
    if (this.hasStderr) {
      return this._stderr!;
    }
    if (this.hasStdout) {
      return this._stdout!;
    }
    return 'No output available';
  }

  /**
   * Get debug information object
   */
  getDebugInfo(): {
    hasStderr: boolean;
    hasStdout: boolean;
    stderrLength: number;
    stdoutLength: number;
    summaryKeys: string[];
  } {
    return {
      hasStderr: this.hasStderr,
      hasStdout: this.hasStdout,
      stderrLength: this.stderrLength,
      stdoutLength: this.stdoutLength,
      summaryKeys: this.summaryKeys,
    };
  }

  /**
   * Get success rate as a percentage
   */
  getSuccessRate(): number {
    if (this._total === 0) {
      return 0;
    }
    return Math.round((this._passed / this._total) * 100);
  }

  /**
   * Check if the test run was successful
   */
  isSuccessful(): boolean {
    return this._failed === 0 && (this._exitCode === undefined || this._exitCode === 0);
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): {
    exitCode?: number;
    failed: number;
    passed: number;
    skipped: number;
    stderr?: string;
    stdout?: string;
    total: number;
  } {
    return {
      exitCode: this._exitCode,
      failed: this._failed,
      passed: this._passed,
      skipped: this._skipped,
      stderr: this._stderr,
      stdout: this._stdout,
      total: this._total,
    };
  }
}
