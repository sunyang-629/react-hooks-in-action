import { useReducer, Fragment, FC } from "react";
//import { bookables } from "../../../../data/static.json";

import reducer, { IState } from "../../reducer/reducer";
import { BookableDetails, BookablesList } from "..";

const initialState: IState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  error: null,
};

const BookablesView: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const bookablesInGroup = state.bookables.filter(
    (b) => b.group === state.group
  );
  const bookable = bookablesInGroup[state.bookableIndex];

  return (
    <Fragment>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
};

export default BookablesView;
