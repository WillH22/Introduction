import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Add from "./Add";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Snack from "./FoodItem";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getSnacks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  useEffect(() => {
    async function getDrinks() {
      let drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
      setIsLoading(false);
    }
    getDrinks();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} drinks={drinks} />
            </Route>
            <Route exact path="/snacks">
              <Menu snacks={snacks} title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Snack items={snacks} cantFind="/snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu drinks={drinks} title="Snacks" />
            </Route>
            <Route path="/drinks/:id">
              <Snack items={drinks} cantFind="/drinks" />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;


      //NOTES
//1. Loading State: You're setting isLoading to false in both the snacks and drinks useEffect hooks, which means the loading state will be set to false as soon as the first set of data is fetched. This might cause your loading message to disappear even if the other data is still being fetched. You can use separate loading states for snacks and drinks to ensure that the loading message remains until both sets of data are fetched
//Then, in your if (isLoading) check, you can consider checking both snacksLoading and drinksLoading.
//2.Code DRYness: You have a lot of repeated code for fetching snacks and drinks. Consider creating a single function for fetching data that you can reuse
//3.Route Title for Drinks: In your /drinks route, you have the title set as "Snacks." It seems like this might be a copy-paste error. You might want to change it to "Drinks"
//4.Route Order: In the order of your routes, the routes for individual snack and drink items come before the /snacks and /drinks routes. This could potentially cause conflicts when navigating. Consider reordering your routes so that the more specific routes come after the general ones.

