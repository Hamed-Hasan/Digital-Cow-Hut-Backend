"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const adminController_1 = require("./adminController");
const router = (0, express_1.Router)();
router.post('/login', adminController_1.loginAdmin);
router.post('/create-admin', adminController_1.createAdminHandler);
exports.AdminRoutes = router;
