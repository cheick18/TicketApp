import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/DecodeToken";

export const decodetoken = (token?: string | null): string | null => {
  try {
    if (!token || typeof token !== "string") return null;
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || null;
  } catch (error) {
    console.warn("Erreur lors du décodage du token :", error);
    return null; 
  }
};
