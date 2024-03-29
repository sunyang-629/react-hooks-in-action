import { shortISO } from "../../utils/date-wrangler";
import { BookingType, GridType } from "../../models";
import { transformBookings } from "../../utils/grid-builder";
import { UseFetchResultType } from "../use-fetch/use-fetch";
import { useQuery } from "react-query";
import { getData } from "../../utils/api";

const useBookings = (
  bookableId: number,
  startDate: Date,
  endDate: Date
): UseFetchResultType<GridType> => {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3500/bookings";

  const queryString =
    `bookableId=${bookableId}` + `&date_gte=${start}&date_lte=${end}`;

  const query = useQuery<BookingType[], Error>(
    ["bookings", bookableId, start, end],
    () => getData<BookingType[]>(`${urlRoot}?${queryString}`),
    { suspense: true }
  );

  return {
    ...query,
    data: query.data ? transformBookings(query.data) : {},
  };
};

export default useBookings;
