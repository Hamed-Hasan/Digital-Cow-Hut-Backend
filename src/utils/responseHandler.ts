import { Response } from 'express';
import { APIError } from './apiError';

interface ResponseData {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
  errorMessages?: any[];
  stack?: string;
}




export const handleResponse = (res: Response, statusCode: number, message: string, data?: any): void => {
  const isValidStatusCode = statusCode >= 100 && statusCode < 600;

  if (!isValidStatusCode) {
    // Instead of throwing an error, set the status code to 500 (Internal Server Error)
    statusCode = 500;
    message = 'Internal Server Error';
  }

  const response = {
    statusCode,
    message,
    data,
  };

  res.status(statusCode).json(response);
};








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