import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
});

export const getAll = () => api.get("/all");
export const getByName = (name) => api.get(`/name/${name}`);
export const getByRegion = (region) => api.get(`/region/${region}`);
export const getByCode = (code) => api.get(`/alpha/${code}`);
