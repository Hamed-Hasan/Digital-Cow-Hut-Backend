"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.createAdminHandler = void 0;
const adminService_1 = require("./adminService");
const responseHandler_1 = require("../../utils/responseHandler");
const apiError_1 = require("../../utils/apiError");
const adminModel_1 = __importDefault(require("./adminModel"));
const jwtUtils_1 = require("../auth/jwtUtils");
const createAdminHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (req.body);
        const admin = yield (0, adminService_1.createAdmin)(validatedData);
        (0, responseHandler_1.handleResponse)(res, 201, 'Admin created successfully', admin);
    }
    catch (error) {
        next(new apiError_1.APIError('Failed to create admin', 500, [{ path: '', message: error.message }]));
    }
});
exports.createAdminHandler = createAdminHandler;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    try {
        // Find the admin by phoneNumber in the database
        const admin = yield adminModel_1.default.findOne({ phoneNumber });
        // if (!admin) {
        //   return res.status(401).json({ success: false, message: 'Invalid phone number or password' });
        // }
        // // Log the hashed password for debugging
        // console.log('Hashed Password:', admin.password);
        // // Compare the provided password with the stored hashed password
        // const isPasswordMatch = await comparePasswords(password, admin.password);
        // if (!isPasswordMatch) {
        //   return res.status(401).json({ success: false, message: 'Invalid phone number or password' });
        // }
        // Generate access token and refresh token
        const accessToken = (0, jwtUtils_1.generateAccessToken)({ id: admin._id, role: admin.role });
        const refreshToken = (0, jwtUtils_1.generateRefreshToken)({ id: admin._id, role: admin.role });
        // Set the refresh token in a cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        // Return the access token in the response
        return res.json({
            success: true,
            statusCode: 200,
            message: 'User logged in successfully',
            data: {
                accessToken,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.loginAdmin = loginAdmin;
