// src/utils/authUtils.js

import axios from "axios";
import isTokenExpired from "./isTokenExpired"; // Adjust the import path as needed

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

export async function refreshTokenIfNeeded(context) {
  const {
    accessToken,
    refreshToken,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = context;

  if (!isTokenExpired(refreshToken)) {
    return refreshToken;
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/refresh`,
      { refreshToken: `${refreshToken}` }
    );

    const responseData = response.data;
    setAccessTokenLocal(responseData.accessToken);
    setRefreshTokenLocal(responseData.refreshToken);

    return responseData.refreshToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Redirect to login page when token refresh fails
    redirectToLogin();
    throw new Error("Token refresh failed");
  }
}
