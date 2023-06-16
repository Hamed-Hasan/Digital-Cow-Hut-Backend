import { Response } from 'express';
import { APIError } from './apiError';

interface ResponseData {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
  errorMessages?: any[];
  stack?: string; // Add stack property
}

export const responseHandler = {
  success: (res: Response, message: string, data?: any): void => {
    const responseData: ResponseData = {
      success: true,
      statusCode: 200,
      message,
    };

    if (data) {
      responseData.data = data;
    }

    res.json(responseData);
  },
  error: (res: Response, error: APIError): void => {
    const responseData: ResponseData = {
      success: false,
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
      errorMessages: error.errorMessages || [],
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    };

    res.status(responseData.statusCode).json(responseData);
  },
};

export const handleResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
): void => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};