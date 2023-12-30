import { Outlet } from "react-router-dom";

const BookablesPage = () => {
  return (
    <main className="bookables-page">
      <Outlet />
    </main>
  );
};

export default BookablesPage;
