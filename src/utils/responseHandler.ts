import { Response } from 'express';

// Utility function for consistent API response formatting
export const responseHandler = (
  res: Response,
  statusCode: number,
  data: any
) => {
  const response = {
    success: true,
    data,
  };

  res.status(statusCode).json(response);
};
