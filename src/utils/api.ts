import { shortISO } from "./date-wrangler";

const getData = <T>(url: string) => {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error("There was a problem fetching data.");
    }
    return resp.json() as Promise<T>;
  });
};

const getBookings = <T>(bookableId: number, startDate: Date, endDate: Date) => {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3500/bookings";

  const query =
    `bookableId=${bookableId}` + `&date_gte=${start}&date_lte=${end}`;

  return getData<T>(`${urlRoot}?${query}`);
};

export { getData, getBookings };
