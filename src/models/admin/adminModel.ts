import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { ADMIN_ROLE } from './constants';

const saltRounds = 10;

const adminSchema = new Schema({
  phoneNumber: { type: String, required: true },
  role: { type: String, default: ADMIN_ROLE },
  password: { type: String, required: true,select: 0 },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

adminSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

adminSchema.methods.comparePasswords = async function (password: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const Admin = model('Admin', adminSchema);

export default Admin;
