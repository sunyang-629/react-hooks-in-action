import { useState, useEffect } from "react";
import Spinner from "../../spinner/spinner";
import { UserType } from "../../../model";

const UserPicker = () => {
  const [users, setUsers] = useState<UserType[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3500/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  if (users === null) return <Spinner />;

  return (
    <select>
      {users.map((user) => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
  );
};

export default UserPicker;
