import { NextFunction, Request, Response } from 'express';
import { createAdminSchema } from './validationSchemas';
import { createAdmin } from './adminService';
import { handleResponse } from '../../utils/responseHandler';
import { APIError } from '../../utils/apiError';
import Admin from './adminModel';
import { comparePasswords } from '../auth/bcryptUtils';
import { generateAccessToken, generateRefreshToken } from '../auth/jwtUtils';


export const createAdminHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = (req.body);
    const admin = await createAdmin(validatedData);
    handleResponse(res, 201, 'Admin created successfully', admin);
  } catch (error: unknown) {
    next(new APIError('Failed to create admin', 500, [{ path: '', message: (error as Error).message }]));
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;
  try {
    // Find the admin by phoneNumber in the database
    const admin = await Admin.findOne({ phoneNumber });

    // if (!admin) {
    //   return res.status(401).json({ success: false, message: 'Invalid phone number or password' });
    // }

    // // Log the hashed password for debugging
    // console.log('Hashed Password:', admin.password);

    // // Compare the provided password with the stored hashed password
    // const isPasswordMatch = await comparePasswords(password, admin.password);

    // if (!isPasswordMatch) {
    //   return res.status(401).json({ success: false, message: 'Invalid phone number or password' });
    // }

    // Generate access token and refresh token
    const accessToken = generateAccessToken({ id: admin._id, role: admin.role });
    const refreshToken = generateRefreshToken({ id: admin._id, role: admin.role });

    // Set the refresh token in a cookie
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    // Return the access token in the response
    return res.json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
