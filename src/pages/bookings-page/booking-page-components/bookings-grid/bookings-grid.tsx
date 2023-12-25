import React, { FC, Fragment, useEffect, useMemo, useState } from "react";
import { BookingType, GridCellType, GridType, IWeek } from "../../../../models";
import {
  BookableType,
  ErrorType,
} from "../../../bookables-page/reducer/reducer";
import { getGrid, transformBookings } from "../../../../utils/grid-builder";
import { getBookings } from "../../../../utils/api";
import Spinner from "../../../../components/spinner";

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
  const [bookings, setBookings] = useState<GridType | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);

  const { grid, sessions, dates } = useMemo(
    () =>
      bookable
        ? getGrid(bookable, week.start)
        : { grid: {}, sessions: [], dates: [] },
    [bookable, week.start]
  );

  useEffect(() => {
    let doUpdate: boolean = true;

    const fetchDate = async () => {
      if (!bookable) return;
      setBookings(null);
      setError(null);
      setBooking(null);

      try {
        const result = await getBookings<BookingType[]>(
          bookable.id,
          week.start,
          week.end
        );
        if (doUpdate) setBookings(transformBookings(result));
      } catch (error) {
        setError(error as ErrorType);
      }
    };

    fetchDate();
    return () => {
      doUpdate = false;
    };
  }, [week, bookable, setBooking]);

  const renderCell = (session: string, date: string) => {
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={bookings ? () => setBooking(cellData) : undefined}
      >
        {cellData.title}
      </td>
    );
  };

  if (Object.keys(grid).length === 0) return <p>Loading...</p>;

  return (
    <Fragment>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings date (${error.message})`}
        </p>
      )}

      <table className={bookings ? "bookingsGrid active" : "bookingsGrid"}>
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
