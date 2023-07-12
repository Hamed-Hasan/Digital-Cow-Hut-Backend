"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_USER_PASS = exports.DATABASE_URL = exports.PORT = exports.NODE_ENV = void 0;
_a = process.env, _b = _a.NODE_ENV, exports.NODE_ENV = _b === void 0 ? 'development' : _b, _c = _a.PORT, exports.PORT = _c === void 0 ? 8000 : _c, _d = _a.DATABASE_URL, exports.DATABASE_URL = _d === void 0 ? 'mongodb://localhost:27017/mydatabase' : _d, _e = _a.DEFAULT_USER_PASS, exports.DEFAULT_USER_PASS = _e === void 0 ? '#123456!$' : _e;
