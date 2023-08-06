import { useState } from "react";
import uuid from "uuid";
import axios from "axios";

function useFlip() {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const toggle = () => {
    setIsFacingUp((isFacingUp) => !isFacingUp);
  };
  return [isFacingUp, toggle];
}

function useAxios(url) {
  const [cards, setCards] = useState([]);
  const addCard = async (name) => {
    const response = await axios.get(
      typeof name !== "object" ? `${url}${name}` : url
    );
    setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
  };
  return [cards, addCard];
}

export { useFlip, useAxios };
