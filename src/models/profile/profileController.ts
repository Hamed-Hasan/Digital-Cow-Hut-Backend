import { Request, Response, NextFunction } from 'express';
import { ProfileService } from './profileService';
import { responseHandler } from '../../utils/responseHandler';
import { APIError } from '../../utils/apiError';

const profileService = new ProfileService();

// Get Profile Information
export const getProfileInformation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id; // Retrieve the user's ID from the request

    if (!userId) {
      throw new APIError('User ID not provided', 400);
    }

    const profile = await profileService.getProfileInformation(userId);

    responseHandler.success(res, 'User information retrieved successfully', profile);
  } catch (error) {
    next(error);
  }
};

// Update Profile Information
export const updateProfileInformation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _id } = req.user; // Retrieve user ID from the access token
    const updateData = req.body;

    const updatedProfile = await profileService.updateProfileInformation(_id, updateData);

    responseHandler.success(res, 'User\'s information updated successfully', updatedProfile);
  } catch (error) {
    next(error);
  }
};
