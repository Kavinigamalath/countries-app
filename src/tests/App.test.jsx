//Mock the Firebase Auth module to prevent real authentication calls during testing.
jest.mock("firebase/auth");
// Mocking the Firebase module to prevent actual API calls
jest.mock("../firebase");

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// Mocking the components and pages to isolate the App component for testing
jest.mock("../components/Header",      () => () => <div>HEADER</div>);
jest.mock("../pages/Home",            () => () => <div>HOME_PAGE</div>);
jest.mock("../pages/CountryDetail",   () => () => <div>DETAIL_PAGE</div>);
jest.mock("../pages/Login",           () => () => <div>LOGIN_PAGE</div>);
jest.mock("../pages/Favorites",       () => () => <div>FAV_PAGE</div>);
jest.mock("../components/Footer",     () => () => <div>FOOTER</div>);

describe("App routing (stubbed)", () => {
  test("renders Header, Home and Footer on `/`", () => {
    // Arrange: mount App at the root path
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Assert: on “/” we should see our HEADER, HOME_PAGE and FOOTER stubs
    expect(screen.getByText("HEADER")).toBeInTheDocument();
    expect(screen.getByText("HOME_PAGE")).toBeInTheDocument();
    expect(screen.getByText("FOOTER")).toBeInTheDocument();
  });

  test("renders Login page on `/login`", () => {
    // Arrange: navigate to /login
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    // Assert: only the LOGIN_PAGE stub should appear
    expect(screen.getByText("LOGIN_PAGE")).toBeInTheDocument();
  });

  test("redirects unknown route to Home", () => {
    // Arrange: navigate to some nonexistent path 
    render(
      <MemoryRouter initialEntries={["/nope"]}>
        <App />
      </MemoryRouter>
    );

    //  Assert: App’s catch-all route should send us back to HOME_PAGE
    expect(screen.getByText("HOME_PAGE")).toBeInTheDocument();
  });
});
