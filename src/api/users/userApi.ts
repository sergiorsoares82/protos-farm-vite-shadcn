// src/api/users/userApi.ts
import api from "@/api/api";
import type { UserType } from "@/pages/users/components/users-type";
import type { User } from "@/types/user";

export interface PaginatedUsers {
  data: UserType[];
  total: number;
  page: number;
  pageSize: number;
}

export const fetchUsers = async (): Promise<PaginatedUsers> => {
  const { data } = await api.get("/users");
  return data;
};

export const createUser = async (newUser: Partial<User>): Promise<User> => {
  const { data } = await api.post("/users", newUser);
  return data;
};

export const updateUser = async (
  id: string,
  updatedUser: Partial<User>
): Promise<User> => {
  const { data } = await api.patch(`/users/${id}`, updatedUser);
  return data;
};

export const deleteUser = async (id: string): Promise<{ success: boolean }> => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
