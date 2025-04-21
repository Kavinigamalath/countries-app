import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import * as api from "../api/restCountries";

jest.spyOn(api, "getAll").mockResolvedValue({ data: [] });

test("renders search input after loading", async () => {
  render(<Home />);
  // findByPlaceholderText waits for loading → finished state
  expect(
    await screen.findByPlaceholderText(/search by name/i)
  ).toBeInTheDocument();
});
