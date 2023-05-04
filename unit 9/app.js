const form = document.getElementById("meme-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const imageInput = document.getElementById("image");
  const topTextInput = document.getElementById("top-text");
  const bottomTextInput = document.getElementById("bottom-text");

  // Create a div element for the meme
  const memeDiv = document.createElement("div");
  memeDiv.classList.add("meme");

  // Create an img element for the meme image
  const img = document.createElement("img");
  img.src = imageInput.value;

  // Create a span element for the top text
  const topText = document.createElement("span");
  topText.classList.add("top-text");
  topText.innerText = topTextInput.value;

  // Create a span element for the bottom text
  const bottomText = document.createElement("span");
  bottomText.classList.add("bottom-text");
  bottomText.innerText = bottomTextInput.value;

  // Create a remove button for the meme
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.innerText = "Remove";

  // Add the image, text, and remove button elements to the meme div
  memeDiv.appendChild(img);
  memeDiv.appendChild(topText);
  memeDiv.appendChild(bottomText);
  memeDiv.appendChild(removeButton);

  // Add the meme div to the container div
  const container = document.getElementById("meme-container");
  container.appendChild(memeDiv);

  // Clear the form inputs
  imageInput.value = "";
  topTextInput.value = "";
  bottomTextInput.value = "";
});

const container = document.getElementById("meme-container");
container.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-button")) {
    event.target.parentElement.remove();
  }
});
