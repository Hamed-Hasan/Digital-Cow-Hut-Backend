import { Request, Response } from 'express';
import { createCowSchema } from './cowValidation';
import CowModel, { CowDocument } from './cowModel';
import { APIError } from '../../utils/apiError';
import { handleResponse } from '../../utils/responseHandler';
import { parsePaginationParams } from '../../paginatioHelper/pagination';
import { buildFilterObject } from '../../paginatioHelper/filter';

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
    const { skip, pageSize, sortOptions } = parsePaginationParams(req);
    const filter = buildFilterObject(req);

    const cows: CowDocument[] = await CowModel.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalDocs: number = await CowModel.countDocuments(filter);
    const totalPages: number = Math.ceil(totalDocs / pageSize);

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

// export const getCowById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const cow (id); // Assuming getCowById is defined somewhere

//     if (!cow) {
//       throw new APIError(404, 'Cow not found');
//     }

//     handleResponse(res, 200, 'Cow retrieved successfully', cow);
//   } catch (error) {
//     if (error instanceof APIError) {
//       handleResponse(res, error.statusCode, error.message);
//     } else {
//       handleResponse(res, 500, 'Internal Server Error');
//     }
//   }
// };
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
    const validatedData = req.body
    console.log(id);
    console.log(validatedData)
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
