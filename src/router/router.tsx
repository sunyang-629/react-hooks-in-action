import { createBrowserRouter } from "react-router-dom";
import BookingsPage from "../pages/bookings-page";
import BookablesPage from "../pages/bookables-page";
import UsersPage from "../pages/users-page";
import MainLayout from "../layouts/main-layout";
import {
  BookableEdit,
  BookableNew,
  BookablesView,
} from "../pages/bookables-page/bookables-page-components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/bookings", element: <BookingsPage /> },
      {
        path: "/bookables",
        element: <BookablesPage />,
        children: [
          { index: true, element: <BookablesView /> },
          { path: ":id", element: <BookablesView /> },
          { path: ":id/edit", element: <BookableEdit /> },
          { path: "new", element: <BookableNew /> },
        ],
      },
      { path: "/users", element: <UsersPage /> },
    ],
  },
]);

export default router;
