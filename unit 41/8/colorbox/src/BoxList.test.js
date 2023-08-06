import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders", () => {
  render(<BoxList />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("adds new box", () => {
  const { queryByText, getByLabelText } = render(<BoxList />);
  expect(queryByText("X")).not.toBeInTheDocument();

  const color = getByLabelText("Color:");
  const width = getByLabelText("Width:");
  const height = getByLabelText("Height:");
  const submit = queryByText("Create New Box");

  fireEvent.change(color, { target: { value: "blue" } });
  fireEvent.change(width, { target: { value: 55 } });
  fireEvent.change(height, { target: { value: 55 } });
  fireEvent.click(submit);

  expect(queryByText("X")).toBeInTheDocument();
});

it("removes box", () => {
  const { queryByText, getByLabelText } = render(<BoxList />);
  expect(queryByText("X")).not.toBeInTheDocument();

  const color = getByLabelText("Color:");
  const width = getByLabelText("Width:");
  const height = getByLabelText("Height:");
  const submit = queryByText("Create New Box");

  fireEvent.change(color, { target: { value: "blue" } });
  fireEvent.change(width, { target: { value: 55 } });
  fireEvent.change(height, { target: { value: 55 } });
  fireEvent.click(submit);

  expect(queryByText("X")).toBeInTheDocument();
  const remove = queryByText("X");

  fireEvent.click(remove);

  expect(queryByText("X")).not.toBeInTheDocument();
});
