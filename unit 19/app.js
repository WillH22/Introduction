// categories is the main data structure for the app; it looks like this:
// [
//   { title: "Math",
//     clues: [
//       {question: "2+2", answer: 4, showing: null},
//       {question: "1+1", answer: 2, showing: null}
//       ...
//     ],
//   },
//   { title: "Literature",
//     clues: [
//       {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//       {question: "Bell Jar Author", answer: "Plath", showing: null},
//       ...
//     ],
//   },
//   ...
// ]

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
async function getCategoryIds() {
  const response = await axios.get(
    "http://jservice.io/api/categories?count=100"
  );
  const categoryIds = _.sampleSize(
    response.data.map((category) => category.id),
    6
  );
  return categoryIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
  const response = await axios.get(
    `http://jservice.io/api/category?id=${catId}`
  );
  const categoryData = {
    title: response.data.title,
    clues: response.data.clues.map((clue) => ({
      question: clue.question,
      answer: clue.answer,
      showing: null,
    })),
  };
  return categoryData;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function fillTable() {
  const table = $("#jeopardy");

  table.empty();

  const thead = $("<thead>");
  const headerRow = $("<tr>");
  categories.forEach((category) => {
    const headerCell = $("<td>").text(category.title);
    headerRow.append(headerCell);
  });
  thead.append(headerRow);
  table.append(thead);

  const tbody = $("<tbody>");
  for (let i = 0; i < 5; i++) {
    const questionRow = $("<tr>");
    categories.forEach((category) => {
      const questionCell = $("<td>").text("?");
      questionRow.append(questionCell);
    });
    tbody.append(questionRow);
  }
  table.append(tbody);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
function handleClick(evt) {
  const cell = $(evt.target);
  const row = cell.parent();
  const column = row.children().index(cell);

  if (row.is("thead") || cell.text() === "") {
    return;
  }

  const clue = categories[column].clues[row.index()];

  if (clue.showing === null) {
    cell.text(clue.question);
    clue.showing = "question";
  } else if (clue.showing === "question") {
    cell.text(clue.answer);
    clue.showing = "answer";
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
function showLoadingView() {
  $(".loading").addClass("show");
  $("#restart").text("Loading...");
}

/** Remove the loading spinner and update the button used to fetch data. */
function hideLoadingView() {
  $(".loading").removeClass("show");
  $("#restart").text("Restart");
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
async function setupAndStart() {
  showLoadingView();

  const categoryIds = await getCategoryIds();

  categories = await Promise.all(
    categoryIds.map((catId) => getCategory(catId))
  );

  fillTable();

  hideLoadingView();
}

/** On click of start / restart button, set up game. */
$("#restart").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */
$(document).on("click", "#jeopardy td", handleClick);
