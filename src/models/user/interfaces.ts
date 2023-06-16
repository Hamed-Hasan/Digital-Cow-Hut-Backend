import { UserRole } from "./userRoles";


export interface User {
  _id: string;
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
