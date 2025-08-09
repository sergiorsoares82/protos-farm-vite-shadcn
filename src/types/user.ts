export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Optional for updates
  role_id?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
