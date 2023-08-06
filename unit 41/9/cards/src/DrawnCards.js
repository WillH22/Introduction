import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./App.css";

function DrawnCards() {
  const [deck, setDeck] = useState("new");

  useEffect(() => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => setDeck(res.data.deck_id));
  }, []);

  const [cards, setCards] = useState([]);
  const btn = useRef();
  const time = useRef();

  function timer() {
    if (btn.current.innerText === "Draw Cards") {
      btn.current.innerText = "Stop Drawing";
      time.current = setInterval(drawCards, 1000);
    } else {
      clearInterval(time.current);
      btn.current.innerText = "Draw Cards";
    }
  }

  async function drawCards() {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );
    if (!res.data.cards[0]) {
      clearInterval(time.current);
      alert("Error: no cards remaining!");
    } else {
      const { code, image, value, suit } = res.data.cards[0];
      let card = `${value} of ${suit}`;
      setCards((c) => [...c, { code, image, card }]);
    }
  }

  return (
    <div>
      <button onClick={timer} ref={btn}>
        Draw Cards
      </button>
      {cards.map((c) => (
        <Card key={c.code} image={c.image} card={c.card} />
      ))}
    </div>
  );
}

export default DrawnCards;
