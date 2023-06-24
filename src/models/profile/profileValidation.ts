import { ZodSchema, z } from 'zod';

// Define the Zod schema for the profile update data
export const updateProfileSchema: ZodSchema<{
  password?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
}> = z.object({
  password: z.string().optional(),
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  phoneNumber: z.string(),
  address: z.string(),
});
