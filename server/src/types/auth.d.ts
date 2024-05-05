export interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[];
}

export interface SignInData {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
}

export interface tokenData {
  refreshToken: string;
}