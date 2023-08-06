### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
  It's a JavaScript library for building user interfaces. It helps create reusable UI components that update and render when data changes.

- What is Babel?
  It's a popular javascript compiler. Allowing developers to write code in the latest ECMAScript syntax.

- What is JSX?
  JSX stands for JavaScript XML. It's a syntax extension for JavaScript used in react.

- How is a Component created in React?
  You create a component by defining a JavaScript function or class that returns JSX elements

- What are some difference between state and props?
  Props are used to pass data from a parent to a child component.
  State is used to manage mutable data within a component

- What does "downward data flow" refer to in React?
  It's data that should flow form the parent components to their child components.

- What is a controlled component?
  its a form element whose value is controlled by React's state.

- What is an uncontrolled component?
  It's a form element that keeps its own internal state rather than relying on React's state to control its value

- What is the purpose of the `key` prop when rendering a list of components?
  it's a special attribute in React that is used when rendering a list of components dynamically.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
  Lack of uniqueness, poor performance, and component state issues.

- Describe useEffect. What use cases is it used for in React components?
  Allows you to performs side effects in functional componenets. it introduces side effects in a React component and is called every render of the component.

- What does useRef do? Does a change to a ref value cause a rerender of a component?
  It provides a way to create a mutable reference that persists across component renders. One primary use of 'useRef' is to access and interact with DOM elements directly. It's useful for storing values that shouldn't trigger updates to the UI

- When would you use a ref? When wouldn't you use one?
  You'd use a ref when managing focus, DOM Measurements, Uncontrolled form inputs, or integrating with third party libraries.
  You wouldn't use a ref when you can achieve the same functionality using React's state or props.

- What is a custom hook in React? When would you want to write one?
  It's a JavaScript function that uses one or more built in hooks to create a reusable piece of logic, You'd want one when you're using the same or similar hooks and logic in multiple components.
