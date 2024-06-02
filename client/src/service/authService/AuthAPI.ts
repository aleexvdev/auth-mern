import { AxiosError } from "axios"
import { SignInFormData, SignUpFormData, VerifyToken, sendCodeOTPMailProps, verifyCodeOTPMailProps } from "../../types/auth.type"
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
  },
  signUpAuth: async (body: SignUpFormData) => {
    try {
      const response = await apiBaseUrl.post("/auth/sign-up", body);
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      return errorAxios;
    }
  },
  verifyToken: async (body: VerifyToken) => {
    try {
      const response = await apiBaseUrl.post("/auth/verify-token", body);
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      return errorAxios;
    }
  },
  sendCodeOTPMail: async (body: sendCodeOTPMailProps) => {
    try {
      const response = await apiBaseUrl.post("/auth/send-code-otp-mail", body);
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      return errorAxios;
    }
  },
  verifyCodeOTPMail: async (body: verifyCodeOTPMailProps) => {
    try {
      const response = await apiBaseUrl.post("/auth/verify-otp", body);
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      return errorAxios;
    }
  }
}

