import { Bookings } from "./booking-page-components";
import { BookableType } from "../bookables-page/reducer/reducer";
import { BookablesList } from "../bookables-page/bookables-page-components";
import { useBookingParams } from "../../hooks";
import { shortISO } from "../../utils/date-wrangler";
import PageSpinner from "../../components/page-spinner";
import { getData } from "../../utils/api";
import { useQuery } from "react-query";

const BookingsPage = () => {
  const {
    data: bookables = [],
    status,
    error,
  } = useQuery<BookableType[], Error>("bookables", () =>
    getData<BookableType[]>("http://localhost:3500/bookables")
  );

  const { date, bookableId } = useBookingParams();

  const getUrl = (id: string) => {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  };

  const bookable = bookableId
    ? bookables?.find((b) => b.id === bookableId)
    : bookables[0];

  if (status === "error") return <p>{error?.message}</p>;

  if (status === "loading") return <PageSpinner />;

  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings bookable={bookable} />
    </main>
  );
};

export default BookingsPage;
