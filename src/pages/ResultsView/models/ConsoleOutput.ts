/**
 * ConsoleOutput - Value object for console output
 * Encapsulates stdout/stderr with formatting methods
 */
export class ConsoleOutput {
  constructor(
    public readonly stdout: null | string,
    public readonly stderr: null | string
  ) {}

  /**
   * Get output character count
   */
  getCharacterCount(): number {
    return this.getCombinedOutput().length;
  }

  /**
   * Get combined output with labels
   */
  getCombinedOutput(): string {
    if (this.stderr && this.stdout) {
      return `=== STDERR ===\n${this.stderr}\n\n=== STDOUT ===\n${this.stdout}`;
    }
    return this.stderr || this.stdout || '';
  }

  /**
   * Get error lines from stderr
   */
  getErrorLines(): string[] {
    if (!this.stderr) return [];
    return this.stderr.split('\n').filter(line => {
      const lower = line.toLowerCase();
      return (
        lower.includes('error') ||
        lower.includes('failed') ||
        lower.includes('failure') ||
        line.includes('×') ||
        line.includes('FAIL') ||
        line.includes('AssertionError') ||
        line.includes('Timeout')
      );
    });
  }

  /**
   * Get line count
   */
  getLineCount(): number {
    return this.getCombinedOutput().split('\n').length;
  }

  /**
   * Check if there is any output
   */
  hasOutput(): boolean {
    return Boolean(this.stdout || this.stderr);
  }

  /**
   * Check if a line is an error line
   */
  isErrorLine(line: string): boolean {
    const lower = line.toLowerCase();
    return (
      lower.includes('error') ||
      lower.includes('failed') ||
      lower.includes('failure') ||
      line.includes('×') ||
      line.includes('FAIL') ||
      line.includes('AssertionError') ||
      line.includes('Timeout')
    );
  }
}
