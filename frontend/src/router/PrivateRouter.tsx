import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import type { PrivateRouteProps } from "../types/privateRoute";
//import { jwtDecode } from "jwt-decode";
//import type { DecodedToken } from "../types/DecodeToken";
import { decodetoken } from "../utiliy/DecodeToken";


const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.token) return <Navigate to="/login" />;
//let userRole = '';
  try {
    /*
    const decoded = jwtDecode<DecodedToken>(auth.token);
    userRole = decoded.role;
    */
  } catch (err) {
    console.error("Token invalide :", err);
    return <Navigate to="/login" />;
  }

  if (roles && (!decodetoken(auth.token) || !roles.includes(decodetoken(auth.token)))) {
    console.warn("Accès refusé : rôle non autorisé", userRole);
    return <p>Vous n'avez pas le droit d'accéder à cette page.</p>;
  }
  return children;
};

export default PrivateRoute;
