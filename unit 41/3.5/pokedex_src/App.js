import React from "react";
import "./App.css";
import Pokedex from "./Pokedex";
import pokes from "./Pokes";

function App() {
  return <Pokedex pokes={pokes} />;
}

export default App;
