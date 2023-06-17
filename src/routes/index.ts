import express from 'express';
import { SellerAndBuyerUser } from '../models/user/userRoutes';
import { Cows } from '../models/cow/cowRoutes';
import { OrderTransactions } from '../models/cowOrderTransaction/orderRoutes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: SellerAndBuyerUser,
  },
  {
    path: '/cows',
    route: Cows,
  },
  {
    path: '/orders',
    route: OrderTransactions,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
