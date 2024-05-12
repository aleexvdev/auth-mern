import { AxiosError } from "axios"
import { SignInFormData } from "../../types/auth.type"
import { apiBaseUrl } from "../config/axiosConfig";

export const AuthAPI = {
  signInAuth: async (body: SignInFormData) => {
    try {
      const response = await apiBaseUrl.post("/auth/sign-in", body);
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      return errorAxios;
    }
  }
}

