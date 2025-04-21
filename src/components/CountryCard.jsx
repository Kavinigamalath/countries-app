import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  const { cca3, flags, name, population, region, capital } = country;
  return (
    <Link to={`/country/${cca3}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
        <img src={flags.svg} alt={`${name.common} flag`} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="font-bold mb-2">{name.common}</h2>
          <p><strong>Population:</strong> {population.toLocaleString()}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Capital:</strong> {capital?.[0] || "—"}</p>
        </div>
      </div>
    </Link>
  );
}
