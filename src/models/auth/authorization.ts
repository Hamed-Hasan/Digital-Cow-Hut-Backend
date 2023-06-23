import { Request, Response, NextFunction } from 'express';


interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authorizeAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Authorization failed: Admin access required' });
  }

  next();
};

export const authorizeSeller = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'seller') {
    return res.status(403).json({ success: false, message: 'Authorization failed: Seller access required' });
  }

  next();
};

export const authorizeBuyer = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'buyer') {
    return res.status(403).json({ success: false, message: 'Authorization failed: Buyer access required' });
  }

  next();
};
