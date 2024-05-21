export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  users: UserType[] | null;
  isLoading: boolean;
  error: any | null;
  success: boolean;
}