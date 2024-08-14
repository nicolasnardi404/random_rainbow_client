import { decodeJwt } from "jose";

export default function isTokenExpired(token) {
  try {
    const decodedToken = decodeJwt(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}
