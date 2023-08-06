import React from "react";
import JokeList from "./JokeList";

class App extends React.Component {
  render() {
    const numJokesToGet = 10;
    return (
      <div className="App">
        <JokeList numJokesToGet={numJokesToGet} />
      </div>
    );
  }
}

// function App() {
//   const numJokesToGet = 10;
//   return (
//     <div className="App">
//       <JokeList numJokesToGet={numJokesToGet}/>
//     </div>
//   );
// }

export default App;
