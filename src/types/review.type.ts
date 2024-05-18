export interface Review {
  _id: string;
  content: string;
  rating: number;
  user: User;
  product: null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  address: string;
  phoneNumber: string;
}
