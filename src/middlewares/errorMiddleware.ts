import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  // Handle and format the error as needed
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Handle specific error types
  if (error.name === 'APIError') {
    // Handle APIError (Validation Error)
    const errorMessages = error.errorMessages || [{ path: '', message }];
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    });
  } else {
    // Handle other types of errors
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages: [{ path: '', message }],
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    });
  }
};
