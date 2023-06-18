document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const removeButton = document.getElementById("removeButton");
  const gifContainer = document.getElementById("gifContainer");

  // Add event listener to the form for handling the submission
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the user's search query
    const searchTerm = searchInput.value;

    searchInput.value = "";

    axios
      .get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "YOUR_GIPHY_KEY", // Replace "YOUR_GIPHY_KEY" with your API key
          q: searchTerm,
          limit: 5,
        },
      })
      .then(function (response) {
        var gifData = response.data.data;

        gifData.forEach(function (gif) {
          const gifUrl = gif.images.fixed_height.url;
          const gifImage = document.createElement("img");
          gifImage.src = gifUrl;
          gifContainer.appendChild(gifImage);
        });
      })
      .catch(function (error) {
        console.error("Error fetching GIFs:", error);
      });
  });

  // Add event listener to the remove button for removing GIFs
  removeButton.addEventListener("click", function () {
    gifContainer.innerHTML = "";
  });
});
