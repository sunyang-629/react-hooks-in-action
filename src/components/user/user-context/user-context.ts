import { createContext } from "react";
import { UserType } from "../../../models";

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
