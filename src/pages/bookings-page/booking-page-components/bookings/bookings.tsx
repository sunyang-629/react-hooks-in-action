import { useState, FC, useReducer } from "react";
import { getWeek } from "../../../../utils/date-wrangler";
import { BookableType } from "../../../bookables-page/reducer/reducer";
import reducer from "../../reducer/reducer";
import WeekPicker from "../week-picker";
import { BookingDetails, BookingsGrid } from "..";
import { GridCellType } from "../../../../models";

interface IBookingsProps {
  bookable?: BookableType | null;
}

const Bookings: FC<IBookingsProps> = ({ bookable }) => {
  const [week, dispatch] = useReducer(reducer, new Date(), getWeek);
  const [booking, setBooking] = useState<GridCellType | null>(null);

  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetails booking={booking} bookable={bookable} />
    </div>
  );
};

export default Bookings;
