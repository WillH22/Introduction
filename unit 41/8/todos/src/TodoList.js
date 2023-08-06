import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./App.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const addTodo = (id, todo) => {
    setTodos((todos) => [...todos, { id, todo }]);
  };
  const deleteTodo = (e) => e.target.parentElement.remove();
  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      <ul>
        {todos.map((t) => {
          return <Todo key={t.id} todo={t.todo} deleteTodo={deleteTodo} />;
        })}
      </ul>
    </div>
  );
}

export default TodoList;
