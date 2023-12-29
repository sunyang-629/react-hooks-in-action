import React, { FC, useRef } from "react";
// import { BookingActionEunm } from "../../reducer/reducer";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
// import { IAction } from "../../reducer/reducer";
import { addDays, shortISO } from "../../../../utils/date-wrangler";
import { useBookingParams } from "../../../../hooks";

interface IWeekPickerProps {
  // dispatch: React.Dispatch<IAction>;
}

const WeekPicker: FC<IWeekPickerProps> = () => {
  const textboxRef = useRef<HTMLInputElement | null>(null);

  const { date, setBookingsDate: goToDate } = useBookingParams();

  const dates = {
    prev: shortISO(addDays(date, -7)),
    next: shortISO(addDays(date, 7)),
    today: shortISO(new Date()),
  };

  // const [dateText, setDateText] = useState<string>(shortISO(new Date()));

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => goToDate(dates.prev)}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => goToDate(dates.today)}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            ref={textboxRef}
            id="wpDate"
            defaultValue={shortISO(new Date())}
            // value={dateText}
            // onChange={(e) => setDateText(e.target.value)}
          />

          <button
            className="go btn"
            onClick={() =>
              goToDate(textboxRef.current?.value || shortISO(new Date()))
            }
          >
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => goToDate(dates.next)}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
    </div>
  );
};

export default WeekPicker;
