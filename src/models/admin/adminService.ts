import { CreateAdminRequest, Admin } from './interfaces';
import AdminModel from './adminModel';

export async function createAdmin(adminData: CreateAdminRequest): Promise<Admin> {
  const admin = new AdminModel(adminData);
  await admin.save();
  return admin.toJSON(); // Use toJSON() instead of toObject()
}

