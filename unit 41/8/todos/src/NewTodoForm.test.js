import React from "react";
import { fireEvent, render } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("renders", () => {
  render(<NewTodoForm />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});
