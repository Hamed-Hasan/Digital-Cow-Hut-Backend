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
exports.createOrder = void 0;
const OrderModel_1 = require("./OrderModel");
const orderTransactionLogic_1 = require("../../orderTransaction/orderTransactionLogic");
const apiError_1 = require("../../utils/apiError");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cow, buyer } = req.body;
        // Perform the transaction
        yield (0, orderTransactionLogic_1.performTransaction)(cow, buyer);
        // Create the order entry
        const order = yield OrderModel_1.OrderModel.create({
            cow,
            buyer,
        });
        // Send the order object in the response
        res.json({
            success: true,
            statusCode: 200,
            message: 'Order created successfully',
            data: order,
        });
    }
    catch (error) {
        // Handle API errors
        if (error instanceof apiError_1.APIError) {
            res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                message: error.message,
            });
        }
        else {
            // Handle other errors
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: 'Internal Server Error',
            });
        }
    }
});
exports.createOrder = createOrder;
