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
exports.changePassword = exports.refreshAccessToken = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../user/UserModel"));
const config_1 = require("../../config/config");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, password } = req.body;
        // Find the user by phone number
        const user = yield UserModel_1.default.findOne({ phoneNumber }).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log('Provided password:', password);
        console.log('Hashed password:', user.password);
        // Compare the provided password with the hashed password in the database
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        // console.log('Password match:', passwordMatch);
        // if (!passwordMatch) {
        //   return res.status(401).json({ success: false, message: 'Invalid password' });
        // }
        // Generate an access token
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.config.secretKey, {
            expiresIn: config_1.config.accessTokenExpiration,
        });
        // Set the refresh token in the browser cookie (you may need to use a cookie library for this)
        res.cookie('refreshToken', generateRefreshToken(user), {
            httpOnly: true,
            maxAge: Number(config_1.config.refreshTokenExpiration), // Convert to number
        });
        // Send the access token in the response
        return res.status(200).json({ success: true, message: 'User logged in successfully', data: { accessToken } });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
const refreshAccessToken = (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        // Verify the refresh token
        jsonwebtoken_1.default.verify(refreshToken, config_1.config.secretKey, (error, decoded) => {
            if (error) {
                console.error('Refresh token verification error:', error);
                return res.status(401).json({ success: false, message: 'Invalid refresh token' });
            }
            // Generate a new access token
            const accessToken = jsonwebtoken_1.default.sign({ _id: decoded._id, role: decoded.role }, config_1.config.secretKey, { expiresIn: config_1.config.accessTokenExpiration });
            // Send the new access token in the response
            return res.status(200).json({ success: true, message: 'New access token generated successfully!', data: { accessToken } });
        });
    }
    catch (error) {
        console.error('Refresh access token error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.refreshAccessToken = refreshAccessToken;
// Helper function to generate a refresh token
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.config.secretKey, {
        expiresIn: config_1.config.refreshTokenExpiration,
    });
};
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPassword } = req.body;
        const { _id, role } = req.user;
        const user = yield UserModel_1.default.findById(_id).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // Check if the user has the appropriate role to change the password
        if (role === 'admin' || role === 'seller' || role === 'buyer') {
            // Update the password with the new password
            user.password = newPassword;
            // Hash the new password
            // const saltRounds = 10;
            // const hashedPassword = await hashPassword(newPassword, saltRounds);
            // user.password = hashedPassword;
            yield user.save();
            return res.status(200).json({ success: true, message: 'Password changed successfully' });
        }
        else {
            return res.status(403).json({ success: false, message: 'Unauthorized: You do not have permission to change the password' });
        }
    }
    catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.changePassword = changePassword;
