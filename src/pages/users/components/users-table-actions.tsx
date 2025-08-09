import { Button } from "@/components/ui/button";
import type { UserType } from "./users-type";

interface Props {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (id: string) => void;
}

export const UserTableActions = ({ user, onEdit, onDelete }: Props) => {
  return (
    <div className="flex space-x-2">
      <Button size="sm" onClick={() => onEdit(user)}>
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(user.user_id)}
      >
        Delete
      </Button>
    </div>
  );
};
