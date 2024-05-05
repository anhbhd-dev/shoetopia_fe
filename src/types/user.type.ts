import { Role } from "@/enum/role";

export type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  roles?: Role[];
  createdAt?: string;
  updatedAt?: string;
  phoneNumber?: string;
  address?: string;
};
