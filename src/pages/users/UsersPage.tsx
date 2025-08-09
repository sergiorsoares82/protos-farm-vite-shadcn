import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { DataTable } from "@/components/data-table/data-table";
// import { getUsersTableColumns } from "./components/users-table-columns";
import type { UserType } from "./components/users-type";
import type { User } from "@/types/user";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  // useDeleteUser,
} from "@/api/users/useUsers";

export const UsersPage = () => {
  const { data: users, isLoading } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  // const deleteMutation = useDeleteUser();

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  const { register, handleSubmit, reset } = useForm<Partial<User>>({
    defaultValues: { username: "", email: "", password: "" },
  });

  // const handleEdit = (user: UserType) => {
  //   setEditingUser(user);
  //   reset({ username: user.username, email: user.email, password: "" });
  //   setOpen(true);
  // };

  // const handleDelete = (id: string) => {
  //   if (confirm("Delete this user?")) deleteMutation.mutate(id);
  // };

  const onSubmit = (data: Partial<User>) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.user_id, data });
    } else {
      createMutation.mutate(data);
    }
    reset();
    setEditingUser(null);
    setOpen(false);
  };

  useEffect(() => {
    if (open && !editingUser) {
      reset({ username: "", email: "", password: "" });
    }
  }, [open, editingUser, reset]);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!users) return <p className="p-4">No users found.</p>;

  // const columns = getUsersTableColumns(handleEdit, handleDelete);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Users</h1>
        <Button
          onClick={() => {
            reset();
            setEditingUser(null);
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </div>

      {/* <DataTable columns={columns} data={users.data} /> */}

      <Dialog open={open} onOpenChange={setOpen} aria-label="User Form">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
            <DialogDescription>
              {" "}
              Please fill out the form below to{" "}
              {editingUser ? "edit the user" : "add a new user"}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input {...register("username")} placeholder="Username" />
            <Input {...register("email")} placeholder="Email" />
            <Input
              {...register("password")}
              placeholder="Password"
              type="password"
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
