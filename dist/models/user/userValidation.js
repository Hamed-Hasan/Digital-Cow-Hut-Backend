"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    password: zod_1.z.string().min(5),
    role: zod_1.z.enum(['seller', 'buyer']),
    name: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
    phoneNumber: zod_1.z.string().min(5),
    address: zod_1.z.string(),
    budget: zod_1.z.number().optional(),
    income: zod_1.z.number().optional(),
});
exports.updateUserSchema = zod_1.z.object({
    password: zod_1.z.string().min(8).optional(),
    role: zod_1.z.enum(['seller', 'buyer']).optional(),
    name: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    }),
    phoneNumber: zod_1.z.string().min(5).optional(),
    address: zod_1.z.string().optional(),
    budget: zod_1.z.number().optional(),
    income: zod_1.z.number().optional(),
});
