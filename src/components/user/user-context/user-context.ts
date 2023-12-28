import { createContext } from "react";
import { UserType } from "../../../models";

// type UserContextType = {
//   user: UserType | null;
//   setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
// };

export const UserContext = createContext<UserType | null>(null);
export const UserSetContext = createContext<React.Dispatch<
  React.SetStateAction<UserType | null>
> | null>(null);

//export default UserContext;
