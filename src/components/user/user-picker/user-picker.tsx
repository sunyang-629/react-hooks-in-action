import { useState, useEffect, ChangeEvent, useContext } from "react";
import Spinner from "../../spinner/spinner";
import { UserType } from "../../../models";
import { UserContext } from "..";

const UserPicker = () => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  //const [user, setUser] = useState<UserType | null>(null);
  const user = useContext(UserContext)?.user;
  const setUser = useContext(UserContext)?.setUser;

  useEffect(() => {
    fetch("http://localhost:3500/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        if (setUser) setUser(data[0]);
      });
  }, [setUser]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectId = parseInt(e.target.value, 10);
    const selectedUser = users?.find((u) => u.id === selectId);
    if (selectedUser && setUser) setUser(selectedUser);
  };

  if (users === null) return <Spinner />;

  return (
    <>
      <select onChange={handleSelect} value={user?.id}>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      {/* <UserTest /> */}
    </>
  );
};

export default UserPicker;

// const UserTest = () => {
//   const [state] = useState<null>(null);

//   console.log("in function");

//   useEffect(() => {
//     console.log("in effect function");
//   }, [state]);

//   return <p>{state}</p>;
// };
