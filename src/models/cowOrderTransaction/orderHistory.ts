import { Request, Response } from 'express';
import { OrderModel } from './OrderModel';

export const getOrderHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderModel.find().populate('cow buyer');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
};
