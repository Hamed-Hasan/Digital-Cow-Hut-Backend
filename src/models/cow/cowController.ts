import { Request, Response } from 'express';
import { createCowSchema } from './cowValidation';
import CowModel, { CowDocument } from './cowModel';
import { APIError } from '../../utils/apiError';
import { handleResponse } from '../../utils/responseHandler';

export const createCow = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = createCowSchema.parse(req.body);
      const cow = await CowModel.create(validatedData);
      const populatedCow = await cow.populate('seller');
      handleResponse(res, 201, 'Cow created successfully', populatedCow);
    } catch (error) {
      if (error instanceof APIError) {
        handleResponse(res, error.statusCode, error.message);
      } else {
        handleResponse(res, 500, 'Internal Server Error');
      }
    }
  };
  

export const getAllCows = async (req: Request, res: Response): Promise<void> => {
  try {
    const cows = await CowModel.find();
    handleResponse(res, 200, 'Cows retrieved successfully', cows);
  } catch (error) {
    handleResponse(res, 500, 'Internal Server Error');
  }
};



export const deleteCow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cow = await CowModel.findByIdAndDelete(id);
    if (!cow) {
      throw new APIError(404, 'Cow not found');
    }
    handleResponse(res, 200, 'Cow deleted successfully', cow);
  } catch (error) {
    if (error instanceof APIError) {
      handleResponse(res, error.statusCode, error.message);
    } else {
      handleResponse(res, 500, 'Internal Server Error');
    }
  }
};
