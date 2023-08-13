function findRotatedIndex(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let midVal = arr[middle];

    if (midVal === num) {
      return middle;
    } else if (arr[right] === num) {
      return right;
    } else if (arr[left] === num) {
      return left;
    } else if (midVal > num && arr[left] < num) {
      right = middle - 1;
    } else if (midVal > num && arr[left] > num && arr[right] >= num) {
      left = middle + 1;
    } else if (midVal < num && arr[right] < num) {
      right = middle - 1;
    } else if (midVal < num && arr[right] > num) {
      left = middle + 1;
    }
  }
  return -1;
}

module.exports = findRotatedIndex;
