import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import {
  BookableEdit,
  BookableNew,
  BookablesView,
} from "../pages/bookables-page/bookables-page-components";
import { Fragment, lazy } from "react";
import ErrorBoundary from "../components/error-boundary";

const LazyBookingsPage = lazy(() => import("../pages/bookings-page"));
const LazyBookablesPage = lazy(() => import("../pages/bookables-page"));
const LazyUsersPage = lazy(() => import("../pages/users-page"));

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
      { path: "/bookings", element: <LazyBookingsPage /> },
      {
        path: "/bookables",
        element: <LazyBookablesPage />,
        children: [
          { index: true, element: <BookablesView /> },
          { path: ":id", element: <BookablesView /> },
          { path: ":id/edit", element: <BookableEdit /> },
          { path: "new", element: <BookableNew /> },
        ],
      },
      { path: "/users", element: <LazyUsersPage /> },
    ],
  },
]);

export default router;
