function difference(x, y) {
  return x - y;
}

function product(x, y) {
  return x + y;
}

function printDay(x) {
  const days = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
  };
  return days[x];
}

function lastElement(arr) {
  return arr[arr.length - 1];
}

function numberCompare(x, y) {
  if (x > y) {
    return "First is greater";
  } else if (x < y) {
    return "Second is greater";
  } else if (x === y) {
    return "Numbers are equal";
  }
}

function singleLetterCount(sent, l) {
  let count = 0;
  for (let i = 0; i < sent.length; i++) {
    if (sent[i].toLowerCase === l.toLowerCase) {
      count++;
    }
  }
  return count;
}

function multipleLetterCount(strg) {
  strg = strg.toLowerCase();
  let letters = {};
  for (let i = 0; i < strg.length; i++) {
    if (letters[strg[i]] === undefined) {
      letters[strg[i]] = 1;
    } else {
      letters[strg[i]]++;
    }
  }
  return letters;
}

function arrayManipulation(arr, command, location, value) {
  if (command === "remove") {
    if (location === "end") {
      return arr.pop();
    } else {
      return arr.shift();
    }
  }
  if (command === "add") {
    if (location === "end") {
      arr.push(value);
      return arr;
    } else {
      arr.unshift(value);
      return arr;
    }
  }
}

function isPalindrome(str) {
  return str.toLowerCase().split("").reverse().join("") === str.toLowerCase();
}
