import { type NextFunction, type Request, type Response } from 'express';

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  isOperational: boolean;
  statusCode: number;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * HTTP status codes for common errors
 */
export const HttpStatus = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  OK: 200,
  SERVICE_UNAVAILABLE: 503,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
} as const;

/**
 * Async error wrapper for route handlers
 * Catches async errors and passes them to error handler
 */
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Enhanced error handler middleware
 * Handles both operational (expected) and programming (unexpected) errors
 */
export function errorHandler(error: APIError | Error, req: Request, res: Response, next: NextFunction): void {
  const isAPIError = error instanceof APIError;
  const statusCode = isAPIError ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
  const isOperational = isAPIError ? error.isOperational : false;

  // Log error details
  const errorLog = {
    isOperational,
    message: error.message,
    method: req.method,
    path: req.path,
    stack: error.stack,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  if (isOperational) {
    console.warn('[ErrorHandler] Operational Error:', JSON.stringify(errorLog, null, 2));
  } else {
    console.error('[ErrorHandler] Programming Error:', JSON.stringify(errorLog, null, 2));
  }

  // Send response
  const response: any = {
    error: error.message || 'Internal server error',
    path: req.path,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
}

/**
 * Not found handler - should be added after all routes
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  const error = new APIError(`Route ${req.method} ${req.path} not found`, HttpStatus.NOT_FOUND);
  next(error);
}
