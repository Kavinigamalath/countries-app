import React from "react";
import { render, screen } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import { AuthContext } from "../contexts/AuthContext";
import * as useFetchHook from "../hooks/useFetch";
import { MemoryRouter } from "react-router-dom";

// Mocking the Firebase module to prevent actual API calls
jest.mock("../firebase");

// Mocking the useFetch hook to return a specific value
jest.spyOn(useFetchHook, "default").mockReturnValue({
  data: [
    { cca3: "USA", name: { common: "USA" }, flags: { svg: "" }, population:0, region:"", capital:[], languages:{}, currencies:{}, timezones:[], area:0, independent:false, borders:[] }
  ],
  loading: false,
  error: null
});


test("Favorites redirects if not logged in, else shows cards", () => {
  
  // Without user (not logged in)
  render(
    <AuthContext.Provider value={{ user: null }}>
      <MemoryRouter initialEntries={["/favorites"]}>
        <Favorites />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.queryByText(/You haven’t added any favorites/)).toBeNull();

  // With user but no favorites
  render(
    <AuthContext.Provider value={{ user: { favorites: [] } }}>
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.getByText(/haven’t added any favorites/i)).toBeInTheDocument();

  // With user and one favorite
  render(
    <AuthContext.Provider value={{ user: { favorites: ["USA"] } }}>
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.getByText(/Your Favorites/i)).toBeInTheDocument();
});
