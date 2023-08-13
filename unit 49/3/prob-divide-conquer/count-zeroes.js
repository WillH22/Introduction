function countZeroes(arr) {
  let left = 0;
  let right = arr.length - 1;

  if (arr[left] === 0) {
    return arr.length;
  }

  if (arr[right] === 1) {
    return 0;
  }

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let midVal = arr[middle];

    if (midVal === 1) {
      left = middle + 1;
    } else if (midVal === 0 && arr[middle - 1] === 0) {
      right = middle - 1;
    } else {
      return arr.length - middle;
    }
  }
}

module.exports = countZeroes;
