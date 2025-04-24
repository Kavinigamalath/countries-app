import axios from "axios"; // HTTP client for making API requests

// Create a configured axios instance
const api = axios.create({
  baseURL: "https://restcountries.com/v3.1", // Base URL for the REST Countries v3.1 API
  timeout: 10000,                             // 10-second timeout for all requests
});

// Fetch all countries data
export const getAll = () => 
  api.get("/all"); // GET https://restcountries.com/v3.1/all

// Fetch countries matching a given name (partial or full)
export const getByName = (name) => 
  api.get(`/name/${name}`); // GET https://restcountries.com/v3.1/name/{name}

// Fetch countries in a specific region (e.g., "Asia", "Europe")
export const getByRegion = (region) => 
  api.get(`/region/${region}`); // GET https://restcountries.com/v3.1/region/{region}

// Fetch a single country by its ISO 3166-1 alpha-3 code (e.g., "USA")
export const getByCode = (code) => 
  api.get(`/alpha/${code}`); // GET https://restcountries.com/v3.1/alpha/{code}
