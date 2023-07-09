// DOM elements
const $checkForm = $("#checkForm");
const $checkWordField = $("#checkWordField");
const $totalScore = $("#total_score span");
const $totalGames = $("#total_games span");
const $timer = $("#timer span");
const $hintText = $("#hint p");
const $hintBtn = $("#hint button");
const $score = $("#score span");
const $result = $("#result span");
const $btn = $("#btn");

// Function to handle the form submission
const sendRequest = async (e) => {
  e.preventDefault();

  // If the button text is "New game?", reload the page
  if ($btn.text() === "New game?") {
    location.reload();
  }

  // Get the word from the input field and clear it
  const word = $checkWordField.val().trim();
  $checkWordField.val("");
  disableElementsForm();

  // Check if the word is empty, contains whitespace, or contains numbers
  if (word.length === 0 || word.includes(" ") || /\d/.test(word)) {
    $result.text("Not a word");
    releaseElementsForm();
    return;
  }

  // Send the word to the server and process the response
  const resultResponse = await sendToServer.checkWord(word);

  // If the result is "ok", update the score
  if (resultResponse.data.result === "ok") {
    const sc = parseInt($score.text());
    $score.text(sc + word.length);
  }

  releaseElementsForm();
  $result.text(resultResponse.data.result);
};

// Event listener for the button click
$btn.on("click", sendRequest);

// Timer to update the countdown
let setTimer = setInterval(async () => {
  let current = parseInt($timer.text());
  if (current === 0) {
    clearInterval(setTimer);
    const response = await sendToServer.sendUserScore($score.text());
    totalScoreGames(response);
    $checkWordField.hide();
    $btn.text("New game?");
    return;
  }
  current--;
  $timer.text(current);
}, 1000);

setTimer;

// Disable form elements
const disableElementsForm = () => {
  $btn.attr("disabled", true);
  $checkWordField.attr("disabled", true);
};

// Enable form elements
const releaseElementsForm = () => {
  $btn.removeAttr("disabled");
  $checkWordField.removeAttr("disabled");
};

// Update the total score
const totalScoreGames = (response) => {
  $totalScore.text(response.data.score);
};
