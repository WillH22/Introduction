// API URL for number facts
const url = "http://numbersapi.com";

// Fetch a fact for the number 21 in JSON format and log the result
axios
  .get(`${url}/21?json`)
  .then((res) => console.log(res.data.text))
  .catch((err) => console.log(err));

// Fetch multiple facts for numbers 1 to 4 in JSON format and log each fact
axios
  .get(`${url}/1..4?json`)
  .then((res) => {
    for (let fact in res.data) {
      console.log(res.data[fact]);
    }
  })
  .catch((err) => console.log(err));

// Array to store promises for fetching facts for number 101 in JSON format
let numFacts = [];

// Loop to create Axios requests for fetching facts for number 101 and store them in the 'numFacts' array
for (let i = 1; i < 5; i++) {
  numFacts.push(axios.get(`${url}/101?json`));
}

// Execute all the promises in 'numFacts' simultaneously and log each fact
Promise.all(numFacts)
  .then((numArr) => numArr.forEach((num) => console.log(num.data.text)))
  .catch((err) => console.log(err));
