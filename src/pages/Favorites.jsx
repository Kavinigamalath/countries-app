import React, { useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getAll } from "../api/restCountries";
import CountryCard from "../components/CountryCard";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const { data: countries, loading, error } = useFetch(getAll);

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error loading data</p>;

  // Filter favorites safely
  const favs = (countries || []).filter(c => user.favorites.includes(c.cca3));

  return (
    <div>
      {/* Back button */}
      <Link
        to="/"
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      {favs.length === 0 ? (
        <p className="text-center mt-10">You have no favorite countries yet.</p>
      ) : (
        <>
          <h2 className="text-2xl mb-4">Your Favorites</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favs.map(c => (
              <CountryCard key={c.cca3} country={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
