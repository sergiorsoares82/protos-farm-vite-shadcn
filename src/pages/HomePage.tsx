// pages/HomePage.tsx
import { useAuth } from "../auth/useAuth";

export const HomePage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
