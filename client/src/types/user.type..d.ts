export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  recoveryCode?: string | null;
  recoveryCodeExpires?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  users: WritableDraft<UserType>[] | null;
  isLoading: boolean;
  error: any | null;
  success: boolean;
}

export interface bodyQueryUser {
  token: string;
}