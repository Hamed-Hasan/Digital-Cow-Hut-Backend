"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema for the profile update data
exports.updateProfileSchema = zod_1.z.object({
    password: zod_1.z.string().optional(),
    name: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
    phoneNumber: zod_1.z.string(),
    address: zod_1.z.string(),
});
