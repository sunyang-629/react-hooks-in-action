import { ChangeEvent, useRef, FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BookableType } from "../../reducer/reducer";
// import Spinner from "../../../../components/spinner";
// import useFetch from "../../../../hooks/use-fetch/use-fetch";
import { Link, useNavigate } from "react-router-dom";

interface IBookablesListProps {
  bookable?: BookableType | null;
  bookables: BookableType[];
  getUrl: (id: string) => string;
  // setBookable: React.Dispatch<
  //   React.SetStateAction<BookableType | null | undefined>
  // >;
}

const BookablesList: FC<IBookablesListProps> = ({
  bookable,
  bookables,
  getUrl,
}) => {
  // const {
  //   data: bookables = [],
  //   status,
  //   error,
  // } = useFetch<BookableType[]>("http://localhost:3500/bookables");

  const group = bookable?.group as "Kit" | "Rooms";
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setBookable(bookables[0]);
  // }, [bookables, setBookable]);

  const newBookable = () => {
    if (!bookable) return;
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    //setBookable(nextBookable);
    navigate(getUrl(nextBookable.id.toString()));
  };

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === (event.target.value as "Kit" | "Rooms")
    );
    //setBookable(bookablesInSelectedGroup[0]);
    navigate(getUrl(bookablesInSelectedGroup[0].id.toString()));
  };

  // const changeBookable = (selectedBookable: BookableType) => {
  //   //setBookable(selectedBookable);
  //   if (nextButtonRef.current) {
  //     nextButtonRef.current.focus();
  //   }
  // };

  // if (status === "error") return <p>{error?.message}</p>;

  // if (status === "loading")
  //   return (
  //     <p>
  //       <Spinner /> Loading bookables ...{" "}
  //     </p>
  //   );

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
            <Link className="btn" to={getUrl(b.id.toString())} replace>
              {b.title}
            </Link>
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
