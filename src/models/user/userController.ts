import { NextFunction, Request, Response } from 'express';
import { User } from './interfaces';
import UserModel from './UserModel';
import { responseHandler } from '../../utils/responseHandler';
import { APIError } from '../../utils/apiError';
import mongoose from 'mongoose';


// Create a new User
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: User = req.body;
    const newUser = await UserModel.create(userData);
    responseHandler.success(res, 'User created successfully', newUser);
  } catch (error) {
    const apiError = new APIError('Failed to create user', error);
    responseHandler.error(res, apiError);
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find();
    responseHandler.success(res, 'Users retrieved successfully', users);
  } catch (error) {
    const apiError = new APIError('Failed to retrieve users', error);
    responseHandler.error(res, apiError);
  }
};

// Get a Single User
export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new APIError('User ID must be a valid ObjectId', 400, ['User ID must be a valid ObjectId']);
    }

    const user = await UserModel.findById(id);
    if (!user) {
      throw new APIError('User not found', 404, ['User not found']);
    }

    responseHandler.success(res, 'User retrieved successfully', { user });
  } catch (error) {
    const apiError = new APIError('Failed to retrieve user', 400, [error.message]);
    responseHandler.error(res, apiError);
  }
};




// Update a Single User
export const updateSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: Partial<User> = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      throw new APIError('User not found', 404);
    }
    responseHandler.success(res, 'User updated successfully', updatedUser);
  } catch (error) {
    const apiError = new APIError('Failed to update user', error);
    responseHandler.error(res, apiError);
  }
};

// Delete a User
export const deleteSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      const apiError = new APIError('User not found', 404);
      throw apiError;
    }
    responseHandler.success(res, 'User deleted successfully', deletedUser);
  } catch (error) {
    // next(error);
    throw new  APIError('User does not deleted', error);
    
  }
};