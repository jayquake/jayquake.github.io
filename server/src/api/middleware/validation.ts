import { type NextFunction, type Request, type Response } from 'express';

import { APIError, HttpStatus } from './errorHandler';

/**
 * Validation error class
 */
export class ValidationError extends APIError {
  fields: Record<string, string>;

  constructor(message: string, fields: Record<string, string> = {}) {
    super(message, HttpStatus.BAD_REQUEST);
    this.fields = fields;
  }
}

/**
 * Validate required body fields
 */
export function validateBody(...fields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, string> = {};

    for (const field of fields) {
      const keys = field.split('.');
      let value: any = req.body;

      for (const key of keys) {
        value = value?.[key];
      }

      if (value === undefined || value === null) {
        errors[field] = `${field} is required`;
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Validation failed', errors);
    }

    next();
  };
}

/**
 * Validate flow configuration
 */
export function validateFlowConfig(req: Request, res: Response, next: NextFunction): void {
  const { flow } = req.body;
  const errors: Record<string, string> = {};

  if (!flow) {
    errors.flow = 'flow is required';
  }

  if (flow && !flow.name) {
    errors['flow.name'] = 'flow name is required';
  }

  if (flow && (!flow.projects || flow.projects.length === 0)) {
    errors['flow.projects'] = 'flow must include at least one project';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', errors);
  }

  next();
}

/**
 * Validate required params
 */
export function validateParams(...params: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, string> = {};

    for (const param of params) {
      if (!req.params[param]) {
        errors[param] = `${param} is required`;
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Validation failed', errors);
    }

    next();
  };
}

/**
 * Validate Qase configuration
 */
export function validateQaseConfig(req: Request, res: Response, next: NextFunction): void {
  const { apiToken, projectCode } = req.body;
  const errors: Record<string, string> = {};

  if (!apiToken) {
    errors.apiToken = 'apiToken is required';
  }

  if (!projectCode) {
    errors.projectCode = 'projectCode is required';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', errors);
  }

  next();
}

/**
 * Validate required query params
 */
export function validateQuery(...params: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, string> = {};

    for (const param of params) {
      if (!req.query[param]) {
        errors[param] = `${param} is required`;
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Validation failed', errors);
    }

    next();
  };
}

/**
 * Validate test run configuration
 */
export function validateTestRunConfig(req: Request, res: Response, next: NextFunction): void {
  const { config, projectId } = req.body;
  const errors: Record<string, string> = {};

  if (!config) {
    errors.config = 'config is required';
  }

  if (!projectId) {
    errors.projectId = 'projectId is required';
  }

  if (config && !config.baseUrl) {
    errors['config.baseUrl'] = 'baseUrl is required in config';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', errors);
  }

  next();
}
