import axios from "axios";
import isTokenExpired from "./isTokenExpired";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Helper function to redirect to login page
const redirectToLogin = () => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
  localStorage.removeItem("idUser");
  localStorage.removeItem("username");

  // Redirect to login page
  window.location.href = "/log-in";
};

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get tokens from localStorage
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // If no tokens, proceed with request
    if (!accessToken || !refreshToken) {
      return config;
    }

    try {
      // Check if both tokens are expired
      if (isTokenExpired(accessToken) && isTokenExpired(refreshToken)) {
        // Both tokens expired, redirect to login
        redirectToLogin();
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }

      // Check if only access token is expired
      if (isTokenExpired(accessToken) && !isTokenExpired(refreshToken)) {
        try {
          // Try to refresh the token
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/refresh`,
            { refreshToken }
          );

          // Update tokens in localStorage
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update Authorization header with new token
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          // If refresh fails, redirect to login
          redirectToLogin();
          return Promise.reject(error);
        }
      } else {
        // Access token not expired, add it to headers
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      // If any error occurs during token validation, redirect to login
      redirectToLogin();
      return Promise.reject(error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Check if refresh token exists and is not expired
        if (refreshToken && !isTokenExpired(refreshToken)) {
          // Try to refresh the token
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/refresh`,
            { refreshToken }
          );

          // Update tokens in localStorage
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update Authorization header with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Retry the original request
          return axiosInstance(originalRequest);
        } else {
          // Refresh token is expired or doesn't exist, redirect to login
          redirectToLogin();
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to create an authenticated API instance
export const createAuthenticatedApi = () => {
  return {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data = {}, config = {}) =>
      axiosInstance.post(url, data, config),
    put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
  };
};

export default axiosInstance;
