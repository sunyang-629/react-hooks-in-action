import { FC } from "react";
import { useQuery } from "react-query";
import { UserType } from "../../../../models";
import { getData } from "../../../../utils/api";
import { UserAvatar } from "../../../../components/user";

interface IUserDetailsProps {
  userId: number;
}

const UserDetails: FC<IUserDetailsProps> = ({ userId }) => {
  const { data: user } = useQuery<UserType>(
    ["user", userId],
    () => getData<UserType>(`http://localhost:3500/users/${userId}`),
    { suspense: true }
  );

  return (
    <div className="item user">
      <div className="item-header">
        <h2>{user!.name}</h2>
      </div>
      <UserAvatar
        src={`http://localhost:3500/img/${user?.img}`}
        fallbackSrc="http://localhost:3500/img/avatar.gif"
        alt={user!.name}
      />
      <div className="user-details">
        <h3>{user!.title}</h3>
        <p>{user!.notes}</p>
      </div>
    </div>
  );
};

export default UserDetails;
