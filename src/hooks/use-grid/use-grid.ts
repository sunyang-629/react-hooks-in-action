import { useMemo } from "react";
import { BookableType } from "../../pages/bookables-page/reducer/reducer";
import { getGrid } from "../../utils/grid-builder";

const useGrid = (
  bookable: BookableType | null | undefined,
  startDate: Date
) => {
  return useMemo(
    () =>
      bookable
        ? getGrid(bookable, startDate)
        : { grid: {}, sessions: [], dates: [] },
    [bookable, startDate]
  );
};

export default useGrid;
