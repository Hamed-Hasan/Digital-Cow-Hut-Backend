import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from './userRoles';


export interface UserDocument extends Document {
  phoneNumber: string;
  role: UserRole;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  phoneNumber: {
    type: String,
    required: true,
    index: true, 
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
  },
  income: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<UserDocument>('User', UserSchema);