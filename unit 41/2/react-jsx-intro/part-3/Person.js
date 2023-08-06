function Person(props) {
  let adult;
  if (props.age >= 18) {
    adult = true;
  }
  const name = props.name.slice(0, 6);
  return (
    <div>
      <p>Learn some information about this person</p>
      <p>Name: {name}</p>
      <h3>{adult ? "Please go vote!" : "You must be 18"}</h3>
      <ul>
        {props.hobbies.map((h) => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  );
}
