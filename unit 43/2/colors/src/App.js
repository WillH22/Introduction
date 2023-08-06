import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Colors from "./Colors";
import Color from "./Color";
import Form from "./Form";
import "./App.css";

function App() {
  const [colorList, setColorList] = useState(["red", "green", "blue"]);
  const addColor = (color) => {
    setColorList((colorList) => [color, ...colorList]);
  };
  return (
    <div className="App">
      <Switch>
        <Route exact path="/colors">
          <Colors colorList={colorList} />
        </Route>
        <Route exact path="/colors/new">
          <Form addColor={addColor} />
        </Route>
        <Route exact path="/colors/:color">
          <Color colorList={colorList} />
        </Route>
        <Redirect to="/colors" />
      </Switch>
    </div>
  );
}

export default App;
