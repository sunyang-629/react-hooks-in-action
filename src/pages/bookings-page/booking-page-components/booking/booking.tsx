import React, { FC, Fragment } from "react";
import { GridCellType } from "../../../../models";
import { BookableType } from "../../../bookables-page/reducer/reducer";

interface IBookingProps {
  booking: GridCellType;
  bookable?: BookableType | null;
}

const Booking: FC<IBookingProps> = ({ booking, bookable }) => {
  const { title, date, session, notes } = booking;

  return (
    <div className="booking-details-fields">
      <label htmlFor="">Title</label>
      <p>{title}</p>

      <label htmlFor="">Bookable</label>
      <p>{bookable?.title}</p>

      <label htmlFor="">Booking Date</label>
      <p>{new Date(date).toDateString()}</p>

      <label htmlFor="">Session</label>
      <p>{session}</p>

      {notes && (
        <Fragment>
          <label htmlFor="">Notes</label>
          <p>{notes}</p>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
