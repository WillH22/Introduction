import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// Test: Renders the Card component without crashing
it("renders without crashing", function () {
  render(<Card />);
});

// Test: Matches the snapshot of the Card component
it("matches snapshot", function () {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
