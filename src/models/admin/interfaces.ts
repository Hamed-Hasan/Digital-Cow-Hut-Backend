interface Name {
    firstName: string;
    lastName: string;
  }
  
  interface Admin {
    _id: string;
    phoneNumber: string;
    role: 'admin';
    password: string;
    name: Name;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  }
  