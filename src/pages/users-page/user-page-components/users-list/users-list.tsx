import { FC } from "react";
import { UserType } from "../../../../models";
import { useQuery } from "react-query";
import { getData } from "../../../../utils/api";
// import { PendingButton } from "../../../../components/buttons";
import Spinner from "../../../../components/spinner";

interface IUserListProps {
  user: UserType;
  setUser: (u: UserType) => void;
  isPending: boolean;
}

const UsersList: FC<IUserListProps> = ({ user, setUser, isPending }) => {
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
            {isPending && <Spinner />} {u.name} {isPending && <Spinner />}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
