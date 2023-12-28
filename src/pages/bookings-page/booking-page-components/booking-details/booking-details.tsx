import { FC } from "react";
import { FaEdit } from "react-icons/fa";
import { GridCellType } from "../../../../models";
import { BookableType } from "../../../bookables-page/reducer/reducer";
import { Booking } from "..";
import { useUser } from "../../../../hooks";

interface IBookingDetailsProps {
  booking: GridCellType | null;
  bookable?: BookableType | null;
}

const BookingDetails: FC<IBookingDetailsProps> = ({ booking, bookable }) => {
  const [user] = useUser();
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
