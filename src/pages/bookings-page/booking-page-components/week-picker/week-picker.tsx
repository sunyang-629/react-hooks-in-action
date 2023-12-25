import React, { FC, useState } from "react";
import { BookingActionEunm } from "../../reducer/reducer";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IAction } from "../../reducer/reducer";
import { shortISO } from "../../../../utils/date-wrangler";

interface IWeekPickerProps {
  dispatch: React.Dispatch<IAction>;
}

const WeekPicker: FC<IWeekPickerProps> = ({ dispatch }) => {
  //** passing the third argument here for obtaining the start date and end date of the week */
  // const [week, dispatch] = useReducer(reducer, date, getWeek);
  const [dateText, setDateText] = useState<string>(shortISO(new Date()));

  const goToDate = () => {
    dispatch({
      type: BookingActionEunm.SET_DATE,
      payload: dateText,
    });
  };

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

        <span>
          <input
            type="text"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
          />

          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button
          className="btn"
          onClick={() => dispatch({ type: BookingActionEunm.NEXT_WEEK })}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
    </div>
  );
};

export default WeekPicker;
