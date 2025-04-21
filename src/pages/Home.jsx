import React, { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { getAll } from "../api/restCountries";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import FilterMenu from "../components/FilterMenu";

export default function Home() {
  const { data: countries, loading, error } = useFetch(getAll);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");

  const regions = useMemo(
    () => Array.from(new Set(countries?.map(c => c.region).filter(Boolean))), [countries]
  );
  const languages = useMemo(() => {
    const langs = new Set();
    countries?.forEach(c => {
      Object.values(c.languages || {}).forEach(l => langs.add(l));
    });
    return Array.from(langs);
  }, [countries]);

  const filtered = useMemo(() => {
    if (!countries) return [];
    return countries.filter(c => {
      const matchName = c.name.common.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region ? c.region === region : true;
      const matchLang = language
        ? Object.values(c.languages || {}).includes(language)
        : true;
      return matchName && matchRegion && matchLang;
    });
  }, [countries, search, region, language]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterMenu label="Filter by Region" options={regions} selected={region} onSelect={setRegion} />
        <FilterMenu label="Filter by Language" options={languages} selected={language} onSelect={setLanguage} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <CountryCard key={c.cca3} country={c} />
        ))}
      </div>
    </>
  );
}
