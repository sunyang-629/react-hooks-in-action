import React, { FC, Fragment } from "react";
import { GridCellType, IWeek } from "../../../../models";
import { BookableType } from "../../../bookables-page/reducer/reducer";
import Spinner from "../../../../components/spinner";
import useBookings from "../../../../hooks/use-bookings/use-bookings";
import useGrid from "../../../../hooks/use-grid/use-grid";

interface IBookingsGridProps {
  week: IWeek;
  bookable?: BookableType | null;
  booking: GridCellType | null;
  setBooking: React.Dispatch<React.SetStateAction<GridCellType | null>>;
}

const BookingsGrid: FC<IBookingsGridProps> = ({
  week,
  bookable,
  booking,
  setBooking,
}) => {
  const {
    data: bookings,
    status,
    error,
  } = useBookings(bookable?.id ?? -1, week.start, week.end);

  const { grid, sessions, dates } = useGrid(bookable, week.start);

  const renderCell = (session: string, date: string) => {
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={status === "success" ? () => setBooking(cellData) : undefined}
      >
        {cellData.title}
      </td>
    );
  };

  if (!grid) return <p>Waiting for bookable and week details...</p>;

  return (
    <Fragment>
      {status === "error" && (
        <p className="bookingsError">
          {`There was a problem loading the bookings date (${error})`}
        </p>
      )}

      <table
        className={
          status === "success" ? "bookingsGrid active" : "bookingsGrid"
        }
      >
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>{new Date(d).toDateString()}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => renderCell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BookingsGrid;
