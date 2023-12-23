const getData = <T>(url: string) => {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error("There was a problem fetching data.");
    }
    return resp.json() as Promise<T>;
  });
};

export { getData };
