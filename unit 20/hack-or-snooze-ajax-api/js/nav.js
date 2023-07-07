"use strict";

// Event handlers
$body.on("click", "#nav-all", navAllStories);
$navLogin.on("click", navLoginClick);
$navSubmit.on("click", submitStoryClick);
$body.on("click", "#nav-favorites", navFavoritesClick);
$body.on("click", "#nav-my-stories", navMyStoriesClick);

// Function to show main list of all stories
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

// Function to show login/signup on click on "login"
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

// Function to update the navbar after login
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navFavorites.show();
  $navMyStories.show();
  $navSubmit.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// Function to handle submit story link click
function submitStoryClick(evt) {
  console.debug("submitStoryClick", evt);
  hidePageComponents();
  $storyForm.show();
}

// Function to open favorites page
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesListOnPage();
}

// Function to open my stories page
function navMyStoriesClick(evt) {
  console.debug("navMyStoriesClick", evt);
  hidePageComponents();
  putUserStoriesOnPage();
}
