import { Request, Response, NextFunction } from 'express';
import { createAdminSchema } from './validationSchemas';
import { createAdmin } from './adminService';
import { handleResponse } from '../../utils/responseHandler';
import { APIError } from '../../utils/apiError';

export async function createAdminHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = createAdminSchema.parse(req.body);
    const admin = await createAdmin(validatedData);
    handleResponse(res, 201, 'Admin created successfully', admin);
  } catch (error: unknown) {
    next(new APIError('Failed to create admin', 500, [{ path: '', message: (error as Error).message }]));
  }
}
