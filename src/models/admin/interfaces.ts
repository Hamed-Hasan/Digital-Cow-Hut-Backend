export interface Admin {
  _id: string;
  phoneNumber: string;
  role: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAdminRequest {
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
}
