import express from 'express';
import { createOrder } from './createOrderTransaction';
import { getOrderHistory } from './orderHistory';
import { authenticateToken } from '../auth/authentication';
import { authorizeRole } from '../auth/authorization';
import { getSpecificOrder } from './getSpecificOrder';


const router = express.Router();

// Get Specific Order
router.get('/:id', authenticateToken, authorizeRole(['admin']), getSpecificOrder);

// Create a new order
router.post('/', authenticateToken, authorizeRole(['buyer']), createOrder);

// Get order history
router.get('/', authenticateToken, authorizeRole(['admin', 'buyer', 'seller']), getOrderHistory);

export const OrderTransactions = router;
