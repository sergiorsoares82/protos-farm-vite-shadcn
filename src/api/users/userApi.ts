import type { User } from "../../types/user";
import api from "../api";

export interface PaginatedUsers {
  data: User[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export const fetchUsers = async (): Promise<PaginatedUsers> => {
  const { data } = await api.get<PaginatedUsers>("/users");
  return data;
};
