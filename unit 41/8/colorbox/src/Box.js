import React from "react";
import "./App.css";

function Box({ color, width, height, deleteBox }) {
  width = `${width}px`;
  height = `${height}px`;
  return (
    <div>
      <div
        className="Box"
        style={{ backgroundColor: color, width: width, height: height }}
      ></div>
      <button onClick={deleteBox}>X</button>
      <br />
      <br />
    </div>
  );
}

export default Box;
