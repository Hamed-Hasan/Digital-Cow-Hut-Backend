import { Router } from 'express';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createAdminSchema } from './validationSchemas';
import { createAdminHandler } from './adminController';


const router = Router();

router.post('/create-admin', validateRequest(createAdminSchema), createAdminHandler);

export const AdminRoutes = router;
