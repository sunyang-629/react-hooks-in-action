import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

export interface IFormState<T> {
  state: T;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleChecked: ChangeEventHandler<HTMLInputElement>;
}

const useFormState = <T>(data: T): IFormState<T> => {
  const [state, setState] = useState<T>(data);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const values = new Set<number>((state as never)[name]);
    const intValue = parseInt(value, 10);

    values.delete(intValue);
    if (checked) values.add(intValue);

    setState((prev) => ({
      ...prev,
      [name]: [...values],
    }));
  };

  return {
    state,
    handleChange,
    handleChecked,
  };
};

export default useFormState;
