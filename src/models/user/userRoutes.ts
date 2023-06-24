import express from 'express';
import { createUserSchema, updateUserSchema } from './userValidation';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createUser, deleteSingleUser, getAllUsers, getSingleUser, updateSingleUser } from './userController';
import { authenticateToken } from '../auth/authentication';
import { authorizeAdmin } from '../auth/authorization';
const router = express.Router();

router.post('/auth/signup', validateRequest(createUserSchema), createUser);

router.get('/', authenticateToken, authorizeAdmin, getAllUsers
);

router.get('/:id',authenticateToken, authorizeAdmin,
getSingleUser
);

router.patch('/:id',
 validateRequest(updateUserSchema),
 authenticateToken, authorizeAdmin,
  updateSingleUser
 );
router.delete('/:id', 
 authenticateToken, authorizeAdmin,
 deleteSingleUser
);

export const SellerAndBuyerUser = router;
