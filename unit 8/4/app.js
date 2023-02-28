const form = document.querySelector("#todoForm");
const todoInput = document.querySelector("#textBox");
const ulList = document.querySelector(".Bulleted");

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
