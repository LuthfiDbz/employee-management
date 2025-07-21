// axiosInstance.ts
import axios, { AxiosInstance } from "axios";
// import UserLocalStorage from "./userLocalStorage";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DEV_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the AUTH token (put from localStorage) for any request
axiosInstance.interceptors.request.use((config) => {
  // const storage = new UserLocalStorage()
  // config.headers.Authorization = `Bearer ${storage.file.accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.errcode === 400) {
      throw new Error("Not Authorized")
    } else {
      return response
    }
  },
  (error) => {
    // if (error.response)
    //   if (error.response.status === 401) {
    //     store.dispatch(setAuthToken(null));
    //     store.dispatch(setLoginStatus(false));

    //     window.location = "/login";
    //   } else if (error.response.status === 503) {
    //     const pathname = window.location.pathname
    //     if(!pathname.includes('maintenance')) {
    //       window.location = "/maintenance";
    //     }
    //   }
    throw error;
  }
);

export default axiosInstance;