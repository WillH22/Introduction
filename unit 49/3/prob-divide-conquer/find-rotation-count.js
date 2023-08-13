function findRotationCount(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let midVal = arr[middle];

    if (midVal < arr[middle - 1] || middle === 0) {
      return middle;
    } else if (midVal < arr[left]) {
      right = middle - 1;
    } else if (midVal > arr[right]) {
      left = middle + 1;
    } else if (arr[right] > arr[left]) {
      return 0;
    }
  }
}

module.exports = findRotationCount;
