import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function NewBoxForm({ addBox }) {
  const initialState = {
    id: uuid(),
    color: "",
    width: 1,
    height: 1,
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
    const { color, width, height } = data;
    addBox(id, color, width, height);
    setData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="color">Color: </label>
      <input
        type="text"
        id="color"
        name="color"
        placeholder="Color"
        value={data.color}
        onChange={handleChange}
      ></input>
      <br />
      <label htmlFor="width">Width: </label>
      <input
        type="number"
        id="width"
        name="width"
        min="1"
        value={data.width}
        onChange={handleChange}
      ></input>
      <span>px</span>
      <br />
      <label htmlFor="height">Height: </label>
      <input
        type="number"
        id="height"
        name="height"
        min="1"
        value={data.height}
        onChange={handleChange}
      ></input>
      <span>px</span>
      <br />
      <button type="submit">Create New Box</button>
    </form>
  );
}

export default NewBoxForm;
