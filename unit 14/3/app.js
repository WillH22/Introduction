//this one is before looking at the arrow functions handout

// const double = (arr) => {
//   return arr.map((val) => {
//     return val * 2;
//   });
// };

// const squareAndFindEvens = (numbers) => {
//   let squares = numbers.map((num) => {
//     return num ** 2;
//   });
//   let evens = squares.filter((square) => {
//     return square % 2 === 0;
//   });
//   return evens;
// };

//After looking at the handout and realizing curly braces would need a return

const double = (arr) => arr.map((val) => val * 2);

const squareAndFindEvens = (numbers) =>
  numbers.map((num) => num ** 2).filter((square) => square % 2 === 0);

//compared my code to the solutions code... I don't even need the parentheses around the values...
