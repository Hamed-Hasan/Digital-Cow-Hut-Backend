import express from 'express';
import { createUserSchema, updateUserSchema } from './userValidation';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createUser, deleteSingleUser, getAllUsers, getSingleUser, updateSingleUser } from './userController';
import { authenticateToken } from '../auth/authentication';
import { authorizeAdmin } from '../auth/authorization';
import { getProfileInformation, updateProfileInformation } from '../profile/profileController';
import { updateProfileSchema } from '../profile/profileValidation';
const router = express.Router();



// Get Profile Information
router.get('/my-profile', authenticateToken, getProfileInformation);

// Update Profile Information
router.patch('/my-profile', authenticateToken, async (req, res, next) => {
    try {
      // Validate the request body against the schema
      const requestData = updateProfileSchema.parse(req.body);
  
      // Continue with the updateProfileInformation handler
      await updateProfileInformation(req, res, next);
    } catch (error) {
      next(error);
    }
  });





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
