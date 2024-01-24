import { useNavigate } from "react-router-dom";
import { useFormState } from "../../../../hooks";
import { BookableType } from "../../reducer/reducer";
import { useMutation, useQueryClient } from "react-query";
import { createItem } from "../../../../utils/api";
import PageSpinner from "../../../../components/page-spinner";
import { BookableForm } from "..";

const initialData = {
  group: "",
  title: "",
  notes: "",
  sessions: [],
  days: [],
};

const BookableNew = () => {
  const navigate = useNavigate();
  const formState = useFormState<BookableType>(initialData);
  const queryClient = useQueryClient();

  const {
    mutate: createBookable,
    status,
    error,
  } = useMutation<BookableType, Error, BookableType>(
    (item) => createItem<BookableType>("http://localhost:3500/bookables", item),
    {
      onSuccess: (bookable) => {
        queryClient.setQueryData<BookableType[]>("bookables", (old) => [
          ...(old || []),
          bookable,
        ]);
        navigate(`/bookables/${bookable.id}`);
      },
    }
  );

  const handleSubmit = () => createBookable(formState.state);

  if (status === "error") return <p>{error.message}</p>;

  if (status === "loading") return <PageSpinner />;

  return <BookableForm formState={formState} handleSubmit={handleSubmit} />;
};

export default BookableNew;
