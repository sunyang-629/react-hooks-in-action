import { createBrowserRouter } from "react-router-dom";
import BookingsPage from "../pages/bookings-page";
import BookablesPage from "../pages/bookables-page";
import UsersPage from "../pages/users-page";
import MainLayout from "../layouts/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/bookings", element: <BookingsPage /> },
      {
        path: "/bookables",
        children: [
          { index: true, element: <BookablesPage /> },
          { path: ":id", element: <BookablesPage /> },
          { path: ":id/edit", element: <div>edit page</div> },
        ],
      },
      { path: "/users", element: <UsersPage /> },
    ],
  },
]);

export default router;
