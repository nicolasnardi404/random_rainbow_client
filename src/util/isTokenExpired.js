import { decodeJwt } from "jose";

export default function isTokenExpired(token) {
  try {
    const decodedToken = decodeJwt(token);
    console.log(decodedToken.exp);
    const currentTime = Date.now() / 1000; // Current time in seconds
    console.log(currentTime);
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}
