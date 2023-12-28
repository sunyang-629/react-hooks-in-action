import { FC, useState } from "react";
import { UserType } from "../../../models";
import { UserContext, UserSetContext } from "../user-context";

interface IUserProviderProps {
  children: JSX.Element;
}

const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
