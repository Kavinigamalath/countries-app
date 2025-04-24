import React from "react";
import { render, screen } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import { AuthContext } from "../contexts/AuthContext";
import * as useFetchHook from "../hooks/useFetch";
import { MemoryRouter } from "react-router-dom";

jest.spyOn(useFetchHook, "default").mockReturnValue({
  data: [
    { cca3: "USA", name: { common: "USA" }, flags: { svg: "" }, population:0, region:"", capital:[], languages:{}, currencies:{}, timezones:[], area:0, independent:false, borders:[] }
  ],
  loading: false,
  error: null
});

test("Favorites redirects if not logged in, else shows cards", () => {
  // 1) no user → Navigate should swallow, nothing renders
  render(
    <AuthContext.Provider value={{ user: null }}>
      <MemoryRouter initialEntries={["/favorites"]}>
        <Favorites />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.queryByText(/You haven’t added any favorites/)).toBeNull();

  // 2) With user but no favorites
  render(
    <AuthContext.Provider value={{ user: { favorites: [] } }}>
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.getByText(/haven’t added any favorites/i)).toBeInTheDocument();

  // 3) With user and one favorite
  render(
    <AuthContext.Provider value={{ user: { favorites: ["USA"] } }}>
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    </AuthContext.Provider>
  );
  expect(screen.getByText(/Your Favorites/i)).toBeInTheDocument();
});
