// src/tests/Home.integration.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import * as useFetchHook from "../hooks/useFetch";
import Home from "../pages/Home";

// ─── 1) Mock out static images ─────────────────────────────────────────────
jest.mock("../assets/services/service1.png", () => "s1.png");
jest.mock("../assets/services/service2.png", () => "s2.png");
jest.mock("../assets/services/service3.png", () => "s3.png");
jest.mock("../assets/services/service4.png", () => "s4.png");
jest.mock("../assets/services/service5.png", () => "s5.png");

// ─── 2) Stub heavy sub-components ─────────────────────────────────────────
jest.mock(
  "../components/SpotlightCarousel",
  () => ({ images, interval }) => (
    <div data-testid="carousel">CAROUSEL ({images.length} images)</div>
  )
);

jest.mock(
  "../components/FilterDrawer",
  () => ({ open, onClose }) =>
    open ? <div data-testid="filter-drawer">FILTER_DRAWER</div> : null
);

jest.mock(
  "../components/CountryCard",
  () => ({ country }) => (
    <div data-testid="country-card">{country.name.common}</div>
  )
);

// ─── 3) Prepare fake country list ──────────────────────────────────────────
const mockCountries = [
  {
    cca3: "USA",
    flags: { svg: "" },
    name: { common: "United States" },
    population: 331000000,
    region: "Americas",
    subregion: "Northern America",
    capital: ["Washington D.C."],
    languages: { eng: "English" },
    currencies: { USD: { name: "US dollar", symbol: "$" } },
    timezones: ["UTC−05:00"],
    area: 9833520,
    independent: true,
    borders: ["CAN", "MEX"],
  },
  {
    cca3: "FRA",
    flags: { svg: "" },
    name: { common: "France" },
    population: 67000000,
    region: "Europe",
    subregion: "Western Europe",
    capital: ["Paris"],
    languages: { fra: "French" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    timezones: ["UTC+01:00"],
    area: 551695,
    independent: true,
    borders: ["BEL", "DEU", "ITA", "ESP"],
  },
];

beforeEach(() => {
  // Spy on useFetch to return our mockCountries
  jest.spyOn(useFetchHook, "default").mockReturnValue({
    data: mockCountries,
    loading: false,
    error: null,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("Home integration: renders carousel, all country cards, and filters by search", async () => {
  render(<Home />);

  // 1) Carousel stub appears with the correct image count
  expect(screen.getByTestId("carousel")).toHaveTextContent("CAROUSEL (5 images)");

  // 2) Both country cards render
  expect(await screen.findByText("United States")).toBeInTheDocument();
  expect(screen.getByText("France")).toBeInTheDocument();

  // 3) Typing into the search box filters the displayed cards
  const searchInput = screen.getByPlaceholderText(/Search for a country/i);
  fireEvent.change(searchInput, { target: { value: "France" } });

  expect(screen.getByText("France")).toBeInTheDocument();
  expect(screen.queryByText("United States")).toBeNull();
});

test("Home integration: opens FilterDrawer when Filters button is clicked", () => {
  render(<Home />);

  // Initially the drawer is closed
  expect(screen.queryByTestId("filter-drawer")).toBeNull();

  // Click the Filters button (it has aria-label via Tooltip title)
  const filterBtn = screen.getByRole("button", { name: /Filters/i });
  fireEvent.click(filterBtn);

  // Now our stubbed drawer should appear
  expect(screen.getByTestId("filter-drawer")).toBeInTheDocument();
});
