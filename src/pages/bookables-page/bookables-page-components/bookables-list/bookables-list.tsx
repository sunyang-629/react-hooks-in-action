import { ChangeEvent, useEffect, useRef, FC, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BookableType, ErrorType } from "../../reducer/reducer";
import { getData } from "../../../../utils/api";
import Spinner from "../../../../components/spinner";

interface IBookablesListProps {
  bookable?: BookableType | null;
  setBookable: React.Dispatch<
    React.SetStateAction<BookableType | null | undefined>
  >;
}

const BookablesList: FC<IBookablesListProps> = ({ bookable, setBookable }) => {
  const [bookables, setBookables] = useState<BookableType[]>([]);
  const [error, setError] = useState<null | ErrorType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const group = bookable?.group as "Kit" | "Rooms";
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookablesResult = await getData<BookableType[]>(
          "http://localhost:3500/bookables"
        );
        setBookable(bookablesResult[0]);
        setBookables(bookablesResult);
      } catch (error) {
        setError(error as ErrorType);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setBookable]);

  const newBookable = () => {
    if (!bookable) return;
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  };

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === (event.target.value as "Kit" | "Rooms")
    );
    setBookable(bookablesInSelectedGroup[0]);
  };

  const changeBookable = (selectedBookable: BookableType) => {
    setBookable(selectedBookable);
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
        {bookablesInGroup.map((b) => (
          <li
            key={b.id}
            className={b.id === bookable?.id ? "selected" : undefined}
          >
            <button className="btn" onClick={() => changeBookable(b)}>
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
