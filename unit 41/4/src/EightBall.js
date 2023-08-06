import React, { useState } from "react";

function EightBall(props) {
  const [color, setColor] = useState("black");
  const [msg, setMsg] = useState("Think of a Question");
  function getIdx() {
    return Math.floor(Math.random() * props.answers.length);
  }
  function newInfo() {
    const idx = getIdx();
    setColor(props.answers[idx].color);
    setMsg(props.answers[idx].msg);
  }

  return (
    <div className={color} onClick={newInfo}>
      {msg}
    </div>
  );
}

export default EightBall;
