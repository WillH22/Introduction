// API URL for the card deck
const cardUrl = "https://deckofcardsapi.com/api/deck";

// Variable to store the deck ID
let deck;

// Function to draw one card and display its value and suit
async function drawOne() {
  const card = await axios.get(`${cardUrl}/new/draw/?count=1`);
  console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
}

// Function to draw two cards and display their values and suits
async function drawTwo() {
  const card = await axios.get(`${cardUrl}/new/draw/?count=1`);
  const card2 = await axios.get(
    `${cardUrl}/${card.data.deck_id}/draw/?count=1`
  );
  console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
  console.log(`${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`);
}

// Function to shuffle the deck and create a "Draw a Card" button
async function shuffle() {
  deck = await axios.get(`${cardUrl}/new/shuffle/?deck_count=1`);
  const button = document.createElement("button");
  button.innerText = "Draw a Card";
  button.id = "button";
  document.body.append(button);
}

// Function to draw a card from the shuffled deck and display its image
async function drawCard() {
  const card = await axios.get(`${cardUrl}/${deck.data.deck_id}/draw/?count=1`);
  const pic = card.data.cards[0].images.png;
  displayCard(pic);
}

// Function to display the card image on the page
function displayCard(pic) {
  const div = document.querySelector("div");
  const img = document.createElement("img");
  img.src = pic;
  div.append(img);
}

// Event listener for when the window loads, which shuffles the deck
window.addEventListener("load", shuffle);

// Event listener for clicks on the body, triggering the drawCard function
document.body.addEventListener("click", (e) => {
  if (e.target.id === "button") {
    drawCard();
  }
});
