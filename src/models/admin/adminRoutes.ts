import { Router } from 'express';
import { validateRequest } from '../../middlewares/validationMiddleware';
import { createAdminSchema } from './validationSchemas';
import { createAdminHandler, loginAdmin } from './adminController';


const router = Router();
router.post('/login', loginAdmin);
router.post('/create-admin', validateRequest(createAdminSchema), createAdminHandler);

export const AdminRoutes = router;
