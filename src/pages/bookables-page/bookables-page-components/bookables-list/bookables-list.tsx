import { Fragment, ChangeEvent, useReducer } from "react";
import { bookables, sessions, days } from "../../../../data/static.json";
import { FaArrowRight } from "react-icons/fa";
import reducer, { BookableActionEunm, IState } from "../../reducer/reducer";

const initialState: IState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables,
};

const BookablesList = () => {
  const [{ group, bookableIndex, bookables, hasDetails }, dispatch] =
    useReducer(reducer, initialState);

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookable = bookablesInGroup[bookableIndex];

  const newBookable = () => {
    dispatch({ type: BookableActionEunm.NEXT_BOOKABLE });
  };

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: BookableActionEunm.SET_GROUP,
      payload: event.target.value as "Kit" | "Rooms",
    });
  };

  const changeBookable = (selectedIndex: number) => {
    dispatch({
      type: BookableActionEunm.SET_BOOKABLE,
      payload: selectedIndex,
    });
  };

  const toggleDetails = () => {
    dispatch({ type: BookableActionEunm.TOGGLE_HAS_DETAILS });
  };

  return (
    <Fragment>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li
              key={b.id}
              className={i === bookableIndex ? "selected" : undefined}
            >
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={newBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BookablesList;
