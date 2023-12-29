import { Fragment, FC } from "react";

import { BookableType } from "../../reducer/reducer";
import { BookableDetails, BookablesList } from "..";
import { useFetch } from "../../../../hooks";
import { Link, useParams } from "react-router-dom";
// import Spinner from "../../../../components/spinner";
import { FaPlus } from "react-icons/fa";
import PageSpinner from "../../../../components/page-spinner";

// const initialState: IState = {
//   group: "Rooms",
//   bookableIndex: 0,
//   bookables: [],
//   isLoading: true,
//   error: null,
// };

const BookablesView: FC = () => {
  const {
    data: bookables = [],
    status,
    error,
  } = useFetch<BookableType[]>("http://localhost:3500/bookables");

  const { id } = useParams();

  // console.log({ id, bookables });

  // if (id) console.log(bookables.find((b) => b.id === parseInt(id, 10)));

  const bookable = id
    ? bookables?.find((b) => b.id === parseInt(id, 10))
    : bookables[0];

  // console.log({ bookable });

  //const [bookable, setBookable] = useState<BookableType | null>();

  if (status === "error") return <p>{error?.message}</p>;

  if (status === "loading") return <PageSpinner />;

  return (
    <Fragment>
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={(id) => `/bookables/${id}`}
          // setBookable={setBookable}
        />
        <p className="controls">
          <Link to="/bookables/new" replace className="btn">
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
};

export default BookablesView;
