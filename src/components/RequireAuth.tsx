import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/users/login" />;
};

export default RequireAuth;
