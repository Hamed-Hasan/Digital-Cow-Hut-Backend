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
exports.performTransaction = void 0;
const cowModel_1 = __importDefault(require("../models/cow/cowModel"));
const OrderModel_1 = require("../models/cowOrderTransaction/OrderModel");
const UserModel_1 = __importDefault(require("../models/user/UserModel"));
const apiError_1 = require("../utils/apiError");
const performTransaction = (cow, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the cow and buyer exist
    const [existingCow, existingBuyer] = yield Promise.all([
        cowModel_1.default.findById(cow),
        UserModel_1.default.findById(buyer),
    ]);
    if (!existingCow || !existingBuyer) {
        throw new apiError_1.APIError('Cow or buyer not found', 404);
    }
    // Check if the cow is available for sale
    if (existingCow.label !== 'for sale') {
        throw new apiError_1.APIError('The cow is not available for sale', 400);
    }
    // Check if the buyer has enough money to buy the cow
    if (existingBuyer.budget < existingCow.price) {
        throw new apiError_1.APIError('Not enough funds to buy the cow', 400);
    }
    // Start a transaction
    const session = yield OrderModel_1.OrderModel.startSession();
    session.startTransaction();
    try {
        // Update the cow's label to 'sold out'
        existingCow.label = 'sold out';
        yield existingCow.save({ session });
        // Deduct the cost from the buyer's budget
        existingBuyer.budget -= existingCow.price;
        yield existingBuyer.save({ session });
        // Add the same amount to the seller's income
        const seller = yield UserModel_1.default.findById(existingCow.seller);
        if (!seller) {
            throw new apiError_1.APIError('Seller not found', 404);
        }
        seller.income += existingCow.price;
        yield seller.save({ session });
        // Create the order entry
        const order = yield OrderModel_1.OrderModel.create([
            {
                cow,
                buyer,
            },
        ], { session });
        // Commit the transaction
        yield session.commitTransaction();
        // End the transaction session
        session.endSession();
    }
    catch (error) {
        // Rollback the transaction if any error occurs
        yield session.abortTransaction();
        // End the transaction session
        session.endSession();
        throw error;
    }
});
exports.performTransaction = performTransaction;
