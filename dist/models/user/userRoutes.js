"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerAndBuyerUser = void 0;
const express_1 = __importDefault(require("express"));
const userValidation_1 = require("./userValidation");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const userController_1 = require("./userController");
const authentication_1 = require("../auth/authentication");
const authorization_1 = require("../auth/authorization");
const profileController_1 = require("../profile/profileController");
const profileValidation_1 = require("../profile/profileValidation");
const router = express_1.default.Router();
// Get Profile Information
router.get('/my-profile', authentication_1.authenticateToken, (0, authorization_1.authorizeRole)(['buyer', 'seller', 'admin']), profileController_1.getProfileInformation);
// Update Profile Information
router.patch('/my-profile', authentication_1.authenticateToken, (0, authorization_1.authorizeRole)(['buyer', 'seller', 'admin']), (0, validationMiddleware_1.validateRequest)(profileValidation_1.updateProfileSchema), profileController_1.updateProfileInformation);
// router.post('/auth/signup', validateRequest(createUserSchema), createUser);
router.get('/', authentication_1.authenticateToken, userController_1.getAllUsers);
router.get('/:id', authentication_1.authenticateToken, userController_1.getSingleUser);
router.patch('/:id', (0, validationMiddleware_1.validateRequest)(userValidation_1.updateUserSchema), authentication_1.authenticateToken, userController_1.updateSingleUser);
router.delete('/:id', authentication_1.authenticateToken, userController_1.deleteSingleUser);
exports.SellerAndBuyerUser = router;
