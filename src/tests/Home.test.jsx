import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import * as api from "../api/restCountries";

jest.spyOn(api, "getAll").mockResolvedValue({ data: [] });

test("renders search input", async () => {
  render(<Home />);
  expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
});
