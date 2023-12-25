import { IWeek } from "../../../models";
import { getWeek } from "../../../utils/date-wrangler";

export enum BookingActionEunm {
  NEXT_WEEK = "NEXT_WEEK",
  PREV_WEEK = "PREV_WEEK",
  TODAY = "TODAY",
  SET_DATE = "SET_DATE",
}

export interface IState extends IWeek {}

interface INextWeekAction {
  type: BookingActionEunm.NEXT_WEEK;
}

interface IPrevWeekAction {
  type: BookingActionEunm.PREV_WEEK;
}

interface ITodayAction {
  type: BookingActionEunm.TODAY;
}

interface ISetDateAction {
  type: BookingActionEunm.SET_DATE;
  payload: string;
}

export type IAction =
  | INextWeekAction
  | IPrevWeekAction
  | ITodayAction
  | ISetDateAction;

export default function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "NEXT_WEEK":
      return getWeek(state.date, 7);
    case "PREV_WEEK":
      return getWeek(state.date, -7);
    case "TODAY":
      return getWeek(new Date());
    case "SET_DATE":
      return getWeek(new Date(action.payload));
    default:
      return state;
    //throw new Error(`Unknown action type: ${action.type}`);
  }
}
