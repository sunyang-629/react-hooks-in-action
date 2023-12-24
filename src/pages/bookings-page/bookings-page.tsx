import { WeekPicker } from "./booking-page-components";

const BookingsPage = () => {
  return (
    <main className="bookings-page">
      {/* <p>Bookings!</p> */}
      <WeekPicker date={new Date()} />
    </main>
  );
};

export default BookingsPage;
