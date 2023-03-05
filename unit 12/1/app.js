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

function extractKey(arr, key) {
  let obj = [];
  arr.map(function (obbi) {
    obj.push(obbi[key]);
  });
  return obj;
}

function extractFullName(arr) {
  let FullName = [];
  arr.map(function (name) {
    FullName.push(`${name.first} ${name.last}`);
  });
  return FullName;
}

function filterByValue(arr, key) {
  let newarr = arr.filter(function (words) {
    return words[key] !== -1;
  });
  return newarr;
}

function find(arr, searchValue) {
  let value = arr.filter(function (val) {
    return val === searchValue;
  })[0];
  return value;
}

function findInObj(arr, key, searchValue) {
  let answer = arr.filter(function (val) {
    return val[key] === searchValue;
  })[0];
  return answer;
}

function removeVowels(str) {
  const vowels = "aeiou";
  let lowstr = str.toLowerCase().split("");
  let vowelsRemoved = lowstr.filter(function (letters) {
    return vowels.indexOf(letters) === -1;
  });
  return vowelsRemoved;
}

function doubleOddNumbers(arr) {
  let odds = arr.filter(function (num) {
    return num % 2 !== 0;
  });
  let doubled = odds.map(function (numdoubled) {
    return numdoubled * 2;
  });
  return doubled;
}
