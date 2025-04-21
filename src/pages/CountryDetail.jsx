import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getByCode } from "../api/restCountries";
import { AuthContext } from "../contexts/AuthContext";

export default function CountryDetail() {
  const { code } = useParams();
  const { data, loading, error } = useFetch(getByCode, code);
  const { user, addFavorite, removeFavorite } = useContext(AuthContext);

  if (loading) return <p>Loading…</p>;
  if (error || !data?.[0]) return <p>Country not found</p>;

  const country = data[0];
  const isFav = user?.favorites.includes(code);
  const { flags, name, population, region, subregion, capital, languages, currencies } = country;

  return (
    <div>
      <Link to="/" className="inline-block mb-4 text-blue-600">← Back</Link>
      <div className="flex flex-col lg:flex-row gap-8">
        <img src={flags.svg} alt={`${name.common} flag`} className="w-full lg:w-1/2 h-auto rounded" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{name.common}</h1>
          <p><strong>Official:</strong> {name.official}</p>
          <p><strong>Population:</strong> {population.toLocaleString()}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Subregion:</strong> {subregion}</p>
          <p><strong>Capital:</strong> {capital?.[0]}</p>
          <p><strong>Languages:</strong> {Object.values(languages || {}).join(", ")}</p>
          <p>
            <strong>Currencies:</strong>{" "}
            {Object.values(currencies || {}).map(c => `${c.name} (${c.symbol})`).join(", ")}
          </p>
          {user && (
            <button
                onClick={() => isFav ? removeFavorite(code) : addFavorite(code)}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                {isFav ? "Remove from Favorites" : "Add to Favorites"}
            </button>

          )}
        </div>
      </div>
    </div>
  );
}
