import React from "react";
import "./App.css";
import EightBall from "./EightBall";
import answers from "./Answers";

function App() {
  return <EightBall answers={answers} />;
}

export default App;
