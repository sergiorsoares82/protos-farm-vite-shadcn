// src/pages/UsersPage.tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchUsers } from "../api/users/userApi";
import type { User } from "../types/user";

interface PaginatedUsers {
  data: User[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export const UsersPage = () => {
  const {
    data: usersResponse,
    isLoading,
    isError,
  } = useQuery<PaginatedUsers>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users</p>;

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <h2>Users</h2>

      <button
        onClick={() => {
          setIsCreating(true);
          setSelectedUser({
            user_id: "",
            username: "",
            email: "",
            is_active: false,
          });
        }}
      >
        Add User
      </button>
      <table
        border={1}
        cellPadding={5}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersResponse?.data.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_active ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => setSelectedUser(user)}>Edit</button>
                <button style={{ color: "red" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              maxWidth: 400,
              margin: "100px auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{isCreating ? "Add User" : "Edit User"}</h3>
            <input
              placeholder="Username"
              defaultValue={selectedUser.username || ""}
              style={{ display: "block", marginBottom: 10, width: "100%" }}
            />
            <input
              placeholder="Email"
              defaultValue={selectedUser.email || ""}
              style={{ display: "block", marginBottom: 10, width: "100%" }}
            />
            <label>
              <input
                type="checkbox"
                defaultChecked={selectedUser.is_active || false}
              />{" "}
              Active
            </label>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => setSelectedUser(null)}>Save</button>
              <button onClick={() => setSelectedUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
