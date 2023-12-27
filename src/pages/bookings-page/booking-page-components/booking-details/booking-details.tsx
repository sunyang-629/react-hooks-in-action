import { FC, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { GridCellType } from "../../../../models";
import { BookableType } from "../../../bookables-page/reducer/reducer";
import { Booking } from "..";
import { UserContext } from "../../../../components/user";

interface IBookingDetailsProps {
  booking: GridCellType | null;
  bookable?: BookableType | null;
}

const BookingDetails: FC<IBookingDetailsProps> = ({ booking, bookable }) => {
  const user = useContext(UserContext)?.user;

  const isBooker = booking && user && booking.bookableId === user.id;

  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button className="btn">
              <FaEdit />
            </button>
          </span>
        )}
      </h2>
      {booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
