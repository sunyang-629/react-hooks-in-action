import { FC, Suspense, useDeferredValue, useState } from "react";
import { useUser } from "../../hooks";
import { UserDetails, UsersList } from "./user-page-components";
import { UserType } from "../../models";
import { useQueryClient } from "react-query";
import { getData } from "../../utils/api";
import PageSpinner from "../../components/page-spinner";

const UsersPage: FC = () => {
  const [localUser] = useUser();
  // const [ispending, startTransition] = useTransition();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const user = selectedUser || localUser;
  const queryClient = useQueryClient();

  const deferredUser = useDeferredValue(user) || user;
  const isPending = deferredUser !== user;

  const switchUser = (nextUser: UserType) => {
    setSelectedUser(nextUser);

    queryClient.prefetchQuery<UserType>(["user", nextUser.id], () =>
      getData<UserType>(`http://localhost:3500/users/${nextUser.id}`)
    );

    queryClient.prefetchQuery<HTMLImageElement>(
      `http://localhost:3500/img/${nextUser.img}`,
      () =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = `http://localhost:3500/img/${nextUser.img}`;
        })
    );
  };

  if (!user) return null;

  return (
    <main className="users-page">
      <UsersList user={user} setUser={switchUser} isPending={isPending} />
      <Suspense fallback={<PageSpinner />}>
        <UserDetails userId={deferredUser!.id} isPending={isPending} />
      </Suspense>
    </main>
  );
};

export default UsersPage;
