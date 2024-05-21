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

const isAuthRoute = (url: string) => {
  return url.includes("/sign-in") || url.includes("/sign-up");
};

apiBaseUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !isAuthRoute(config.url || "")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiBaseUrl.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
  return errorHandler(error)
});