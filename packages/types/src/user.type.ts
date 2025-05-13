export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  countryCode: string,
  primaryMobile: string,
  secondaryMobile?: string | null,
  password: string,
  role: Role,
  dob: Date,
  createdAt: Date
}

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER"
}