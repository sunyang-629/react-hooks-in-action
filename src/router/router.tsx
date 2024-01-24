import { createBrowserRouter } from "react-router-dom";
// import BookingsPage from "../pages/bookings-page";
// import BookablesPage from "../pages/bookables-page";
// import UsersPage from "../pages/users-page";
import MainLayout from "../layouts/main-layout";
import {
  BookableEdit,
  BookableNew,
  BookablesView,
} from "../pages/bookables-page/bookables-page-components";
import { Fragment, lazy } from "react";
import ErrorBoundary from "../components/error-boundary";

const BookingsPage = lazy(() => import("../pages/bookings-page"));
const BookablesPage = lazy(() => import("../pages/bookables-page"));
const UsersPage = lazy(() => import("../pages/users-page"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary
        fallback={
          <Fragment>
            <h1>Something went wrong!</h1>
            <p>Try reloading the page.</p>
          </Fragment>
        }
      >
        <MainLayout />
      </ErrorBoundary>
    ),
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
