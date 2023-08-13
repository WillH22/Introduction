function sortedFrequency(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let first;
  let last;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let midVal = arr[middle];

    if (midVal < num) {
      left = middle + 1;
    } else if (midVal >= num && midVal === arr[middle - 1]) {
      right = middle - 1;
    } else if (midVal === num && midVal !== arr[middle - 1]) {
      first = middle;
      right = left - 1;
    } else {
      return -1;
    }
  }

  left = 0;
  right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let midVal = arr[middle];

    if (midVal > num) {
      right = middle - 1;
    } else if (midVal <= num && midVal === arr[middle + 1]) {
      left = middle + 1;
    } else if (midVal === num) {
      last = middle + 1;
      right = left - 1;
    } else if (arr[middle + 1] === num) {
      last = middle + 2;
      right = left - 1;
    } else {
      return -1;
    }
  }
  return last - first;
}

module.exports = sortedFrequency;
