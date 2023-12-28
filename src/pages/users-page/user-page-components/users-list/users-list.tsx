import { useState, Fragment } from "react";
import { UserType } from "../../../../models";
import Spinner from "../../../../components/spinner";
import { useUser } from "../../../../hooks";
import useFetch from "../../../../hooks/use-fetch/use-fetch";

const UsersList = () => {
  // const [error, setError] = useState<null | ErrorType>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [users, setUsers] = useState<UserType[]>([]);

  const {
    data: users = [],
    status,
    error,
  } = useFetch<UserType[]>("http://localhost:3500/users");

  const [localUser] = useUser();

  const [userIndex, setUserIndex] = useState<number>((localUser?.id ?? 1) - 1);
  const user = users[userIndex];

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const result = await getData<UserType[]>("http://localhost:3500/users");
  //       setUsers(result);
  //     } catch (error) {
  //       setError(error as ErrorType);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  if (status === "error") return <p>{error?.message}</p>;

  if (status === "loading")
    return (
      <p>
        <Spinner /> Loading users ...{" "}
      </p>
    );

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.id} className={i === userIndex ? "selected" : undefined}>
            <button className="btn" onClick={() => setUserIndex(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
