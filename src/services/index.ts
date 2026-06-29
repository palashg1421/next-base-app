import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});


/** Request Interceptor */
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


/** Response Interceptor */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;