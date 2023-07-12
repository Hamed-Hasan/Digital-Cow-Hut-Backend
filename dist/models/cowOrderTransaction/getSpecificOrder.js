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
exports.getSpecificOrder = void 0;
const apiError_1 = require("../../utils/apiError");
const responseHandler_1 = require("../../utils/responseHandler");
const OrderModel_1 = require("./OrderModel");
const getSpecificOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const orderId = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        // Retrieve the order based on the provided order ID
        const order = yield OrderModel_1.OrderModel.findById(orderId)
            .populate({
            path: 'cow',
            select: 'name age price location breed weight label category seller',
            populate: {
                path: 'seller',
                select: '_id role name phoneNumber address budget income',
            },
        })
            .populate({
            path: 'buyer',
            select: '_id role name phoneNumber address budget income',
        });
        if (!order) {
            throw new apiError_1.APIError('Order not found', 404);
        }
        // Check if the user is authorized to access the order
        const isAuthorized = userRole === 'admin' || (order.buyer && order.buyer.toString() === userId) || (order.seller && order.seller.toString() === userId);
        if (isAuthorized) {
            const formattedOrder = {
                cow: order.cow,
                buyer: order.buyer,
            };
            responseHandler_1.responseHandler.success(res, 'Order information retrieved successfully', { formattedOrder });
        }
        else {
            throw new apiError_1.APIError('Unauthorized access to order information', 403);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getSpecificOrder = getSpecificOrder;
