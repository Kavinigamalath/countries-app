import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/Home";
import * as api from "../api/restCountries";

// Mock the REST Countries API
jest.mock("../api/restCountries");

const mockCountries = [
  {
    cca3: "USA",
    flags: { svg: "us.svg" },
    name: { common: "United States" },
    population: 331000000,
    region: "Americas",
    capital: ["Washington D.C."],
    languages: { eng: "English" }
  },
  {
    cca3: "FRA",
    flags: { svg: "fr.svg" },
    name: { common: "France" },
    population: 67000000,
    region: "Europe",
    capital: ["Paris"],
    languages: { fra: "French" }
  }
];

test("Home: fetches and displays all countries, then filters by search input", async () => {
  api.getAll.mockResolvedValueOnce({ data: mockCountries });

  render(<Home />);

  // Wait for both cards to show up
  expect(await screen.findByText("United States")).toBeInTheDocument();
  expect(screen.getByText("France")).toBeInTheDocument();

  // Type into the search bar to filter
  const search = screen.getByPlaceholderText(/search by name/i);
  fireEvent.change(search, { target: { value: "France" } });

  // Only 'France' remains
  expect(screen.getByText("France")).toBeInTheDocument();
  expect(screen.queryByText("United States")).toBeNull();
});
