import { Schema, model } from 'mongoose';
import { ADMIN_ROLE } from './constants';

const adminSchema = new Schema({
  phoneNumber: { type: String, required: true },
  role: { type: String, default: ADMIN_ROLE },
  password: { type: String,required: true,select: 0 }, // Exclude password field from query results and database storage
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


const Admin = model('Admin', adminSchema);

export default Admin;
