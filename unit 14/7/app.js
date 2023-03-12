const hasDuplicate = (arr) => new Set(arr).size !== arr.length;

const vowelCount = (str) => {
  let lowstr = str.toLowerCase();
  let vowels = "aeiou";
  const vowelMap = new Map();

  for (let letters of lowstr) {
    if (vowels.includes(letters)) {
      if (vowelMap.has(letters)) {
        vowelMap.set(letters, vowelMap.get(letters) + 1);
      } else {
        vowelMap.set(letters, 1);
      }
    }
  }
  return vowelMap;
};
