function doubleValues(arr) {
  let doubled = [];
  arr.forEach(function (num) {
    doubled.push(num * 2);
  });
  return doubled;
}

function onlyEvens(arr) {
  let evennum = [];

  arr.forEach(function (evens) {
    if (evens % 2 === 0) {
      evennum.push(evens);
    }
  });
  return evennum;
}

function showFirstAndLast(arr) {
  let firstAndLast = [];
  arr.forEach(function (str) {
    firstAndLast.push(str[0] + str[str.length - 1]);
  });
  return firstAndLast;
}

function addKeyAndValue(arr, key, value) {
  arr.forEach(function (newKV) {
    newKV[key] = value;
  });
  return arr;
}

function vowelCount(str) {
  let lowstr = str.toLowerCase().split("");
  const vowels = "aeiou";
  let count = {};

  lowstr.forEach(function (letter) {
    if (vowels.indexOf(letter) !== -1) {
      if (count[letter]) {
        count[letter]++;
      } else {
        count[letter] = 1;
      }
    }
  });
  return count;
}

function doublesValuesWithMap(arr) {
  let doubled = [];
  arr.map(function (num) {
    doubled.push(num * 2);
  });
  return doubled;
}

function valTimesIndex(numbers) {
  let Multi = [];
  numbers.map(function (num, spot) {
    Multi.push(num * spot);
  });
  return Multi;
}
