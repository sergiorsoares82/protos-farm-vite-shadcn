import type { ColumnDef } from "@tanstack/react-table";
import type { UserType } from "./users-type";
import { UserTableActions } from "./users-table-actions";

export const getUsersTableColumns = (
  onEdit: (user: UserType) => void,
  onDelete: (id: string) => void
): ColumnDef<UserType>[] => [
  {
    accessorKey: "user_id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <UserTableActions
        user={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
