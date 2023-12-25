import { useState } from "react";
import { Bookings } from "./booking-page-components";
import { BookableType } from "../bookables-page/reducer/reducer";
import { BookablesList } from "../bookables-page/bookables-page-components";

const BookingsPage = () => {
  const [bookable, setBookable] = useState<BookableType | null | undefined>(
    null
  );

  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
};

export default BookingsPage;
