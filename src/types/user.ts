export interface User {
  user_id: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
