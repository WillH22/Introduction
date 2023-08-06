import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function NewTodoForm({ addTodo }) {
  const initialState = {
    id: uuid(),
    todo: "",
  };

  const [data, setData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({
      ...d,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuid();
    const { todo } = data;
    addTodo(id, todo);
    setData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo">Todo: </label>
      <input
        type="text"
        id="todo"
        name="todo"
        placeholder="Todo"
        value={data.todo}
        onChange={handleChange}
      ></input>
      <br />
      <button type="submit">Create New Todo</button>
    </form>
  );
}

export default NewTodoForm;
