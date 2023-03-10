function extractValue(arr, key) {
  let reduced = arr.reduce(function (obj, val) {
    obj.push(val[key]);
    return obj;
  }, []);
  return reduced;
}

const arr = [
  { name: "Elie" },
  { name: "Tim" },
  { name: "Matt" },
  { name: "Colt" },
];

function vowelCount(str) {
  let lowstr = str.toLowerCase().split("");
  const vowels = "aeiou";
  let reduced = lowstr.reduce(function (letter, nextLetter) {
    if (vowels.indexOf(nextLetter) !== -1) {
      if (letter[nextLetter]) {
        letter[nextLetter]++;
      } else {
        letter[nextLetter] = 1;
      }
    }
    return letter;
  }, {});
  return reduced;
}

function addKeyAndValue(arr, key, value) {
  let newarr = arr.reduce(function (title, word, spot) {
    title[spot][key] = value;
    return title;
  }, arr);
  return newarr;
}

function isEven(val) {
  return val % 2 === 0;
}

function isLongerThanThreeCharacters(val) {
  return val.length > 3;
}

function partition(arr, callback) {
  return arr.reduce(
    function (first, next) {
      if (callback(next)) {
        first[0].push(next);
      } else {
        first[1].push(next);
      }
      return first;
    },
    [[], []]
  );
}

const names = ["Elie", "Colt", "Tim", "Matt"];

//Will have to come back to this subunit and try it again on my own soon.
