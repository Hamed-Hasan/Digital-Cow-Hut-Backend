import express from 'express';
import { createUserSchema, updateUserSchema } from './userValidation';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createUser, deleteSingleUser, getAllUsers, getSingleUser, updateSingleUser } from './userController';
const router = express.Router();

router.post('/auth/signup', validateRequest(createUserSchema), createUser);
router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.patch('/:id', validateRequest(updateUserSchema), updateSingleUser);
router.delete('/:id', deleteSingleUser);

export const SellerAndBuyerUser = router;
