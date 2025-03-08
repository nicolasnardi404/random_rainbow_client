/**
 * Centralized logout function to be used across the application
 * when authentication fails or tokens cannot be refreshed
 */
export const logoutUser = () => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
  localStorage.removeItem("idUser");
  localStorage.removeItem("username");

  // Always redirect to login page
  window.location.href = "/log-in";
};

/**
 * Check if user is authenticated by verifying tokens in localStorage
 */
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return !!(accessToken && refreshToken);
};
