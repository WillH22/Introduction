const fs = require("fs").promises;
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

// Function to generate Markov text based on the provided input text
async function generate(text) {
  const mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

// Function to read text data from a file and call the 'generate' function
async function makeText(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    generate(data);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Function to fetch text data from a URL and call the 'generate' function
async function makeURLText(url) {
  try {
    const res = await axios.get(url);
    generate(res.data);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Main function to determine the method and call appropriate functions
async function main() {
  const [method, path] = process.argv.slice(2);
  if (method === "file") {
    await makeText(path);
  } else if (method === "url") {
    await makeURLText(path);
  } else {
    console.error("Unknown method");
    process.exit(1);
  }
}

main();
