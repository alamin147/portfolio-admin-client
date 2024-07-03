import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  const decoded: any = jwtDecode(token);
  if (!decoded?.username) {
    return <Navigate to="/home" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
