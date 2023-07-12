"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminSchema = void 0;
const zod_1 = require("zod");
exports.createAdminSchema = zod_1.z.object({
    password: zod_1.z.string().min(8),
    name: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
    phoneNumber: zod_1.z.string().min(11).max(11),
    address: zod_1.z.string(),
});
