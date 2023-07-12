import jwt from 'jsonwebtoken';
import { config } from '../../config/config';


export const generateAccessToken = (payload: any): string => {
  return jwt.sign(payload, config.secretKey, { expiresIn: config.accessTokenExpiration });
};

export const generateRefreshToken = (payload: any): string => {
  return jwt.sign(payload, config.secretKey, { expiresIn: config.refreshTokenExpiration });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.secretKey);
};
