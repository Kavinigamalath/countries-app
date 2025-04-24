import React from "react";
import { render, screen } from "@testing-library/react";
import CountryCard from "../components/CountryCard";
import { AuthContext } from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

// A mock country object to pass into the CountryCard component
const mockCountry = {
  cca3: "ABC",
  flags: { svg: "flag.svg" },
  name: { common: "Testland" },
  population: 123456,
  region: "TestRegion",
  capital: ["TestCity"]
};

test("CountryCard renders correctly with provided country", () => {
  // ─── Arrange ────────────────────────────────────────────────────────────────
  // Wrap CountryCard in both AuthContext (for favorites) and MemoryRouter (for <Link>).
  // We stub out addFavorite/removeFavorite since we’re only checking render output.
  render(
    <AuthContext.Provider value={{
      user: { favorites: [] },    // no initial favorites
      addFavorite: jest.fn(),      // stub function
      removeFavorite: jest.fn()    // stub function
    }}>
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // ─── Act & Assert ─────────────────────────────────────────────────────────
  // Check that the country’s common name appears
  expect(screen.getByText("Testland")).toBeInTheDocument();

  // Verify that the "Population:" label is rendered
  expect(screen.getByText("Population:")).toBeInTheDocument();

  // Verify the formatted population number (with comma) is rendered
  expect(screen.getByText(/123,456/)).toBeInTheDocument();

  // Region should be shown
  expect(screen.getByText("TestRegion")).toBeInTheDocument();
  
  // Capital city is rendered — since capital is an array, we render the first entry
  expect(screen.getByText("TestCity")).toBeInTheDocument();
});
