"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCowSchema = exports.createCowSchema = void 0;
const zod_1 = require("zod");
const cowConstants_1 = require("./cowConstants");
const locationValues = Object.values(cowConstants_1.LocationEnum);
const breedValues = Object.values(cowConstants_1.BreedEnum);
const labelValues = Object.values(cowConstants_1.LabelEnum);
const categoryValues = Object.values(cowConstants_1.CategoryEnum);
exports.createCowSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty(),
    age: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
    location: zod_1.z.enum([...locationValues]),
    breed: zod_1.z.enum([...breedValues]),
    weight: zod_1.z.number().positive(),
    label: zod_1.z.enum([...labelValues]).optional(),
    category: zod_1.z.enum([...categoryValues]),
    seller: zod_1.z.string().nonempty(),
});
exports.updateCowSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty().optional(),
    age: zod_1.z.number().positive().optional(),
    price: zod_1.z.number().positive().optional(),
    location: zod_1.z.enum(locationValues).optional(),
    breed: zod_1.z.enum(breedValues).optional(),
    weight: zod_1.z.number().positive().optional(),
    label: zod_1.z.enum(labelValues).optional(),
    category: zod_1.z.enum(categoryValues).optional(),
});
