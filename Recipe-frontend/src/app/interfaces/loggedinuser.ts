import { User } from "./user";

export interface LoggedInUser {
  user: User | undefined;
  loginState: boolean;
}