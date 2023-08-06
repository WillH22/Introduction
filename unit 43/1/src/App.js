import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import VendingMachine from "./VendingMachine";
import Navlist from "./Navlist";
import Chips from "./Chips";
import Popcorn from "./Popcorn";
import Chocolate from "./Chocolate";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navlist />
        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/chips">
          <Chips />
        </Route>
        <Route exact path="/popcorn">
          <Popcorn />
        </Route>
        <Route exact path="/chocolate">
          <Chocolate />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
