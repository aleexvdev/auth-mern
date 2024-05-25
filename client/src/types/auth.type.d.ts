export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ErrorResponse {
  status: number;
  data: {
    timestamp: string;
    code: number;
    status: boolean;
    data: {
      message: string;
      detail: string;
    }
  }
}

export interface MappedResponse {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string[];
  };
  token: string;
}

export interface VerifyToken {
  token: string;
}