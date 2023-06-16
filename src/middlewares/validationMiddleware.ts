import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { APIError } from '../utils/apiError';

// Middleware for request validation
export const validateRequest = (schema: z.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        throw new APIError(400, 'Validation Error', errorMessage);
      }
      next(error);
    }
  };
};
