export enum BookableActionEunm {
  SET_GROUP = "SET_GROUP",
  SET_BOOKABLE = "SET_BOOKABLE",
  TOGGLE_HAS_DETAILS = "TOGGLE_HAS_DETAILS",
  NEXT_BOOKABLE = "NEXT_BOOKABLE",
  FETCH_BOOKABLES_REQUEST = "FETCH_BOOKABLES_REQUEST",
  FETCH_BOOKABLES_SUCCESS = "FETCH_BOOKABLES_SUCCESS",
  FETCH_BOOKABLES_ERROR = "FETCH_BOOKABLES_ERROR",
}

export type BookableType = {
  id: number;
  group: string;
  title: string;
  notes: string;
  sessions: number[];
  days: number[];
};

export type ErrorType = {
  message: string;
};

export interface IState {
  group: "Kit" | "Rooms";
  bookableIndex: number;
  hasDetails: boolean;
  bookables: BookableType[];
  isLoading: boolean;
  error: null | ErrorType;
}

interface ISetGroupAction {
  type: BookableActionEunm.SET_GROUP;
  payload: "Kit" | "Rooms";
}

interface ISetBookableAction {
  type: BookableActionEunm.SET_BOOKABLE;
  payload: number;
}

interface IToggleHasDetailsAction {
  type: BookableActionEunm.TOGGLE_HAS_DETAILS;
}

interface INextBookableAction {
  type: BookableActionEunm.NEXT_BOOKABLE;
}

interface IFetchBookableRequestAction {
  type: BookableActionEunm.FETCH_BOOKABLES_REQUEST;
}

interface IFetchBookableSuccessAction {
  type: BookableActionEunm.FETCH_BOOKABLES_SUCCESS;
  payload: BookableType[];
}

interface IFetchBookableErrorAction {
  type: BookableActionEunm.FETCH_BOOKABLES_ERROR;
  payload: null | ErrorType;
}

type IAction =
  | ISetGroupAction
  | ISetBookableAction
  | IToggleHasDetailsAction
  | INextBookableAction
  | IFetchBookableRequestAction
  | IFetchBookableSuccessAction
  | IFetchBookableErrorAction;

export default function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case BookableActionEunm.SET_GROUP:
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0,
      };

    case BookableActionEunm.SET_BOOKABLE:
      return {
        ...state,
        bookableIndex: action.payload,
      };

    case BookableActionEunm.TOGGLE_HAS_DETAILS:
      return {
        ...state,
        hasDetails: !state.hasDetails,
      };

    case BookableActionEunm.NEXT_BOOKABLE: {
      const count = state.bookables.filter(
        (b) => b.group === state.group
      ).length;

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count,
      };
    }

    case BookableActionEunm.FETCH_BOOKABLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        bookables: [],
      };

    case BookableActionEunm.FETCH_BOOKABLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookables: action.payload,
      };

    case BookableActionEunm.FETCH_BOOKABLES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
