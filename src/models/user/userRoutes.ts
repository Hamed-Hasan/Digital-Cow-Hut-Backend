import express from 'express';
import { createUserSchema, updateUserSchema } from './userValidation';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createUser, deleteSingleUser, getAllUsers, getSingleUser, updateSingleUser } from './userController';
import { authenticateToken } from '../auth/authentication';
import { authorizeAdmin } from '../auth/authorization';
const router = express.Router();

router.post('/auth/signup', validateRequest(createUserSchema), createUser);
router.get('/', 
getAllUsers, authenticateToken, authorizeAdmin
);
router.get('/:id',
 getSingleUser,authenticateToken, authorizeAdmin,
 );
router.patch('/:id',
 validateRequest(updateUserSchema), updateSingleUser,
 authenticateToken, authorizeAdmin,
 );
router.delete('/:id', deleteSingleUser,
 authenticateToken, authorizeAdmin,
);

export const SellerAndBuyerUser = router;
