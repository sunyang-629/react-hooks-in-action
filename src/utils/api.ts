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

const createItem = <T>(url: string, item: T): Promise<T> => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error("There was a problem creating the item!");
    }
    return r.json() as Promise<T>;
  });
};

export { getData, getBookings, createItem };
