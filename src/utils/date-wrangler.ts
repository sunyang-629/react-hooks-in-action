const addDays = (date: Date, daysToAdd: number): Date => {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
};

const getWeek = (
  forDate: Date,
  daysOffset: number = 0
): {
  date: Date;
  start: Date;
  end: Date;
} => {
  const date = addDays(forDate, daysOffset);
  const day = date.getDay();

  return {
    date,
    start: addDays(date, -day),
    end: addDays(date, 6 - day),
  };
};

const shortISO = (date: Date) => date.toISOString().split("T")[0];

export { addDays, getWeek, shortISO };
