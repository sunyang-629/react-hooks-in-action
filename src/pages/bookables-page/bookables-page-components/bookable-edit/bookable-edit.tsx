import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getData } from "../../../../utils/api";
import { BookableType } from "../../reducer/reducer";
import { useFormState } from "../../../../hooks";
import PageSpinner from "../../../../components/page-spinner";
import { BookableForm } from "..";

const BookableEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<BookableType>(
    ["bookable", id],
    () => getData<BookableType>(`http://localhost:3500/bookables/${id}`),
    {
      initialData: queryClient
        .getQueryData<BookableType[]>("bookables")
        ?.find((b) => b.id === parseInt(id || "-1", 10)),
    }
  );

  const formState = useFormState<BookableType | undefined>(data);

  const handleDelete = () => {};

  const handleSubmit = () => {};

  if (isLoading) return <PageSpinner />;
  //   const formState = useFormState()

  //   if(typeof formState === IFormState<undefined>)

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
};

export default BookableEdit;
