import { z } from "zod";

export const userSchema = z.object({
  user_id: z.string().uuid(),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  is_active: z.boolean(),
});

export type UserType = z.infer<typeof userSchema>;

export type UserTableActionsType = {
  user: {
    user_id: string;
    username: string;
    email: string;
    is_active: boolean;
  };
  onEdit: () => void;
};
