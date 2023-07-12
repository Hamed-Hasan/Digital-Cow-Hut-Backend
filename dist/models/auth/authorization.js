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
exports.authorizeSellerForCow = exports.authorizeBuyer = exports.authorizeSeller = exports.authorizeAdmin = exports.authorizeRole = void 0;
const cowController_1 = require("../cow/cowController");
const responseHandler_1 = require("../../utils/responseHandler");
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (allowedRoles.includes(role)) {
            next();
        }
        else {
            res.status(403).json({ success: false, message: 'Authorization failed: Invalid role' });
        }
    };
};
exports.authorizeRole = authorizeRole;
const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Authorization failed: Admin access required' });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
const authorizeSeller = (req, res, next) => {
    if (!req.user || req.user.role !== 'seller') {
        return res.status(403).json({ success: false, message: 'Authorization failed: Seller access required' });
    }
    next();
};
exports.authorizeSeller = authorizeSeller;
const authorizeBuyer = (req, res, next) => {
    if (!req.user || req.user.role !== 'buyer') {
        return res.status(403).json({ success: false, message: 'Authorization failed: Buyer access required' });
    }
    next();
};
exports.authorizeBuyer = authorizeBuyer;
const authorizeSellerForCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    try {
        const cowSeller = yield (0, cowController_1.getCowById)(cowId);
        if (!cowSeller) {
            return (0, responseHandler_1.handleResponse)(res, 404, 'Cow not found');
        }
        if (!req.user || req.user.role !== 'seller' || req.user._id !== cowSeller.sellerId) {
            return (0, responseHandler_1.handleResponse)(res, 403, 'Authorization failed: Only the seller of the cow can perform this action');
        }
        next();
    }
    catch (error) {
        console.error('Authorize seller for cow error:', error);
        (0, responseHandler_1.handleResponse)(res, 500, 'Internal server error');
    }
});
exports.authorizeSellerForCow = authorizeSellerForCow;
