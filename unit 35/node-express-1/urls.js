const axios = require("axios");
const fs = require("fs").promises;
const process = require("process");
const argv = process.argv;

// Read the file at the given path and process the data
async function read(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    const urls = data.split("\n"); // Split data into individual URLs
    await getURLData(urls); // Process the URLs to download content
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    process.exit(1);
  }
}

// Fetch content for each URL and write to files
async function getURLData(data) {
  for (const url of data) {
    if (url.startsWith("http")) {
      // Check if the URL is valid
      try {
        const content = await axios.get(url); // Fetch content using axios
        await write(url, content.data); // Write content to file
      } catch (err) {
        console.error(`Couldn't download ${url}`);
      }
    }
  }
}

// Write the fetched content to a file with the filename derived from the URL
async function write(url, content) {
  const file = url.split("/"); // Extract filename from URL
  try {
    await fs.writeFile(file[2], content); // Write content to file
    console.log(`Wrote to ${file[2]}`);
  } catch (err) {
    console.error(`Couldn't write ${file[2]}`);
  }
}

// Start the process by reading the file from the command-line argument
read(argv[2]);
