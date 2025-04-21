import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("renders the app title in the header", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // The header always shows "🌍 Countries"
  expect(screen.getByText(/countries/i)).toBeInTheDocument();
});
