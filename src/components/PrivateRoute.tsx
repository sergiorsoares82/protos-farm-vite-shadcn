// components/PrivateRoute.tsx
import { Outlet } from "react-router-dom";
import Layout from "./Layout";

export const PrivateRoute = () => {
  // const { token } = useAuth();
  // return token ? (
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
  // ) : (
  //   <Navigate to="/login" />
  // );
};
