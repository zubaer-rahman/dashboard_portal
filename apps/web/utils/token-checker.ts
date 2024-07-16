import { jwtDecode } from "jwt-decode";
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded && typeof decoded.exp !== "undefined") {
      return decoded.exp < currentTime;
    }
    return true;
  } catch (error) {
    console.error("Invalid token", error);
    return true;
  }
};
