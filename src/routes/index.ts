import express from 'express';
import { SellerAndBuyerUser } from '../models/user/userRoutes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: SellerAndBuyerUser,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
