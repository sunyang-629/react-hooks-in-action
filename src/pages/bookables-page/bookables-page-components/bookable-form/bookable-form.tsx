import { FC } from "react";
import { IFormState } from "../../../../hooks/use-form-state/use-form-state";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt, FaTrash, FaWindowClose } from "react-icons/fa";
import {
  days as daysArray,
  sessions as sessionsArray,
} from "../../../../data/static.json";

interface IBookableFrom {
  id?: number;
  title?: string;
  group?: string;
  notes?: string;
  days?: number[];
  sessions?: number[];
}

interface IBookableFromProps {
  formState: IFormState<IBookableFrom | undefined>;
  handleSubmit: () => void;
  handleDelete?: () => void;
}

const BookableForm: FC<IBookableFromProps> = ({
  formState,
  handleSubmit,
  handleDelete,
}) => {
  const { state, handleChange, handleChecked } = formState;

  if (!state) return null;

  const { title = "", group = "", notes = "" } = state;
  const { days = [], sessions = [] } = state;

  return (
    <main className="bookables-form">
      <div className="item item-form">
        <div className="item-header">
          <h2>{handleDelete ? "Edit" : "New"} Bookable</h2>
        </div>

        <label htmlFor="title" className="field">
          Title
        </label>
        <input type="text" name="title" value={title} onChange={handleChange} />

        <label htmlFor="group" className="field">
          Group
        </label>
        <input type="text" name="group" value={group} onChange={handleChange} />

        <label htmlFor="notes" className="field">
          Notes
        </label>
        <textarea name="notes" value={notes} onChange={handleChange} rows={4} />

        <div className="bookable-availability">
          <ul>
            {daysArray.map((day, i) => (
              <li key={day}>
                <label>
                  <input
                    checked={days.indexOf(i) !== -1}
                    type="checkbox"
                    name="days"
                    value={i}
                    onChange={handleChecked}
                  />
                  {day}
                </label>
              </li>
            ))}
          </ul>

          <ul>
            {sessionsArray.map((session, i) => (
              <li key={session}>
                <label>
                  <input
                    checked={sessions.indexOf(i) !== -1}
                    type="checkbox"
                    name="sessions"
                    value={i}
                    onChange={handleChecked}
                  />
                  {session}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="controls">
        {handleDelete && (
          <button
            className="btn btn-delete controls-alt"
            onClick={handleDelete}
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        )}
        <Link
          className="btn"
          to={state.id ? `/bookables/${state.id}` : "/bookables"}
          replace
        >
          <FaWindowClose />
          <span>Cancel</span>
        </Link>
        <button className="btn" onClick={handleSubmit}>
          <FaCloudUploadAlt />
          <span>Save</span>
        </button>
      </p>
    </main>
  );
};

export default BookableForm;
