import { NextFunction, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { APIError } from '../utils/apiError';

// Global error handling middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error instanceof APIError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof MongoError && error.code === 11000) {
    statusCode = 400;
    message = 'Duplicate Entry';
  }

  const response = {
    success: false,
    message,
    errorMessages: [{ path: '', message }],
    stack: error.stack,
  };

  res.status(statusCode).json(response);
};
