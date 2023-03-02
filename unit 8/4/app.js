const form = document.querySelector("#todoForm");
const todoInput = document.querySelector("#textBox");
const ulList = document.querySelector(".Bulleted");
const ullis = document.querySelectorAll(".Bulleted li");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTodo = makeTodo(todoInput.value);
  ulList.append(newTodo);
  todoInput.value = "";
});

function makeTodo(text) {
  const newLi = document.createElement("li");
  newLi.innerText = text;
  return newLi;
}

ulList.addEventListener("click", function (e) {
  const purging = document.querySelector("#purge");
  const crossAll = document.querySelector("#crossout");
  const ullis = document.querySelectorAll(".Bulleted li");
  const crullis = document.querySelectorAll(".crossed");

  if (e.target.tagName === "LI") {
    e.target.classList.toggle("crossed");
  } else if (e.target.id === "crossout") {
    for (ulli of ullis) {
      ulli.classList.toggle("crossed");
    }
  } else if (e.target.id === "purge") {
    for (crulli of crullis) {
      crulli.remove();
    }
  }
});

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
