/**
 * Logging Types
 *
 * Shared interfaces for structured error logging across the application
 */

export type ErrorContext = {
  error: Error;
  metadata?: Record<string, any>;
  operation: string;
  recoverable: boolean;
  runId?: string;
  service: string;
  userId?: string;
}

export type ErrorLogEntry = {
  error: {
    message: string;
    name: string;
    stack?: string;
  };
  id: string;
  level: 'ERROR' | 'WARN';
  metadata: Record<string, any>;
  operation: string;
  recoverable: boolean;
  runId?: string;
  service: string;
  timestamp: string;
  userId?: string;
}
