export type UserType = {
  id: number;
  name: string;
  img: string;
  title: string;
  notes: string;
};

export type UserTodoType = {
  id: number;
  userId: number;
  todo: string;
};
