"use strict";

let currentUser;

async function login(evt) {
  evt.preventDefault();
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  try {
    currentUser = await User.login(username, password);
    $loginForm.trigger("reset");
    saveUserCredentials();
    updateUIOnUserLogin();
  } catch (error) {
    if (error.name === "AxiosError") {
      alert("Invalid Credentials!");
    } else {
      alert(error);
    }
  }
}

$loginForm.on("submit", login);

async function signup(evt) {
  evt.preventDefault();
  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  currentUser = await User.signup(username, password, name);
  saveUserCredentials();
  updateUIOnUserLogin();
  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

function logout() {
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);

async function checkForRememberedUser() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;
  currentUser = await User.loginViaStoredCredentials(token, username);
}

function saveUserCredentials() {
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

async function updateUIOnUserLogin() {
  hidePageComponents();
  putStoriesOnPage();
  $allStoriesList.show();
  updateNavOnLogin();
}
