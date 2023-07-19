const url = "http://numbersapi.com";

// Function to fetch and display a fact for the number 63
async function one() {
  const fact = await axios.get(`${url}/63?json`);
  console.log(fact.data.text);
}

// Function to fetch and display multiple facts for numbers 1 to 4
async function two() {
  const facts = await axios.get(`${url}/1..4?json`);
  // Loop through the facts and log each one
  for (let fact in facts.data) {
    console.log(facts.data[fact]);
  }
}

// Function to fetch and display multiple facts for the number 63 four times
async function three() {
  const facts = [];
  for (let i = 1; i < 5; i++) {
    // Fetch a fact for the number 63 and add it to the facts array
    facts.push(await axios.get(`${url}/63?json`));
  }
  // Loop through the facts and log each one's text
  for (fact of facts) {
    console.log(fact.data.text);
  }
}
