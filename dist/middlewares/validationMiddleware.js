"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const apiError_1 = require("../utils/apiError");
// Middleware for request validation
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessage = error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message,
                }));
                const apiError = new apiError_1.APIError('Validation Error');
                apiError.errorMessages = errorMessage;
                next(apiError);
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateRequest = validateRequest;
