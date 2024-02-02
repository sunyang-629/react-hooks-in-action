import { FC, Suspense } from "react";
import { useQuery } from "react-query";
import { getData } from "../../../../utils/api";
import { BookingType } from "../../../../models";
import { BookableType } from "../../../bookables-page/reducer/reducer";
import { Link } from "react-router-dom";
import Spinner from "../../../../components/spinner";

interface IUserBookingsProps {
  id: number;
}

const UserBookings: FC<IUserBookingsProps> = ({ id }) => {
  const { data: bookings = [] } = useQuery<BookingType[]>(
    ["userbookings", id],
    () =>
      getData<BookingType[]>(
        `http://localhost:3500/bookings?bookerId=${id}&_sort=date`
      ),
    { suspense: true }
  );

  return (
    <div className="user-bookings">
      <Suspense fallback={<p>Loading user bookings...</p>}>
        <BookingsTable bookings={bookings} />
      </Suspense>
    </div>
  );
};

interface IBookingsTableProps {
  bookings: BookingType[];
}

const BookingsTable: FC<IBookingsTableProps> = ({ bookings }) => {
  return bookings.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Session</th>
          <th>Bookable</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          // <p>{b.title}</p>
          <BookingRow booking={b} key={b.id} />
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no bookings for this user.</p>
  );
};

interface IBookingRowProps {
  booking: BookingType;
}

const BookingRow: FC<IBookingRowProps> = ({
  booking: { id, date, session, title, bookableId },
}) => {
  const {
    data: bookable,
    isFetching,
    isError,
  } = useQuery<BookableType>(["bookable", bookableId], () =>
    getData<BookableType>(`http://localhost:3500/bookables/${bookableId}`)
  );

  return (
    <tr key={id} className={isFetching ? "fetching" : ""}>
      <td>
        <Link to={`/bookings?bookableId=${bookableId}&date=${date}`}>
          {title}
        </Link>
      </td>
      <td>{new Date(date).toDateString()}</td>
      <td>{session}</td>
      <td>{bookable ? bookable.title : isError ? "???" : <Spinner />}</td>
    </tr>
  );
};

export default UserBookings;
