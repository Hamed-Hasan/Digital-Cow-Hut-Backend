"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTransactions = void 0;
const express_1 = __importDefault(require("express"));
const createOrderTransaction_1 = require("./createOrderTransaction");
const orderHistory_1 = require("./orderHistory");
const authentication_1 = require("../auth/authentication");
const authorization_1 = require("../auth/authorization");
const getSpecificOrder_1 = require("./getSpecificOrder");
const router = express_1.default.Router();
// Get Specific Order
router.get('/:id', authentication_1.authenticateToken, (0, authorization_1.authorizeRole)(['admin']), getSpecificOrder_1.getSpecificOrder);
// Create a new order
router.post('/', authentication_1.authenticateToken, createOrderTransaction_1.createOrder);
// Get order history
router.get('/', authentication_1.authenticateToken, (0, authorization_1.authorizeRole)(['admin', 'buyer', 'seller']), orderHistory_1.getOrderHistory);
exports.OrderTransactions = router;
