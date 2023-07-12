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
exports.deleteSingleUser = exports.updateSingleUser = exports.getSingleUser = exports.getAllUsers = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("./UserModel"));
const responseHandler_1 = require("../../utils/responseHandler");
const apiError_1 = require("../../utils/apiError");
const mongoose_1 = __importDefault(require("mongoose"));
// Create a new User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newUser = yield UserModel_1.default.create(userData);
        responseHandler_1.responseHandler.success(res, 'User created successfully', newUser);
    }
    catch (error) {
        const apiError = new apiError_1.APIError('Failed to create user', error);
        responseHandler_1.responseHandler.error(res, apiError);
    }
});
exports.createUser = createUser;
// Get All Users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find();
        responseHandler_1.responseHandler.success(res, 'Users retrieved successfully', users);
    }
    catch (error) {
        const apiError = new apiError_1.APIError('Failed to retrieve users', error);
        responseHandler_1.responseHandler.error(res, apiError);
    }
});
exports.getAllUsers = getAllUsers;
// Get a Single User
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new apiError_1.APIError('User ID must be a valid ObjectId', 400, ['User ID must be a valid ObjectId']);
        }
        const user = yield UserModel_1.default.findById(id);
        if (!user) {
            throw new apiError_1.APIError('User not found', 404, ['User not found']);
        }
        responseHandler_1.responseHandler.success(res, 'User retrieved successfully', { user });
    }
    catch (error) {
        const apiError = new apiError_1.APIError('Failed to retrieve user', 400, [error.message]);
        responseHandler_1.responseHandler.error(res, apiError);
    }
});
exports.getSingleUser = getSingleUser;
// Update a Single User
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = yield UserModel_1.default.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            throw new apiError_1.APIError('User not found', 404);
        }
        responseHandler_1.responseHandler.success(res, 'User updated successfully', updatedUser);
    }
    catch (error) {
        const apiError = new apiError_1.APIError('Failed to update user', error);
        responseHandler_1.responseHandler.error(res, apiError);
    }
});
exports.updateSingleUser = updateSingleUser;
// Delete a User
const deleteSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield UserModel_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            const apiError = new apiError_1.APIError('User not found', 404);
            throw apiError;
        }
        responseHandler_1.responseHandler.success(res, 'User deleted successfully', deletedUser);
    }
    catch (error) {
        // next(error);
        throw new apiError_1.APIError('User does not deleted', error);
    }
});
exports.deleteSingleUser = deleteSingleUser;
