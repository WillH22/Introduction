import React, { useState } from "react";
import NewBoxForm from "./NewBoxForm";
import Box from "./Box";
import "./App.css";

function BoxList() {
  const [boxes, setBoxes] = useState([]);
  const addBox = (id, color, width, height) => {
    setBoxes((boxes) => [...boxes, { id, color, width, height }]);
  };
  const deleteBox = (e) => e.target.parentElement.remove();
  return (
    <div>
      <NewBoxForm addBox={addBox} />
      {boxes.map((b) => {
        return (
          <Box
            key={b.id}
            color={b.color}
            width={b.width}
            height={b.height}
            deleteBox={deleteBox}
          />
        );
      })}
    </div>
  );
}

export default BoxList;
