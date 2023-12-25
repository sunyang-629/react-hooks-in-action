import { Fragment, FC, useState } from "react";

import { BookableType } from "../../reducer/reducer";
import { BookableDetails, BookablesList } from "..";

// const initialState: IState = {
//   group: "Rooms",
//   bookableIndex: 0,
//   bookables: [],
//   isLoading: true,
//   error: null,
// };

const BookablesView: FC = () => {
  const [bookable, setBookable] = useState<BookableType | null>();

  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
};

export default BookablesView;
