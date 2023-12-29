import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { isDate } from "../../utils/date-wrangler";

const useBookingParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchDate = searchParams.get("date");
  const bookableId = searchParams.get("bookableId");

  const date =
    searchDate && isDate(searchDate) ? new Date(searchDate) : new Date();

  const idInt = bookableId ? parseInt(bookableId, 10) : null;

  const setBookingsDate = (newDate: string) => {
    const params: URLSearchParamsInit = {};
    if (!Number.isNaN(idInt) && !!bookableId) params.bookableId = bookableId;
    if (isDate(newDate)) {
      params.date = newDate; // Assuming you want to store the date as a string
    }
    if (params.date || params.bookableId !== undefined)
      setSearchParams(params, { replace: true });
  };

  return {
    date,
    bookableId: !!idInt && !Number.isNaN(idInt) ? idInt : undefined,
    setBookingsDate,
  };
};

export default useBookingParams;
