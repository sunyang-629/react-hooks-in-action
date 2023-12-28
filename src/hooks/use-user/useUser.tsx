import { useContext } from "react";
import {
  UserContext,
  UserSetContext,
} from "../../components/user/user-context";
import { UserType } from "../../models";

//!! must define the return type here */
//!! otherwise it's type could be seemed as in (UserType | React.Dispatch<React.SetStateAction<UserType | null>> | null)[]
const useUser = (): [
  UserType | null,
  React.Dispatch<React.SetStateAction<UserType | null>>
] => {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  if (!setUser) throw new Error("The UserProvider is missing");

  return [user, setUser];
};

export default useUser;
