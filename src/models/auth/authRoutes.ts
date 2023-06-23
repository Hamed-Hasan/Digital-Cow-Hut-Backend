import express from 'express';
import { loginUser, refreshAccessToken } from './authController';


const router = express.Router();

router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);

export const AuthRoutes = router;
