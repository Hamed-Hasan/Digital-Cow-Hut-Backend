"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const validationSchemas_1 = require("./validationSchemas");
const adminController_1 = require("./adminController");
const router = (0, express_1.Router)();
router.post('/login', adminController_1.loginAdmin);
router.post('/create-admin', (0, validationMiddleware_1.validateRequest)(validationSchemas_1.createAdminSchema), adminController_1.createAdminHandler);
exports.AdminRoutes = router;