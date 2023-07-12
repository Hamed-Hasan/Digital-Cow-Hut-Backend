"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongodb_1 = require("mongodb");
const apiError_1 = require("../utils/apiError");
// Global error handling middleware
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    if (error instanceof apiError_1.APIError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error instanceof mongodb_1.MongoError && error.code === 11000) {
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
exports.errorHandler = errorHandler;
