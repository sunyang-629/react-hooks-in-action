import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { UserPicker } from "../../components/user";

const MainLayout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/bookings" className="btn btn-header">
                <FaCalendarAlt />
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link to="/bookables" className="btn btn-header">
                <FaDoorOpen />
                <span>Bookables</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="btn btn-header">
                <FaUsers />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
        <UserPicker />
      </header>
      <Outlet />
    </>
  );
};

export default MainLayout;
