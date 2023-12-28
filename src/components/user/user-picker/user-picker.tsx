import { ChangeEvent } from "react";
import Spinner from "../../spinner/spinner";
import { UserType } from "../../../models";
import { useUser } from "../../../hooks";
import useFetch from "../../../hooks/use-fetch/use-fetch";

const UserPicker = () => {
  const { data: users = [], status } = useFetch<UserType[]>(
    "http://localhost:3500/users"
  );

  const [user, setUser] = useUser();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectId = parseInt(e.target.value, 10);
    const selectedUser = users?.find((u) => u.id === selectId);
    if (selectedUser && setUser) setUser(selectedUser);
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <span>Error!</span>;
  }

  return (
    <select onChange={handleSelect} value={user?.id}>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
};

export default UserPicker;
