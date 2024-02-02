import React, { FC } from "react";
import { getData } from "../../../../utils/api";
import { UserTodoType } from "../../../../models";
import { useQuery } from "react-query";

interface IUserTodosProps {
  id: number;
}

const UserTodos: FC<IUserTodosProps> = ({ id }) => {
  const { data: todos } = useQuery<UserTodoType[]>(
    ["todos", id],
    () => getData<UserTodoType[]>(`http://localhost:3500/todos?userId=${id}`),
    { suspense: true }
  );

  return (
    <div className="user-todos">
      <h3>User Todos</h3>
      {todos && todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.todo}</li>
          ))}
        </ul>
      ) : (
        <p>Nothing to do!</p>
      )}
    </div>
  );
};

export default UserTodos;
