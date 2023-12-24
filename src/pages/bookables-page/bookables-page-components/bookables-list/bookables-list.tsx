import { ChangeEvent, useEffect, useRef, FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  BookableActionEunm,
  BookableType,
  ErrorType,
  IAction,
  IState,
} from "../../reducer/reducer";
import { getData } from "../../../../utils/api";
import Spinner from "../../../../components/spinner";

interface IBookablesListProps {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

const BookablesList: FC<IBookablesListProps> = ({ state, dispatch }) => {
  const { group, bookableIndex, bookables } = state;
  const { isLoading, error } = state;
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
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
  }, [dispatch]);

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

  if (error) return <p>{error.message}</p>;

  if (isLoading)
    return (
      <p>
        <Spinner /> Loading bookables ...{" "}
      </p>
    );

  return (
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
  );
};

export default BookablesList;
