"Toda list without local storage";

// const form = document.querySelector("#todoForm");
// const todoInput = document.querySelector("#textBox");
// const ulList = document.querySelector(".Bulleted");
// const ullis = document.querySelectorAll(".Bulleted li");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const newTodo = makeTodo(todoInput.value);
//   ulList.append(newTodo);
//   todoInput.value = "";
// });

// function makeTodo(text) {
//   const newLi = document.createElement("li");
//   newLi.innerText = text;
//   return newLi;
// }

// ulList.addEventListener("click", function (e) {
//   const ullis = document.querySelectorAll(".Bulleted li");
//   const crullis = document.querySelectorAll(".crossed");

//   if (e.target.tagName === "LI") {
//     e.target.classList.toggle("crossed");
//   } else if (e.target.id === "crossout") {
//     for (ulli of ullis) {
//       ulli.classList.toggle("crossed");
//     }
//   } else if (e.target.id === "purge") {
//     for (crulli of crullis) {
//       crulli.remove();
//     }
//   }
// });

// The stuff below is old code before finding small bugs/mistakes with it

// purging.addEventListener("click", function (e) {
//   document.querySelector(".crossed").remove();
// });
// crossAll.addEventListener("click", function (e) {
//   for (ulli of ullis) {
//     ulli.classList.toggle("crossed");
//   }
// });
// });
"My Todo list with localstorage";

const form = document.querySelector("#todoForm");
const todoInput = document.querySelector("#textBox");
const ulList = document.querySelector(".Bulleted");
const ullis = document.querySelectorAll(".Bulleted li");
const purgebutton = document.querySelector("#purge");
const listSection = document.querySelector("#results");
let todoArray = [];

window.addEventListener("load", () => {
  displaylist();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
    console.log(todoArray);
  }
  todoArray.push(todoInput.value);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  todoInput.value = "";
  displaylist();
});

function displaylist() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  ulList.innerHTML = "";
  todoArray.map((item) => {
    let newTodo = makeTodo(item);
    ulList.append(newTodo);
  });
}

function makeTodo(text) {
  const newLi = document.createElement("li");
  newLi.innerText = text;
  return newLi;
}

listSection.addEventListener("click", function (e) {
  "The commented out areas were just me testing out what would work and what won't, I deleted some of it not gonna lie, but the console.log was helping, randomArr helped figure out why the text wasn't showing up and I realize it needs to be innerText";

  const ullis = document.querySelectorAll(".Bulleted li");
  const crullis = document.querySelectorAll(".crossed");
  // randomArr = [];

  if (e.target.tagName === "LI") {
    e.target.classList.toggle("crossed");
  } else if (e.target.id === "crossout") {
    for (ulli of ullis) {
      ulli.classList = "crossed";
    }
  } else if (e.target.id === "uncross") {
    for (ulli of ullis) {
      ulli.classList = "";
    }
  } else if (e.target.id === "purge") {
    for (crulli of crullis) {
      todoArray.splice(todoArray.indexOf(crulli.innerText), 1);
      // todoArray.splice(crulli, 1);
      localStorage.setItem("todo", JSON.stringify(todoArray));
      displaylist();
      // randomArr.push(crulli.innerText);
    }
    // console.log(todoArray);
  }
});
