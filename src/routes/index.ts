import express from 'express';
import { SellerAndBuyerUser } from '../models/user/userRoutes';
import { Cows } from '../models/cow/cowRoutes';
import { OrderTransactions } from '../models/cowOrderTransaction/orderRoutes';
import { AdminRoutes } from '../models/admin/adminRoutes';


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
  {
    path: '/admins',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
