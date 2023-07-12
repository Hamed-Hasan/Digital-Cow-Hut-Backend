"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("../models/user/userRoutes");
const cowRoutes_1 = require("../models/cow/cowRoutes");
const orderRoutes_1 = require("../models/cowOrderTransaction/orderRoutes");
const adminRoutes_1 = require("../models/admin/adminRoutes");
const authRoutes_1 = require("../models/auth/authRoutes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes_1.SellerAndBuyerUser,
    },
    {
        path: '/cows',
        route: cowRoutes_1.Cows,
    },
    {
        path: '/orders',
        route: orderRoutes_1.OrderTransactions,
    },
    {
        path: '/admins',
        route: adminRoutes_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: authRoutes_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
