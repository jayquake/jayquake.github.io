/**
 * PlaywrightUIService class manages Playwright UI URL registration
 * and retrieval for test runs.
 */
export class PlaywrightUIService {
  private _registeredUrls: Map<string, string> = new Map();

  /**
   * Clear all registrations (for testing/cleanup)
   */
  clear(): void {
    this._registeredUrls.clear();
  }

  /**
   * Get all registered runs
   */
  getAllRuns(): string[] {
    return Array.from(this._registeredUrls.keys());
  }

  /**
   * Get registered URL for a test run
   */
  getUrl(runId: string): null | string {
    return this._registeredUrls.get(runId) || null;
  }

  /**
   * Check if a URL is registered for a test run
   */
  hasUrl(runId: string): boolean {
    return this._registeredUrls.has(runId);
  }

  /**
   * Register a Playwright UI URL for a test run
   */
  register(runId: string, url: string): void {
    this._registeredUrls.set(runId, url);
  }

  /**
   * Unregister a test run (cleanup)
   */
  unregister(runId: string): void {
    this._registeredUrls.delete(runId);
  }
}
