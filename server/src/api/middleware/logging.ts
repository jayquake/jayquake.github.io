import { type NextFunction, type Request, type Response } from 'express';

/**
 * CORS logger - logs cross-origin requests
 */
export function corsLogger(req: Request, res: Response, next: NextFunction): void {
  const origin = req.get('origin');

  if (origin) {
    console.log(`[CORS] Cross-origin request from: ${origin}`, {
      method: req.method,
      origin,
      path: req.path,
    });
  }

  next();
}

/**
 * Performance monitoring middleware
 * Logs slow requests (>1000ms)
 */
export function performanceMonitor(threshold = 1000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;

      if (duration > threshold) {
        console.warn(`[Performance] Slow Request: ${req.method} ${req.path} - ${duration}ms`, {
          duration: `${duration}ms`,
          method: req.method,
          path: req.path,
          statusCode: res.statusCode,
          threshold: `${threshold}ms`,
        });
      }
    });

    next();
  };
}

/**
 * Request logging middleware
 * Logs all incoming requests with timing information
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  const requestId = generateRequestId();

  // Add request ID to request object for tracing
  (req as any).requestId = requestId;

  // Log request start
  console.log(`[Request] ${requestId} ${req.method} ${req.path}`, {
    body: sanitizeBody(req.body),
    ip: req.ip,
    method: req.method,
    path: req.path,
    query: req.query,
    timestamp: new Date().toISOString(),
    userAgent: req.get('user-agent'),
  });

  // Capture the original end function
  const originalEnd = res.end;

  // Override end function to log response
  res.end = function (this: Response, ...args: any[]): Response {
    const duration = Date.now() - startTime;

    console.log(`[Response] ${requestId} ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`, {
      duration: `${duration}ms`,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
    });

    // Call the original end function
    return originalEnd.apply(this, args);
  };

  next();
}

/**
 * Request size limit logger
 * Logs requests that exceed a certain size
 */
export function sizeMonitor(threshold: number = 1024 * 1024) {
  // 1MB default
  return (req: Request, res: Response, next: NextFunction): void => {
    const contentLength = parseInt(req.get('content-length') || '0', 10);

    if (contentLength > threshold) {
      console.warn(`[Size] Large Request: ${req.method} ${req.path} - ${formatBytes(contentLength)}`, {
        method: req.method,
        path: req.path,
        size: formatBytes(contentLength),
        threshold: formatBytes(threshold),
      });
    }

    next();
  };
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100  } ${  sizes[i]}`;
}

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

/**
 * Sanitize request body to remove sensitive information
 */
function sanitizeBody(body: any): any {
  if (!body) return body;

  const sensitive = ['password', 'token', 'apiToken', 'apiKey', 'secret', 'authorization'];
  const sanitized = { ...body };

  for (const key of Object.keys(sanitized)) {
    if (sensitive.some((s) => key.toLowerCase().includes(s))) {
      sanitized[key] = '***REDACTED***';
    }
  }

  return sanitized;
}
