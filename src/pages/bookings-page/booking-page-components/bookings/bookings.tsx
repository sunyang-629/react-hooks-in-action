import { useState, FC, useEffect } from "react";
import { getWeek, shortISO } from "../../../../utils/date-wrangler";
import { BookableType } from "../../../bookables-page/reducer/reducer";
// import reducer from "../../reducer/reducer";
import WeekPicker from "../week-picker";
import { BookingDetails, BookingsGrid } from "..";
import { GridCellType } from "../../../../models";
import { useBookingParams, useBookings } from "../../../../hooks";

interface IBookingsProps {
  bookable?: BookableType | null;
}

const Bookings: FC<IBookingsProps> = ({ bookable }) => {
  //const [week, dispatch] = useReducer(reducer, new Date(), getWeek);
  const [booking, setBooking] = useState<GridCellType | null>(null);

  const { date } = useBookingParams();
  const week = getWeek(date);
  const weekStart = shortISO(week.start);

  const { data: bookings } = useBookings(
    bookable?.id ?? -1,
    week.start,
    week.end
  );
  let selectedBooking = booking;
  if (booking && bookings) {
    selectedBooking = bookings[booking.session][booking.date];
  }

  useEffect(() => {
    setBooking(null);
  }, [bookable, weekStart]);

  //TODO remove the dispatch from the WeekPicker Component
  return (
    <div className="bookings">
      <div>
        <WeekPicker />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetails booking={selectedBooking} bookable={bookable} />
    </div>
  );
};

export default Bookings;
