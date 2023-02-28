function doMath(a, b, callback) {
  return callback(a, b);
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function multi(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

function count(num) {
  let timer = setInterval(() => {
    num--;
    if (num <= 0) {
      clearInterval(timer);
      console.log("done");
    } else console.log(num);
  }, 1000);
}

function randomGame() {
  let count = 0;
  let randnum;
  let timer = setInterval(() => {
    randnum = Math.random();
    count++;
    console.log(randnum);
    if (randnum > 0.75) {
      clearInterval(timer);
      console.log(`It took ${count} tries to get above 0.75`);
    }
  }, 1000);
}
