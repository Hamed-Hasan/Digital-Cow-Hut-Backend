import { Request, Response } from 'express';
import { OrderModel } from './OrderModel';

import { APIError } from '../../utils/apiError';
import CowModel from '../cow/cowModel';
import UserModel from '../user/UserModel';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cow, buyer } = req.body;

    // Check if the cow and buyer exist
    const [existingCow, existingBuyer] = await Promise.all([
      CowModel.findById(cow),
      UserModel.findById(buyer),
    ]);

    if (!existingCow || !existingBuyer) {
      throw new APIError('Cow or buyer not found', 404);
    }

    // Check if the cow is available for sale
    if (existingCow.label !== 'for sale') {
      throw new APIError('The cow is not available for sale', 400);
    }

    // Check if the buyer has enough money to buy the cow
    if (existingBuyer.budget < existingCow.price) {
      throw new APIError('Not enough funds to buy the cow', 400);
    }

    // Start a transaction
    const session = await OrderModel.startSession();
    session.startTransaction();

    try {
      // Update the cow's label to 'sold out'
      existingCow.label = 'sold out';
      await existingCow.save({ session });

      // Deduct the cost from the buyer's budget
      existingBuyer.budget -= existingCow.price;
      await existingBuyer.save({ session });

      // Add the same amount to the seller's income
      const seller = await UserModel.findById(existingCow.seller);
      if (!seller) {
        throw new APIError('Seller not found', 404);
      }
      seller.income += existingCow.price;
      await seller.save({ session });

      // Create the order entry
      const order = await OrderModel.create(
        [
          {
            cow,
            buyer,
          }
        ],
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();

      // End the transaction session
      session.endSession();

      // Send the order object in the response
      res.json({
        success: true,
        statusCode: 200,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      // Rollback the transaction if any error occurs
      await session.abortTransaction();

      // End the transaction session
      session.endSession();

      throw error;
    }
  } catch (error) {
    // Handle API errors
    if (error instanceof APIError) {
      res.status(error.statusCode).json({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    } else {
      // Handle other errors
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
};
