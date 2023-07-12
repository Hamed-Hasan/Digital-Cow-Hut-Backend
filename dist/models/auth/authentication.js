"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwtUtils_1 = require("./jwtUtils");
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication failed: Token missing' });
    }
    try {
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Authentication failed: Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
