import { Request, Response } from 'express';
import { OrderModel } from './OrderModel';
import { performTransaction } from '../../orderTransaction/orderTransactionLogic';
import { APIError } from '../../utils/apiError';


export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cow, buyer } = req.body;

    // Perform the transaction
    await performTransaction(cow, buyer);

    // Create the order entry
    const order = await OrderModel.create({
      cow,
      buyer,
    });

    // Send the order object in the response
    res.json({
      success: true,
      statusCode: 200,
      message: 'Order created successfully',
      data: order,
    });
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
