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

const removeRandom = (items) => {
  let idx = Math.floor(Math.random() * items.length);
  return [...items.slice(0, idx), ...items.slice(idx + 1)];
};

const extend = (array1, array2) => [...array1, ...array2];

const addKeyVal = (obj, key, val) => {
  let newobj = {};
  newobj[key] = val;
  return { ...obj, ...newobj };
};

const removeKey = (obj, key) => {
  delete obj[key];
  return obj;
};

const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });

const update = (obj, key, val) => {
  obj[key] = val;
  return { ...obj };
};
