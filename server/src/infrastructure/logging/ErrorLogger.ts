/**
 * ErrorLogger
 *
 * Centralized error logging service with structured output
 *
 * Features:
 * - Consistent error format across all services
 * - Distinguishes recoverable vs fatal errors
 * - Provides context and metadata for debugging
 * - Future-ready for database persistence
 *
 * Usage:
 *   ErrorLogger.log({
 *     service: 'QaseDataProcessor',
 *     operation: 'fetchTestCase',
 *     error: error as Error,
 *     metadata: { qaseId, projectCode },
 *     recoverable: true,
 *     runId: runId,
 *   });
 */

import type { ErrorContext, ErrorLogEntry } from './types';

export class ErrorLogger {
  /**
   * Determine if a general error is recoverable
   */
  static isRecoverableError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return (
      message.includes('timeout') ||
      message.includes('econnreset') ||
      message.includes('etimedout') ||
      message.includes('enotfound') ||
      message.includes('429') ||
      message.includes('rate limit') ||
      message.includes('503') ||
      message.includes('service unavailable')
    );
  }

  /**
   * Main logging method - logs error with full context
   */
  static log(context: ErrorContext): void {
    const entry: ErrorLogEntry = {
      error: {
        message: context.error.message,
        name: context.error.name,
        stack: context.error.stack,
      },
      id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      level: context.recoverable ? 'WARN' : 'ERROR',
      metadata: context.metadata || {},
      operation: context.operation,
      recoverable: context.recoverable,
      runId: context.runId,
      service: context.service,
      timestamp: new Date().toISOString(),
      userId: context.userId,
    };

    this.logToConsole(entry);

    // Async fire-and-forget (don't block on DB write)
    this.logToDatabase(entry).catch((err) => {
      console.error('[ErrorLogger] Failed to write error to database:', err);
    });
  }

  /**
   * Specialized method for logging Qase-related errors
   */
  static logQaseError(
    operation: string,
    qaseId: number,
    error: Error,
    qaseConfig: { host?: string; projectCode: string; },
  ): void {
    this.log({
      error,
      metadata: {
        apiHost: qaseConfig.host,
        projectCode: qaseConfig.projectCode,
        qaseId,
      },
      operation,
      recoverable: this.isRecoverableQaseError(error),
      service: 'QaseIntegration',
    });
  }

  /**
   * Determine if a Qase error is recoverable (transient)
   */
  private static isRecoverableQaseError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return (
      message.includes('429') ||
      message.includes('rate limit') ||
      message.includes('timeout') ||
      message.includes('econnreset') ||
      message.includes('etimedout')
    );
  }

  /**
   * Log error to console with structured format
   */
  private static logToConsole(entry: ErrorLogEntry): void {
    const consoleMethod = entry.level === 'ERROR' ? console.error : console.warn;

    consoleMethod(
      `[${entry.timestamp}] [${entry.service}] ${entry.operation} failed:`,
      entry.error.message,
      entry.recoverable ? '(recoverable)' : '(fatal)',
      entry.metadata,
    );

    if (entry.error.stack && entry.level === 'ERROR') {
      consoleMethod(entry.error.stack);
    }
  }

  /**
   * Log error to database (future implementation)
   * For now, this is a no-op
   */
  private static async logToDatabase(entry: ErrorLogEntry): Promise<void> {
    // Future: Store in ErrorLog table for debugging and analytics
    // await prisma.errorLog.create({ data: entry });
  }
}
