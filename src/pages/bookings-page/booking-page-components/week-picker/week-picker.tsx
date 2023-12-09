import React, { FC, useReducer } from "react";
import reducer, { BookingActionEunm } from "../../reducer/reducer";
import { getWeek } from "../../../../utils/date-wrangler";
import { FaCalendarDay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface IWeekPickerProps {
  date: Date;
}

const WeekPicker: FC<IWeekPickerProps> = ({ date }) => {
  //** passing the third argument here for obtaining the start date and end date of the week */
  const [week, dispatch] = useReducer(reducer, date, getWeek);

  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch({ type: BookingActionEunm.PREV_WEEK })}
        >
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button
          className="btn"
          onClick={() => dispatch({ type: BookingActionEunm.TODAY })}
        >
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <button
          className="btn"
          onClick={() => dispatch({ type: BookingActionEunm.NEXT_WEEK })}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;
