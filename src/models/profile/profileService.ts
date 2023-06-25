import bcrypt from 'bcrypt';
import { APIError } from '../../utils/apiError';
import UserModel from '../user/UserModel';
import { User } from '../user/interfaces';
export class ProfileService {
  // Get Profile Information
  async getProfileInformation(userId: string): Promise<Partial<User>> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new APIError('User not found', 404);
    }

    // Prepare the profile information response
    const profile: Partial<User> = {
      name: {
        firstName: user.name.firstName,
        lastName: user.name.lastName,
      },
      phoneNumber: user.phoneNumber,
      address: user.address,
      password: user.password, // Include the password field
    };

    return profile;
  }

  // Update Profile Information
  async updateProfileInformation(userId: string, updateData: Partial<User>): Promise<Partial<User>> {
    // Hash the password if provided
    if (updateData.password) {
      // Hash the password using your preferred hashing algorithm
       updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      throw new APIError('User not found', 404);
    }

    const profileInfo: Partial<User> = {
      name: updatedUser.name,
      phoneNumber: updatedUser.phoneNumber,
      address: updatedUser.address,
    };

    return profileInfo;
  }
}
