import { FC, Suspense } from "react";
import { useQuery } from "react-query";
import { UserType } from "../../../../models";
import { getData } from "../../../../utils/api";
import { UserAvatar } from "../../../../components/user";
import { UserBookings, UserTodos } from "..";

interface IUserDetailsProps {
  userId: number;
  isPending: boolean;
}

const UserDetails: FC<IUserDetailsProps> = ({ userId, isPending }) => {
  const { data: user } = useQuery<UserType>(
    ["user", userId],
    () => getData<UserType>(`http://localhost:3500/users/${userId}`),
    { suspense: true }
  );

  return (
    <div className={isPending ? "item user user-pending" : "item user"}>
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
      {/* <SuspenseList></SuspenseList> */}
      <Suspense fallback={<p>Loading user bookings...</p>}>
        <UserBookings id={userId} />
      </Suspense>
      <Suspense fallback={<p>Loading user todos...</p>}>
        <UserTodos id={userId} />
      </Suspense>
    </div>
  );
};

export default UserDetails;
