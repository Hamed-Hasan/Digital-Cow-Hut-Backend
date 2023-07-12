import express from 'express';
import { loginUser, refreshAccessToken, changePassword, resetPassword, forgetPassword } from './authController';
import { authenticateToken } from './authentication';
import { authorizeRole } from './authorization';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createUserSchema } from '../user/userValidation';
import { createUser } from '../user/userController';


const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', validateRequest(createUserSchema), createUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/change-password', authenticateToken, authorizeRole(['admin', 'seller', 'buyer']), changePassword);

// router.post('/forgot-password', forgetPassword);
// router.post('/reset-password', resetPassword);

export const AuthRoutes = router;
