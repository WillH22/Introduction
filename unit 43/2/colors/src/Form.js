import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Form({ addColor }) {
  const [color, setColor] = useState("#000000");
  const handleChange = (e) => {
    let value = e.target.value;
    value = value.slice(1);
    setColor((c) => value);
  };

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    addColor(color);
    history.push("/colors");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="color">Color: </label>
      <input type="color" id="color" name="color" onChange={handleChange} />
      <button type="submit">Add Color</button>
    </form>
  );
}

export default Form;
