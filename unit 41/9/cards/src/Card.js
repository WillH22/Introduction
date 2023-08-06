import React from "react";
import "./App.css";

function Card({ image, card }) {
  return <img src={image} alt={card} />;
}

export default Card;
