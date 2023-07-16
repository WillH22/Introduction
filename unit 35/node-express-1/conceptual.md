### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  Using callbacks, promises, and Async/await

- What is a Promise?
  it represents the eventual completion/failure of an asynchronous operation and its resulting value.

- What are the differences between an async function and a regular function?
  an async always returns a promise and regular functions can't do this.
  Async can also use "await" which suspends the execution of the function until a promise is resolved/rejected, regular functions also cannot do this.

- What is the difference between Node.js and Express.js?
  Node.js allows JS to be run on the server side and Express.js is the framework for Node.js.

- What is the error-first callback pattern?
  It's reserved for an error object and the arguments contain the result or data of the operation

- What is middleware?
  they have access to the request and response objects, they can be used for tasks like logging, authentication, or error handling.

- What does the `next` function do?
  It makes Express move on to the next function.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```

Performance wise the code makes some sequential HTTP requests, which can lead to slower execution times.
There's also no error handling for the HTTP requests which may result in uncaught errors.
The URLs are also hardcoded making the function less flexible.
