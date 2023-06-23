import { z } from 'zod';

export const createAdminSchema = z.object({
  password: z.string().min(8),
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  phoneNumber: z.string().min(11).max(11),
  address: z.string(),
});
