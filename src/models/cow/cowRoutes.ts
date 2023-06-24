import express from 'express';
import { createCowSchema, updateCowSchema } from './cowValidation';
import {
  createCow,
  getAllCows,
  getCowsWithFilters,
  getCowById,
  updateCow,
  deleteCow,
} from './cowController';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { authenticateToken } from '../auth/authentication';
import { authorizeRole, authorizeSellerForCow } from '../auth/authorization';


const router = express.Router();

router.post('/', authenticateToken, authorizeRole(['seller']), validateRequest(createCowSchema), createCow);
router.get('/', authenticateToken, authorizeRole(['admin', 'seller', 'buyer']), getAllCows);
router.get('/filter', authenticateToken, authorizeRole(['admin', 'seller', 'buyer']), getCowsWithFilters);
router.get('/:id', authenticateToken, authorizeRole(['admin', 'seller', 'buyer']), getCowById);
router.patch('/:id', authenticateToken, validateRequest(updateCowSchema), updateCow);
router.delete('/:id', authenticateToken, authorizeRole(['seller']), deleteCow);

export const Cows = router;
