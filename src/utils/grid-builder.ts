import { sessions as sessionNames } from "../data/static.json";
import { BookingType, GridType } from "../models";
import { BookableType } from "../pages/bookables-page/reducer/reducer";
import { addDays, shortISO } from "./date-wrangler";

const getGrid = (bookable: BookableType, startDate: Date) => {
  //a list of available dates in ISO format for bookable in a week
  const dates = bookable.days
    .sort()
    .map((d) => shortISO(addDays(startDate, d)));

  //a list of sessions for that bookable
  const sessions = bookable.sessions.map((i) => sessionNames[i]);

  const grid: GridType = {};

  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach(
      (date) =>
        (grid[session][date] = {
          session,
          date,
          bookableId: bookable.id,
          title: "",
        })
    );
  });

  return {
    grid,
    dates,
    sessions,
  };
};

const transformBookings = (bookingsArray: BookingType[]) => {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date, bookableId, title } = booking;

    if (!bookings[session]) {
      bookings.session = {};
    }

    bookings[session][date] = {
      session,
      date,
      bookableId,
      title,
    };
    return bookings;
  }, {} as GridType);
};

export { getGrid, transformBookings };
