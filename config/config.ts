export const config = {
    secretKey: process.env.SECRET_KEY || 'secret-key',
    accessTokenExpiration: '15m',
    refreshTokenExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };
  