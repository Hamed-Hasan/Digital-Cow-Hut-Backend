import express from 'express';
import { createOrder } from './createOrderTransaction';
import { getOrderHistory } from './orderHistory';


const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get order history
router.get('/', getOrderHistory);

export const OrderTransactions = router;
