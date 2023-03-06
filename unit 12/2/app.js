function hasOddNumber(arr) {
  let odd = arr.some(function (num) {
    return num % 2 !== 0;
  });
  return odd;
}

function hasAZero(num) {
  let numstr = num.toString().split("");
  let zero = numstr.some(function (number) {
    return number === "0";
  });
  return zero;
}

function hasOnlyOddNumbers(arr) {
  let odd = arr.every(function (number) {
    return number % 2 === 1;
  });
  return odd;
}

function hasNoDuplicates(arr) {
  let noDupe = arr.every(function (dupe) {
    return arr.indexOf(dupe) === arr.lastIndexOf(dupe);
  });
  return noDupe;
}

function hasCertainKey(arr, key) {
  let Certain = arr.every(function (spot) {
    return key in spot;
  });
  return Certain;
}

function hasCertainValue(arr, key, searchValue) {
  let certVal = arr.every(function (spot) {
    return spot[key] === searchValue;
  });
  return certVal;
}

let arr = [
  { title: "Instructor", first: "Elie", last: "Schoppik" },
  { title: "Instructor", first: "Tim", last: "Garcia", isCatOwner: true },
  { title: "Instructor", first: "Matt", last: "Lane" },
  { title: "Instructor", first: "Colt", last: "Steele", isCatOwner: true },
];
