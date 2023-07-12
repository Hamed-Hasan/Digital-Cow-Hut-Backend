"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = exports.handleResponse = void 0;
const handleResponse = (res, statusCode, message, data) => {
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
exports.handleResponse = handleResponse;
exports.responseHandler = {
    success: (res, message, data) => {
        const responseData = {
            success: true,
            statusCode: 200,
            message,
        };
        if (data) {
            responseData.data = data;
        }
        res.json(responseData);
    },
    error: (res, error) => {
        const responseData = {
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message || 'Internal Server Error',
            errorMessages: error.errorMessages || [],
            stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
        };
        res.status(responseData.statusCode).json(responseData);
    },
};
