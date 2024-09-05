// src/utils/authUtils.js

import axios from "axios";
import isTokenExpired from "./isTokenExpired"; // Adjust the import path as needed

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
    throw new Error("Token refresh failed");
  }
}
