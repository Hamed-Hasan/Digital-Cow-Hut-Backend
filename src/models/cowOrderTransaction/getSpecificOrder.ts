import { RequestHandler } from 'express-serve-static-core';
import { Request, Response, NextFunction } from 'express';
import { APIError } from '../../utils/apiError';
import { responseHandler } from '../../utils/responseHandler';
import { OrderModel } from './OrderModel';


export const getSpecificOrder: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    // Retrieve the order based on the provided order ID
    const order = await OrderModel.findById(orderId)
      .populate({
        path: 'cow',
        select: 'name age price location breed weight label category seller',
        populate: {
          path: 'seller',
          select: '_id role name phoneNumber address budget income',
        },
      })
      .populate({
        path: 'buyer',
        select: '_id role name phoneNumber address budget income',
      });

    if (!order) {
      throw new APIError('Order not found', 404);
    }

    // Check if the user is authorized to access the order
    const isAuthorized = userRole === 'admin' || (order.buyer && order.buyer.toString() === userId) || (order.seller && order.seller.toString() === userId);
    if (isAuthorized) {
      const formattedOrder = {
        cow: order.cow,
        buyer: order.buyer,
      };
      responseHandler.success(res, 'Order information retrieved successfully', { formattedOrder });
    } else {
      throw new APIError('Unauthorized access to order information', 403);
    }
  } catch (error) {
    next(error);
  }
};
  

