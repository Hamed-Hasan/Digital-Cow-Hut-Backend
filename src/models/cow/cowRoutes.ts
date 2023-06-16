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


const router = express.Router();

router.post('/', validateRequest(createCowSchema), createCow);
router.get('/', getAllCows);
router.get('/filter', getCowsWithFilters);
router.get('/:id', getCowById);
router.patch('/:id', validateRequest(updateCowSchema), updateCow);
router.delete('/:id', deleteCow);

export const Cows = router;
