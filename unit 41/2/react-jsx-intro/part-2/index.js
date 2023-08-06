function App() {
  return (
    <div>
      <NamedComponent
        username="user1"
        name="dude"
        date="12/2/99"
        msg="that's what she said"
      />
      <NamedComponent
        username="user2"
        name="bubba"
        date="1/2/99"
        msg="that's what HE said"
      />
      <NamedComponent
        username="user3"
        name="Francis"
        date="6/8/34"
        msg="nobody said that!"
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
