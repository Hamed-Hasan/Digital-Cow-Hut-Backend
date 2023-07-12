"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
const authentication_1 = require("./authentication");
const authorization_1 = require("./authorization");
const userController_1 = require("../user/userController");
const router = express_1.default.Router();
router.post('/login', authController_1.loginUser);
router.post('/signup', userController_1.createUser);
router.post('/refresh-token', authController_1.refreshAccessToken);
router.post('/change-password', authentication_1.authenticateToken, (0, authorization_1.authorizeRole)(['admin', 'seller', 'buyer']), authController_1.changePassword);
// router.post('/forgot-password', forgetPassword);
// router.post('/reset-password', resetPassword);
exports.AuthRoutes = router;