import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwtUtils';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication failed: Token missing' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Authentication failed: Invalid token' });
  }
};
