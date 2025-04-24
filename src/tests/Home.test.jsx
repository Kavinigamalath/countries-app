import React from "react";
import { render, screen } from "@testing-library/react";

// 1) Stub react-router-dom so <Link> just becomes <a>
jest.mock("react-router-dom", () => ({
  __esModule: true,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

// 2) Stub your data-fetching hook to return an empty array immediately
jest.mock("../hooks/useFetch", () => ({
  __esModule: true,
  default: () => ({ data: [], loading: false, error: null }),
}));

// 3) Prevent Jest from trying to parse PNGs
jest.mock("../assets/services/service1.png", () => "s1.png");
jest.mock("../assets/services/service2.png", () => "s2.png");
jest.mock("../assets/services/service3.png", () => "s3.png");
jest.mock("../assets/services/service4.png", () => "s4.png");
jest.mock("../assets/services/service5.png", () => "s5.png");

// 4) Stub out the three child components with minimal JSX
jest.mock(
  "../components/SpotlightCarousel",
  () => ({ __esModule: true, default: () => <div data-testid="carousel">CAROUSEL</div> })
);
jest.mock(
  "../components/FilterDrawer",
  () => ({ __esModule: true, default: () => <div data-testid="filter-drawer">FILTER_DRAWER</div> })
);
jest.mock(
  "../components/CountryCard",
  () => ({ __esModule: true, default: () => <div data-testid="country-card">COUNTRY_CARD</div> })
);

import Home from "../pages/Home";

test("search unit: renders the search input and carousel stub without errors", async () => {
  render(<Home />);

  // The search TextField should appear (useFindBy to wait for internal loading → done)
  expect(
    await screen.findByPlaceholderText(/Search for a country/i)
  ).toBeInTheDocument();

  // Our stubbed SpotlightCarousel must be on screen
  expect(screen.getByTestId("carousel")).toBeInTheDocument();
});
