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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileInformation = exports.getProfileInformation = void 0;
const profileService_1 = require("./profileService");
const responseHandler_1 = require("../../utils/responseHandler");
const apiError_1 = require("../../utils/apiError");
const profileService = new profileService_1.ProfileService();
// Get Profile Information
const getProfileInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Retrieve the user's ID from the request
        if (!userId) {
            throw new apiError_1.APIError('User ID not provided', 400);
        }
        const profile = yield profileService.getProfileInformation(userId);
        console.log("🚀 ~ file: profileController.ts:19 ~ getProfileInformation ~ profile:", profile);
        responseHandler_1.responseHandler.success(res, 'User information retrieved successfully', profile);
    }
    catch (error) {
        next(error);
    }
});
exports.getProfileInformation = getProfileInformation;
// Update Profile Information
const updateProfileInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user; // Retrieve user ID from the access token
        const updateData = req.body;
        const updatedProfile = yield profileService.updateProfileInformation(_id, updateData);
        responseHandler_1.responseHandler.success(res, 'User\'s information updated successfully', updatedProfile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfileInformation = updateProfileInformation;
