import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryCard from "../components/CountryCard";

const mock = {
  cca3: "ABC",
  flags: { svg: "flag.svg" },
  name: { common: "Testland" },
  population: 123456,
  region: "TestRegion",
  capital: ["TestCity"]
};

test("renders country card with data", () => {
  render(
    <MemoryRouter>
      <CountryCard country={mock} />
    </MemoryRouter>
  );
  expect(screen.getByText("Testland")).toBeInTheDocument();
  expect(screen.getByText(/123,456/)).toBeInTheDocument();
  expect(screen.getByText(/TestRegion/)).toBeInTheDocument();
  expect(screen.getByText(/TestCity/)).toBeInTheDocument();
});
