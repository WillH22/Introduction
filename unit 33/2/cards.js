// API URL for the card deck
const cardUrl = "https://deckofcardsapi.com/api/deck";

// Fetch a single card from the deck and log its value and suit
axios
  .get(`${cardUrl}/new/draw/?count=1`)
  .then((res) =>
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
  )
  .catch((err) => console.log(err));

// Array to store responses for drawing cards
let cards = [];
// Fetch a single card from the deck and store the response in the 'cards' array
axios
  .get(`${cardUrl}/new/draw/?count=1`)
  .then((res) => {
    cards.push(res);
    // Fetch another card using the deck_id from the first response and store that response in the 'cards' array as well
    return axios.get(`${cardUrl}/${res.data.deck_id}/draw/?count=1`);
  })
  .then((res2) => {
    cards.push(res2);
    // Log the values and suits of both cards from the 'cards' array
    console.log(
      `${cards[0].data.cards[0].value} of ${cards[0].data.cards[0].suit}`
    );
    console.log(
      `${cards[1].data.cards[0].value} of ${cards[1].data.cards[0].suit}`
    );
  })
  .catch((err) => console.log(err));

// Variable to store the deck_id
let deck;
// Execute this code when the window loads
window.addEventListener("load", function () {
  // Shuffle a new deck and get the deck_id
  axios.get(`${cardUrl}/new/shuffle/?deck_count=1`).then((res) => {
    deck = res.data.deck_id;
    // Create a "Draw a Card" button and append it to the body
    let button = document.createElement("button");
    button.innerText = "Draw a Card";
    button.id = "button";
    document.body.append(button);
  });
});

// Event listener for clicks on the body
document.body.addEventListener("click", function (e) {
  // Check if the clicked element is the "Draw a Card" button
  if (e.target.id === "button") {
    // Draw a single card from the deck and display it using the 'displayCard' function
    axios.get(`${cardUrl}/${deck}/draw/?count=1`).then((res) => {
      let card = res.data.cards[0].images.png;
      displayCard(card);
    });
  }
});

// Function to display a card image on the page
function displayCard(card) {
  const div = document.querySelector("div");
  const img = document.createElement("img");
  img.src = card;
  div.append(img);
}
