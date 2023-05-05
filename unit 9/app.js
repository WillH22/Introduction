const form = document.getElementById("meme-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const imageInput = document.getElementById("image");
  const topTextInput = document.getElementById("top-text");
  const bottomTextInput = document.getElementById("bottom-text");

  const memeDiv = document.createElement("div");
  memeDiv.classList.add("meme");

  const img = document.createElement("img");
  img.src = imageInput.value;

  const topText = document.createElement("span");
  topText.classList.add("top-text");
  topText.innerText = topTextInput.value;

  const bottomText = document.createElement("span");
  bottomText.classList.add("bottom-text");
  bottomText.innerText = bottomTextInput.value;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.innerText = "Remove";

  memeDiv.appendChild(img);
  memeDiv.appendChild(topText);
  memeDiv.appendChild(bottomText);
  memeDiv.appendChild(removeButton);

  const container = document.getElementById("meme-container");
  container.appendChild(memeDiv);

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
