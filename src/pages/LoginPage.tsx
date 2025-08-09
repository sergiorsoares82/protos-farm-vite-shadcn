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
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <button
        onClick={() => mutation.mutate({ email, password })}
        disabled={mutation.isPending || !email || !password}
        className={`w-full py-2 rounded text-white ${
          mutation.isPending
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition-colors`}
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>

      {mutation.isError && (
        <p className="mt-4 text-center text-red-600">
          {(mutation.error as Error).message || "Login failed"}
        </p>
      )}
    </div>
  );
};
