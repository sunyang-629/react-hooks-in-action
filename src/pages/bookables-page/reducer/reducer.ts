export enum BookableActionEunm {
  SET_GROUP = "SET_GROUP",
  SET_BOOKABLE = "SET_BOOKABLE",
  TOGGLE_HAS_DETAILS = "TOGGLE_HAS_DETAILS",
  NEXT_BOOKABLE = "NEXT_BOOKABLE",
}

export interface IState {
  group: "Kit" | "Rooms";
  bookableIndex: number;
  hasDetails: boolean;
  bookables: {
    id: number;
    group: string;
    title: string;
    notes: string;
    sessions: number[];
    days: number[];
  }[];
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

type IAction =
  | ISetGroupAction
  | ISetBookableAction
  | IToggleHasDetailsAction
  | INextBookableAction;

export default function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "SET_GROUP":
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0,
      };

    case "SET_BOOKABLE":
      return {
        ...state,
        bookableIndex: action.payload,
      };

    case "TOGGLE_HAS_DETAILS":
      return {
        ...state,
        hasDetails: !state.hasDetails,
      };

    case "NEXT_BOOKABLE": {
      const count = state.bookables.filter(
        (b) => b.group === state.group
      ).length;

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count,
      };
    }

    default:
      return state;
  }
}
