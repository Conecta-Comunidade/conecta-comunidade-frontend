import { UserRole } from '../../model/user-role';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
