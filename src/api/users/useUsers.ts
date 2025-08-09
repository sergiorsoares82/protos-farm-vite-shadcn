// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  type PaginatedUsers,
} from "@/api/users/userApi";
import type { UserType } from "@/pages/users/components/users-type";

export const useUsers = () => {
  return useQuery<PaginatedUsers>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<PaginatedUsers>(["users"]);

      if (previousUsers) {
        queryClient.setQueryData<PaginatedUsers>(["users"], {
          ...previousUsers,
          data: [
            ...previousUsers.data,
            { ...newUser, user_id: "temp-id" } as UserType,
          ],
        });
      }

      return { previousUsers };
    },
    onError: (_err, _newUser, context) => {
      queryClient.setQueryData(["users"], context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserType> }) =>
      updateUser(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<PaginatedUsers>(["users"]);

      if (previousUsers) {
        queryClient.setQueryData<PaginatedUsers>(["users"], {
          ...previousUsers,
          data: previousUsers.data.map((u) =>
            u.user_id === id ? { ...u, ...data } : u
          ),
        });
      }

      return { previousUsers };
    },
    onError: (_err, _newUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<PaginatedUsers>(["users"]);

      if (previousUsers) {
        queryClient.setQueryData<PaginatedUsers>(["users"], {
          ...previousUsers,
          data: previousUsers.data.filter((u) => u.user_id !== id),
        });
      }

      return { previousUsers };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["users"], context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
