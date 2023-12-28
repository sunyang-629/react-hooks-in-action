import { useEffect, useState } from "react";
import { getData } from "../../utils/api";

type Status = "idle" | "loading" | "success" | "error";
export type UseFetchResultType<T> = {
  data?: T;
  status: Status;
  error?: Error | null;
};

const useFetch = <T>(url: string): UseFetchResultType<T> => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    let doUpdate = true;

    setStatus("loading");
    setData(undefined);
    setError(null);

    getData<T>(url)
      .then((responseData) => {
        if (doUpdate) {
          setData(responseData);
          setStatus("success");
        }
      })
      .catch((fetchError) => {
        if (doUpdate) {
          setError(fetchError);
          setStatus("error");
        }
      });

    return () => {
      doUpdate = false;
    };
  }, [url]);

  return { data, status, error };
};

export default useFetch;
