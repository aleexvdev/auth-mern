import { AxiosError } from "axios";
import { apiBaseUrl } from "../config/axiosConfig";

export const UserAPI = {
  getUsers: async () => {
    try {
      const response = await apiBaseUrl.get("/users/all");
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      return errorAxios;
    }
  },
  getUserByToken : async () => {
    try {
      const response = await apiBaseUrl.get("/users/verify-user");
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      return errorAxios;
    }
  }
}