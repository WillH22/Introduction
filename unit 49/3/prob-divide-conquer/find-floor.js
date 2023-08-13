function findFloor(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  if (arr[right] < num) {
    return arr[right];
  }

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let midVal = arr[middle];

    if (midVal === num || (midVal < num && arr[middle + 1] > num)) {
      return midVal;
    } else if (midVal < num) {
      left = middle + 1;
    } else if (midVal > num) {
      right = middle - 1;
    }
  }
  return -1;
}

module.exports = findFloor;
