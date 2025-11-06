import type { User } from "./user";


export interface UpdateUserProps {
   user: User; 
  onUserUpdated?: (user: User) => void;
}