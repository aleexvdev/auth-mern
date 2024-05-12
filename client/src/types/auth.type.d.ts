export interface SignInFormData {
  email: string;
  password: string;
}

/* export interface AuthTypeResponse {
  code: number;
  status: boolean;
  timestamp: string;
  data: <T> | null;
} */

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