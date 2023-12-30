import { FC } from "react";

import { BookableType } from "../../reducer/reducer";
import { BookableDetails, BookablesList } from "..";
// import { useFetch } from "../../../../hooks";
import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PageSpinner from "../../../../components/page-spinner";
import { useQuery } from "react-query";
import { getData } from "../../../../utils/api";

const BookablesView: FC = () => {
  const {
    data: bookables = [],
    status,
    error,
  } = useQuery<BookableType[], Error>("bookables", () =>
    getData<BookableType[]>("http://localhost:3500/bookables")
  );

  const { id } = useParams();

  const bookable = id
    ? bookables?.find((b) => b.id === parseInt(id, 10))
    : bookables[0];

  if (status === "error") return <p>{error.message}</p>;

  if (status === "loading") return <PageSpinner />;

  return (
    <div
      style={{
        gridTemplateColumns: "1fr 3fr",
        gridColumnGap: "40px",
        display: "grid",
      }}
    >
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={(id) => `/bookables/${id}`}
        />
        <p className="controls">
          <Link to="/bookables/new" replace className="btn">
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </div>
  );
};

export default BookablesView;
