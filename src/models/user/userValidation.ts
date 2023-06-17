import { z } from 'zod';

export const createUserSchema = z.object({
  password: z.string().min(8),
  role: z.enum(['seller', 'buyer']),
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  phoneNumber: z.string().min(10),
  address: z.string(),
  budget: z.number().optional(),
  income: z.number().optional(),
});

export const updateUserSchema = z.object({
  password: z.string().min(8).optional(),
  role: z.enum(['seller', 'buyer']).optional(),
  name: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }),
  phoneNumber: z.string().min(5).optional(),
  address: z.string().optional(),
  budget: z.number().optional(),
  income: z.number().optional(),
});