export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  primaryMobile: string;
  secondaryMobile?: string | null;
  password: string;
  role: Role;
  dob: Date;
  createdAt: Date;
}

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export type AddressType = "PERMANENT" | "CURRENT" | "OTHER";

export interface AddressModel {
  id: String;
  userId: String;
  type: AddressType;
  street: String;
  city: String;
  state: String;
  country: String;
  zipCode: String;
}
