import React from "react";
import { render, screen } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import { AuthContext } from "../contexts/AuthContext";
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

test("Favorites: shows only the user's favorite countries", async () => {
  api.getAll.mockResolvedValueOnce({ data: mockCountries });

  // Provide a user who has 'FRA' in their favorites
  const user = { name: "Tester", favorites: ["FRA"] };

  render(
    <AuthContext.Provider value={{ user }}>
      <Favorites />
    </AuthContext.Provider>
  );

  // It should render France, but not United States
  expect(await screen.findByText("France")).toBeInTheDocument();
  expect(screen.queryByText("United States")).toBeNull();
});
