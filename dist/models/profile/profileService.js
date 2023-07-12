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
exports.ProfileService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiError_1 = require("../../utils/apiError");
const UserModel_1 = __importDefault(require("../user/UserModel"));
class ProfileService {
    // Get Profile Information
    getProfileInformation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findById(userId);
            if (!user) {
                throw new apiError_1.APIError('User not found', 404);
            }
            // Prepare the profile information response
            const profile = {
                name: {
                    firstName: user.name.firstName,
                    lastName: user.name.lastName,
                },
                phoneNumber: user.phoneNumber,
                address: user.address,
                password: user.password, // Include the password field
            };
            return profile;
        });
    }
    // Update Profile Information
    updateProfileInformation(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash the password if provided
            if (updateData.password) {
                // Hash the password using your preferred hashing algorithm
                updateData.password = yield bcrypt_1.default.hash(updateData.password, 10);
            }
            const updatedUser = yield UserModel_1.default.findByIdAndUpdate(userId, updateData, { new: true });
            if (!updatedUser) {
                throw new apiError_1.APIError('User not found', 404);
            }
            const profileInfo = {
                name: updatedUser.name,
                phoneNumber: updatedUser.phoneNumber,
                address: updatedUser.address,
            };
            return profileInfo;
        });
    }
}
exports.ProfileService = ProfileService;
