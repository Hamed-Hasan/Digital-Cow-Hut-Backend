import express from 'express';
import { createUserSchema, updateUserSchema } from './userValidation';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createUser, deleteSingleUser, getAllUsers, getSingleUser, updateSingleUser } from './userController';
import { authenticateToken } from '../auth/authentication';
import { authorizeAdmin, authorizeRole } from '../auth/authorization';
import { getProfileInformation, updateProfileInformation } from '../profile/profileController';
import { updateProfileSchema } from '../profile/profileValidation';
const router = express.Router();



// Get Profile Information
router.get('/my-profile', authenticateToken, authorizeRole(['buyer', 'seller', 'admin']), getProfileInformation);

// Update Profile Information
router.patch('/my-profile',
 authenticateToken, authorizeRole(['buyer', 'seller', 'admin']), validateRequest(updateProfileSchema), updateProfileInformation);





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
