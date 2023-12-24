import { Fragment, ChangeEvent, useReducer, useEffect, useRef } from "react";
import { bookables, sessions, days } from "../../../../data/static.json";
import { FaArrowRight } from "react-icons/fa";
import reducer, {
  BookableActionEunm,
  BookableType,
  ErrorType,
  IState,
} from "../../reducer/reducer";
import { getData } from "../../../../utils/api";
import Spinner from "../../../../components/spinner";

const initialState: IState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables,
  isLoading: true,
  error: null,
};

const BookablesList = () => {
  const [
    { group, bookableIndex, bookables, hasDetails, error, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookable = bookablesInGroup[bookableIndex];

  // const timerRef = useRef<number | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: BookableActionEunm.FETCH_BOOKABLES_REQUEST });

      try {
        const result = await getData<BookableType[]>(
          "http://localhost:3500/bookables"
        );
        dispatch({
          type: BookableActionEunm.FETCH_BOOKABLES_SUCCESS,
          payload: result,
        });
      } catch (error) {
        dispatch({
          type: BookableActionEunm.FETCH_BOOKABLES_ERROR,
          payload: error as ErrorType,
        });
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   timerRef.current = setInterval(() => {
  //     dispatch({ type: BookableActionEunm.NEXT_BOOKABLE });
  //   }, 3000);

  //   return stopPresentation;
  // }, []);

  // const stopPresentation = () => {
  //   if (timerRef.current) clearInterval(timerRef.current);
  // };

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
    if (nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  };

  const toggleDetails = () => {
    dispatch({ type: BookableActionEunm.TOGGLE_HAS_DETAILS });
  };

  if (error) return <p>{error.message}</p>;

  if (isLoading)
    return (
      <p>
        <Spinner /> Loading bookables ...{" "}
      </p>
    );

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
          <button
            className="btn"
            onClick={newBookable}
            autoFocus
            ref={nextButtonRef}
          >
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
                {/* <button className="btn" onClick={stopPresentation}>
                  Stop
                </button> */}
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
