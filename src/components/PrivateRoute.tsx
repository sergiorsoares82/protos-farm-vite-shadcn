// components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Layout } from "./Layout";

export const PrivateRoute = () => {
  const { token } = useAuth();
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
