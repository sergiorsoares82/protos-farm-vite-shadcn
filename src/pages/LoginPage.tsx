// pages/LoginPage.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (credentials) => {
      const { data } = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      login(data.accessToken);
      navigate("/");
    },
  });

  return (
    <div style={{ maxWidth: 300, margin: "50px auto" }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => mutation.mutate({ email, password })}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>
      {mutation.isError && <p style={{ color: "red" }}>Login failed</p>}
    </div>
  );
};
