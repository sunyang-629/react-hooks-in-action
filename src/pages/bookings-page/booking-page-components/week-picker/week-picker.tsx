import React, { FC, useReducer, useState } from "react";
import reducer, { BookingActionEunm } from "../../reducer/reducer";
import { getWeek } from "../../../../utils/date-wrangler";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface IWeekPickerProps {
  date: Date;
}

const WeekPicker: FC<IWeekPickerProps> = ({ date }) => {
  //** passing the third argument here for obtaining the start date and end date of the week */
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const [dateText, setDateText] = useState<string>("2023-12-24");
  // const textboxRef = useRef<HTMLInputElement | null>(null);

  // const goToDate = () => {
  //   if (textboxRef.current)
  //     dispatch({
  //       type: BookingActionEunm.SET_DATE,
  //       payload: textboxRef.current.value,
  //     });
  // };

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
            // ref={textboxRef}
            // placeholder="e.g. 2020-09-02"
            // defaultValue={"2023-12-24"}
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
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;
