// function filterOutOdds() {
//   var nums = Array.prototype.slice.call(arguments);
//   return nums.filter(function (num) {
//     return num % 2 === 0;
//   });
// }

const filterOutOdds = (...nums) => nums.filter((num) => num % 2 == 0);

const findMin = (...nums) => Math.min(...nums);

const doubleAndReturnArgs = (arr, ...nums) => [
  ...arr,
  ...nums.map((num) => num * 2),
];

const mergeObject = (object, obj) => ({ ...object, ...obj });
