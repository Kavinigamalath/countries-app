//Mock the Firebase Auth module to prevent real authentication calls during testing.
jest.mock("firebase/auth");

// Mocking the Firebase module to prevent actual API calls
jest.mock("../firebase");

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


//Mock out static assets 
jest.mock("../assets/logo.png",              () => "logo.png");
jest.mock("../assets/services/service1.png", () => "s1.png");
jest.mock("../assets/services/service2.png", () => "s2.png");
jest.mock("../assets/services/service3.png", () => "s3.png");
jest.mock("../assets/services/service4.png", () => "s4.png");
jest.mock("../assets/services/service5.png", () => "s5.png");

// Stub heavy child components to speed up tests

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useSearchParams: () => {
      // Mimic the tuple [URLSearchParams, setSearchParams]
      const params = new URLSearchParams();
      return [
        params,
        jest.fn(), // setSearchParams mock
      ];
    },
  };
});

jest.mock("../firebase", () => ({
  auth: {},
  provider: {},
  db: {},
  onAuthStateChanged: (auth, callback) => {
    callback(null); // simulate no user
    return () => {}; // mock unsubscribe
  },
}));

jest.mock(
  "../components/SpotlightCarousel",
  () => ({ __esModule: true, default: () => <div data-testid="carousel" /> })
);
jest.mock(
  "../components/FilterDrawer",
  () => ({ __esModule: true, default: () => <div data-testid="drawer" /> })
);
jest.mock(
  "../components/CountryCard",
  () => ({
    __esModule: true,
    default: ({ country }) => (
      <div data-testid="country-card">
        {country.name.common} — {country.region}
      </div>
    ),
  })
);

// Spy on useFetch to return a specific value
import * as useFetchHook from "../hooks/useFetch";
import App from "../App";

const mockCountry = {
  cca3: "USA",
  flags: { svg: "us.svg" },
  name: { common: "United States" },
  population: 331000000,
  region: "Americas",
  capital: ["Washington D.C."],
};

// Before each test, make useFetch return exactly one country
beforeEach(() => {
  jest.spyOn(useFetchHook, "default").mockReturnValue({
    data: [mockCountry],
    loading: false,
    error: null,
  });
});

// After everything, restore all spies (including console.warn)
afterAll(() => {
  jest.restoreAllMocks();
});

// Silence only MUI Grid legacy props warnings
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation((msg, ...args) => {
    if (typeof msg === "string" && msg.includes("MUI Grid: The `")) {
      return;
    }
    // For any other warnings, still print
    // eslint-disable-next-line no-console
    console.warn(msg, ...args);
  });
});

// Test the full app integration: Header, Home content, Footer newsletter
test("full app integration: Header, Home content, Footer newsletter", async () => {
  render(
    <AuthContext.Provider
      value={{ user: null, login: jest.fn(), logout: jest.fn() }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  // HEADER: make sure at least one 'Country Explorer' heading exists
  const headings = await screen.findAllByRole("heading", {
    name: /Country Explorer/i,
  });
  expect(headings.length).toBeGreaterThan(0);

  // HOME: our stubbed CountryCard displays name + region
  expect(screen.getByTestId("country-card")).toHaveTextContent(
    "United States — Americas"
  );

  // FOOTER: newsletter input + subscribe button
  const emailInput = screen.getByPlaceholderText(/Your email address/i);
  const subscribeButton = screen.getByRole("button", { name: /subscribe/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.click(subscribeButton);

  // Confirmation message appears
  expect(await screen.findByText(/Thanks for subscribing/i)).toBeInTheDocument();
});
