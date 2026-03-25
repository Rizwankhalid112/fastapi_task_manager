export interface User {
  id: number;
  full_name: string;
  email: string;
}

export interface UserUpdate {
  full_name?: string;
  email?: string;
  password?: string;
}
