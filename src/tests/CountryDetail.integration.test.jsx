import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CountryDetail from "../pages/CountryDetail";
import * as useFetchHook from "../hooks/useFetch";
import { AuthContext } from "../contexts/AuthContext";
import * as Router from "react-router-dom";

// 1. Stub useParams to return code = "USA"
jest.spyOn(Router, "useParams").mockReturnValue({ code: "USA" });

// 2. Mock your useFetch hook to return our fake country
const mockCountryData = [{
  cca3: "USA",
  flags: { svg: "us.svg" },
  name: { common: "United States", official: "United States of America" },
  population: 331000000,
  region: "Americas",
  subregion: "Northern America",
  capital: ["Washington D.C."],
  languages: { eng: "English" },
  currencies: { USD: { name: "United States dollar", symbol: "$" } }
}];

jest.spyOn(useFetchHook, "default").mockReturnValue({
  data: mockCountryData,
  loading: false,
  error: null
});

test("CountryDetail: displays details and toggles favorite", () => {
  // 3. Provide fake AuthContext
  const addFavorite = jest.fn();
  const removeFavorite = jest.fn();
  let user = { name: "Tester", favorites: [] };

  const { rerender } = render(
    <AuthContext.Provider value={{ user, addFavorite, removeFavorite }}>
      <CountryDetail />
    </AuthContext.Provider>
  );

  // Verify heading
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("United States");

  // Check labels and values separately
  expect(screen.getByText("Official:")).toBeInTheDocument();
  expect(screen.getByText("United States of America")).toBeInTheDocument();

  expect(screen.getByText("Population:")).toBeInTheDocument();
  expect(screen.getByText("331,000,000")).toBeInTheDocument();

  expect(screen.getByText("Region:")).toBeInTheDocument();
  expect(screen.getByText("Americas")).toBeInTheDocument();

  expect(screen.getByText("Subregion:")).toBeInTheDocument();
  expect(screen.getByText("Northern America")).toBeInTheDocument();

  expect(screen.getByText("Capital:")).toBeInTheDocument();
  expect(screen.getByText("Washington D.C.")).toBeInTheDocument();

  // Test Add to Favorites
  const addBtn = screen.getByRole("button", { name: /Add to Favorites/i });
  fireEvent.click(addBtn);
  expect(addFavorite).toHaveBeenCalledWith("USA");

  // Rerender as if user has favorited USA
  user = { ...user, favorites: ["USA"] };
  rerender(
    <AuthContext.Provider value={{ user, addFavorite, removeFavorite }}>
      <CountryDetail />
    </AuthContext.Provider>
  );

  // Test Remove from Favorites
  const removeBtn = screen.getByRole("button", { name: /Remove from Favorites/i });
  fireEvent.click(removeBtn);
  expect(removeFavorite).toHaveBeenCalledWith("USA");
});
