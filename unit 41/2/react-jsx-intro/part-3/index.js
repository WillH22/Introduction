function App() {
  return (
    <div>
      <Person name="Jim" age={31} hobbies={["tv", "games"]} />
      <Person
        name="Jake"
        age={3}
        hobbies={["tv", "chasing chickens", "games"]}
      />
      <Person name="Jasonovich" age={1345} hobbies={["NONE"]} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
