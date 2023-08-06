import React from "react";
import "./App.css";

function Todo({ todo, deleteTodo }) {
  return (
    <li>
      <p>{todo}</p>
      <button onClick={deleteTodo}>X</button>
    </li>
  );
}

export default Todo;
