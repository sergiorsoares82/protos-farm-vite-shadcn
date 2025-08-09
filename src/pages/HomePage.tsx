// pages/HomePage.tsx
import { useAuth } from "../auth/useAuth";

export const HomePage = () => {
  const { logout } = useAuth();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>Bem vindo ao Protos Farm!</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};
