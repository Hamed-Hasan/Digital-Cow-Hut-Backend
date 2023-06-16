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

export const getCowsWithFilters = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract query parameters
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        minPrice,
        maxPrice,
        location,
        searchTerm,
      } = req.query as {
        page?: string,
        limit?: string,
        sortBy?: string,
        sortOrder?: string,
        minPrice?: string,
        maxPrice?: string,
        location?: string,
        searchTerm?: string,
      };
  
      // Build filter object
      const filter: any = {};
  
      if (minPrice) {
        filter.price = { $gte: Number(minPrice) };
      }
  
      if (maxPrice) {
        filter.price = { ...filter.price, $lte: Number(maxPrice) };
      }
  
      if (location) {
        filter.location = { $regex: location, $options: 'i' };
      }
  
      if (searchTerm) {
        filter.$or = [
          { location: { $regex: searchTerm, $options: 'i' } },
          { breed: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ];
      }
  
      // Parse page and limit values
      const pageNumber = Number(page);
      const pageSize = Number(limit);
  
      // Calculate skip value
      const skip = (pageNumber - 1) * pageSize;
  
      // Sort options
      const sortOptions: Record<string, any> = {};
      sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;
  
      // Execute query with pagination
      const cows: CowDocument[] = await CowModel.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);
  
      // Count total documents
      const totalDocs: number = await CowModel.countDocuments(filter);
  
      // Calculate total pages
      const totalPages: number = Math.ceil(totalDocs / pageSize);
  
      // Prepare response data
      const response = {
        docs: cows,
        totalDocs,
        totalPages,
      };
  
      handleResponse(res, 200, 'Cows retrieved successfully', response);
    } catch (error) {
      handleResponse(res, 500, 'Internal Server Error');
    }
  };
export const getCowById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cow = await CowModel.findById(id);
    if (!cow) {
      throw new APIError(404, 'Cow not found');
    }
    handleResponse(res, 200, 'Cow retrieved successfully', cow);
  } catch (error) {
    if (error instanceof APIError) {
      handleResponse(res, error.statusCode, error.message);
    } else {
      handleResponse(res, 500, 'Internal Server Error');
    }
  }
};

export const updateCow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = req.body;
    const cow = await CowModel.findByIdAndUpdate(id, validatedData, { new: true });
    if (!cow) {
      throw new APIError(404, 'Cow not found');
    }
    handleResponse(res, 200, 'Cow updated successfully', cow);
  } catch (error) {
    if (error instanceof APIError) {
      handleResponse(res, error.statusCode, error.message);
    } else {
      handleResponse(res, 500, 'Internal Server Error');
    }
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
