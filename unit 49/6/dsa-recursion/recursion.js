/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length === 0) return 1;
  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  let long = 0;

  function _longest(words, i) {
    if (i >= words.length) return;
    if (words[i].length > long) {
      long = words[i].length;
    }
    _longest(words, i + 1);
  }
  _longest(words, 0);
  return long;
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length === 0) return "";
  return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  let isTrue = true;
  str = str.split("");

  function _isPalindrome(str, i) {
    if (i >= str.length) return;
    if (str[i] !== str.reverse()[i]) isTrue = false;
    _isPalindrome(str, i + 1);
  }
  _isPalindrome(str, 0);
  return isTrue;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  let idx = -1;

  function _findIndex(arr, val, i) {
    if (i >= arr.length) return;
    if (arr[i] === val) {
      idx = i;
      return;
    }
    _findIndex(arr, val, i + 1);
  }
  _findIndex(arr, val, 0);
  return idx;
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  function _revString(str, i) {
    if (i < 0) return "";
    return str[i] + _revString(str, i - 1);
  }
  return _revString(str, str.length - 1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings = [];

  function _gatherStrings(obj) {
    obj = Object.values(obj);
    for (o of obj) {
      if (typeof o === "string") strings.push(o);
      if (typeof o === "object") _gatherStrings(o);
    }
  }
  _gatherStrings(obj);
  return strings;
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
};
