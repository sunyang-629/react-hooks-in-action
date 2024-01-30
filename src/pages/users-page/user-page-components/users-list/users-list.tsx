import { FC } from "react";
import { UserType } from "../../../../models";
import { useQuery } from "react-query";
import { getData } from "../../../../utils/api";

interface IUserListProps {
  user: UserType;
  setUser: (u: UserType) => void;
}

const UsersList: FC<IUserListProps> = ({ user, setUser }) => {
  const { data: users = [] } = useQuery<UserType[], Error>(
    "users",
    () => getData<UserType[]>("http://localhost:3500/users"),
    { suspense: true }
  );

  return (
    <ul className="users items-list-nav">
      {users.map((u) => (
        <li key={u.id} className={u.id === user.id ? "selected" : undefined}>
          <button className="btn" onClick={() => setUser(u)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
