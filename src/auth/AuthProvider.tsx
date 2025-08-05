import { useState, type ReactNode } from "react";
import { setAccessToken } from "../api/api";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const login = (accessToken: string) => {
    setToken(accessToken);
    setAccessToken(accessToken);
  };

  const logout = () => {
    setToken(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
