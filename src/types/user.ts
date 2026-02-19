export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  position: string;
  department: string;
  phone?: string;
  avatarUrl?: string;
  birthDate?: string;
  hireDate?: string;
}

export interface UserShort {
  id: string;
  fullName: string;
  position: string;
  department: string;
  avatarUrl?: string;
}
