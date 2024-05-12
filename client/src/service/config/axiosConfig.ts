import axios, { AxiosError } from "axios";

export const apiBaseUrl = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API_VERSION}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  } 
});

const errorHandler = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response;
    return Promise.reject({ status, data });
  } else if ( error.request ) {
    return Promise.reject({ message: "Connection error", status: 500 });
  } else {
    return Promise.reject({ message: "Connection error", status: 500 });
  }
}

apiBaseUrl.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
  return errorHandler(error)
});