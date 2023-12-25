export type GridCellType = {
  session: string;
  date: string;
  bookableId: number;
  title: string;
};

export type GridType = {
  [session: string]: {
    [date: string]: GridCellType;
  };
};

export type BookingType = {
  id: number;
  session: string;
  date: string;
  title: string;
  bookableId: number;
  bookerId: number;
};

// export enum SessionEnum {
//   "Breakfase" = 0,
//   "Morning",
//   "Lunch",
//   "Afternoon",
//   "Evening",
// }
