import { Request, Response, NextFunction } from 'express';
import { getCowById } from '../cow/cowController';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { role } = req.user;
    if (allowedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Authorization failed: Invalid role' });
    }
  };
};

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

export const authorizeSellerForCow = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const cowId = req.params.id;

  try {
    const cowSeller = await getCowById(cowId);
    if (!cowSeller) {
      return res.status(404).json({ success: false, message: 'Cow not found' });
    }

    if (!req.user || req.user.role !== 'seller' || req.user._id !== cowSeller.sellerId) {
      return res
        .status(403)
        .json({ success: false, message: 'Authorization failed: Only the seller of the cow can perform this action' });
    }

    next();
  } catch (error) {
    console.error('Authorize seller for cow error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
