import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CountryDetail from "../pages/CountryDetail";
import * as useFetchHook from "../hooks/useFetch";
import { AuthContext } from "../contexts/AuthContext";
import * as Router from "react-router-dom";

// 1) Stub useParams → code="USA"
jest.spyOn(Router, "useParams").mockReturnValue({ code: "USA" });

// 2) Mock useFetch to return one country
const mockData = [{
  cca3: "USA",
  flags: { svg: "us.svg" },
  name: { common: "United States", official: "United States of America" },
  population: 331000000,
  region: "Americas",
  subregion: "Northern America",
  capital: ["Washington D.C."],
  languages: { eng: "English" },
  currencies: { USD: { name: "US dollar", symbol: "$" } },
  timezones: ["UTC−05:00"],
  area: 9833520,
  independent: true,
  borders: ["CAN", "MEX"]
}];

jest.spyOn(useFetchHook, "default").mockReturnValue({
  data: mockData,
  loading: false,
  error: null
});

test("CountryDetail shows correct info and toggles favorite", () => {
  const addFav = jest.fn();
  const remFav = jest.fn();
  let user = { name: "Tester", favorites: [] };

  const { rerender } = render(
    <AuthContext.Provider value={{ user, addFavorite: addFav, removeFavorite: remFav }}>
      <CountryDetail />
    </AuthContext.Provider>
  );

  // Heading level 2 is country name
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("United States");
  // Official name
  expect(screen.getByText("United States of America")).toBeInTheDocument();
  // Population
  expect(screen.getByText("Population")).toBeInTheDocument();
  expect(screen.getByText("331,000,000")).toBeInTheDocument();
  // Region/Subregion/Capital
  expect(screen.getByText("Americas")).toBeInTheDocument();
  expect(screen.getByText("Northern America")).toBeInTheDocument();
  expect(screen.getByText("Washington D.C.")).toBeInTheDocument();

  // Click “Add to Favorites”
  const addBtn = screen.getByRole("button", { name: /Add to Favorites/i });
  fireEvent.click(addBtn);
  expect(addFav).toHaveBeenCalledWith("USA");

  // Now simulate it’s already favorited
  user = { ...user, favorites: ["USA"] };
  rerender(
    <AuthContext.Provider value={{ user, addFavorite: addFav, removeFavorite: remFav }}>
      <CountryDetail />
    </AuthContext.Provider>
  );

  const remBtn = screen.getByRole("button", { name: /Remove from Favorites/i });
  fireEvent.click(remBtn);
  expect(remFav).toHaveBeenCalledWith("USA");
});
