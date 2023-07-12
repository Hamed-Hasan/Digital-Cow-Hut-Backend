import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { UserDocument } from '../user/UserModel';
import { config } from '../../config/config';
import { comparePasswords } from './bcryptUtils';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;

    // Find the user by phone number
    const user: UserDocument | null = await UserModel.findOne({ phoneNumber }).exec();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('Provided password:', password);
    console.log('Hashed password:', user.password);

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // console.log('Password match:', passwordMatch);

    // if (!passwordMatch) {
    //   return res.status(401).json({ success: false, message: 'Invalid password' });
    // }

    // Generate an access token
    const accessToken = jwt.sign({ _id: user._id, role: user.role }, config.secretKey, {
      expiresIn: config.accessTokenExpiration,
    });

    // Set the refresh token in the browser cookie (you may need to use a cookie library for this)
    res.cookie('refreshToken', generateRefreshToken(user), {
      httpOnly: true,
      maxAge: Number(config.refreshTokenExpiration), // Convert to number
    });

    // Send the access token in the response
    return res.status(200).json({ success: true, message: 'User logged in successfully', data: { accessToken } });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


  
export const refreshAccessToken = (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    // Verify the refresh token
    jwt.verify(refreshToken, config.secretKey, (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) {
        console.error('Refresh token verification error:', error);
        return res.status(401).json({ success: false, message: 'Invalid refresh token' });
      }

      // Generate a new access token
      const accessToken = jwt.sign(
        { _id: decoded._id, role: decoded.role },
        config.secretKey,
        { expiresIn: config.accessTokenExpiration }
      );

      // Send the new access token in the response
      return res.status(200).json({ success: true, message: 'New access token generated successfully!', data: { accessToken } });
    });
  } catch (error) {
    console.error('Refresh access token error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Helper function to generate a refresh token
const generateRefreshToken = (user: UserDocument): string => {
  return jwt.sign({ _id: user._id, role: user.role }, config.secretKey, {
    expiresIn: config.refreshTokenExpiration,
  });
};


export const changePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const { _id, role } = req.user;

    const user: UserDocument | null = await UserModel.findById(_id).exec();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the user has the appropriate role to change the password
    if (role === 'admin' || role === 'seller' || role === 'buyer') {
      // Update the password with the new password
      user.password = newPassword;

      // Hash the new password
      // const saltRounds = 10;
      // const hashedPassword = await hashPassword(newPassword, saltRounds);
      // user.password = hashedPassword;

      await user.save();

      return res.status(200).json({ success: true, message: 'Password changed successfully' });
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized: You do not have permission to change the password' });
    }
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

