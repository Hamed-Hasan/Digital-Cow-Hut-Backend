"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    secretKey: process.env.SECRET_KEY || 'secret-key',
    accessTokenExpiration: '15m',
    refreshTokenExpiration: 7 * 24 * 60 * 60 * 1000,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
