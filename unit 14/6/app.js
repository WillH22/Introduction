// let facts = { numPlanets: 8, yearNeptuneDiscovered: 1846 };
// let { numPlanets, yearNeptuneDiscovered } = facts;

// let planetFacts = {
//   numPlanets: 8,
//   yearNeptuneDiscovered: 1846,
//   yearMarsDiscovered: 1659,
// };
// let { numPlanets, ...discoveryYears } = planetFacts;

// function getUserData({ firstName, favoriteColor = "green" }) {
//   return `Your name is ${firstName} and you like ${favoriteColor}`;
// }

// let [first, second, third] = ["Maya", "Marisa", "Chi"];

// let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
//   "Raindrops on roses",
//   "whiskers on kittens",
//   "Bright copper kettles",
//   "warm woolen mittens",
//   "Brown paper packages tied up with strings",
// ];

// let numbers = [10, 20, 30];
// [numbers[1], numbers[2]] = [numbers[2], numbers[1]];

const obj = {
  numbers: {
    a: 1,
    b: 2,
  },
};

const a = obj.numbers.a;
const b = obj.numbers.b;

let arr = [1, 2];
let temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;

const raceResults = ([first, second, third, ...rest]) => ({
  first,
  second,
  third,
  rest,
});
