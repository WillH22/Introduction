function App() {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name="BigGuy" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
