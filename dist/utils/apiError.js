"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(message, statusCode, errorMessages = []) {
        super(message);
        this.statusCode = statusCode;
        this.errorMessages = errorMessages;
    }
}
exports.APIError = APIError;
