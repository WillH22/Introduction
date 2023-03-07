//Some/Every Exercises

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

//Find/Findindex Exercises

function findUserByUsername(usersArray, username) {
  let found = usersArray.find(function (user) {
    return user.username === username;
  });
  return found;
}

function removeUser(usersArray, username) {
  let removed = usersArray.findIndex(function (user) {
    return user.username === username;
  });
  if (removed === -1) return;
  return usersArray.splice(removed, 1);
}
