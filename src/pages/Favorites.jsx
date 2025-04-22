import React, { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { getAll } from "../api/restCountries";
import CountryCard from "../components/CountryCard";

// MUI Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const { data: countries, loading, error } = useFetch(getAll);

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <p className="text-center py-20">Loading…</p>;
  if (error)   return <p className="text-center py-20">Error loading data</p>;

  const favs = (countries || []).filter(c => user.favorites.includes(c.cca3));

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 p-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 text-blue-700 font-medium border border-blue-300 rounded-full bg-white/70 hover:bg-white/90 transition group focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <ArrowBackIosNewIcon
            fontSize="small"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Back to Explorer</span>
        </Link>

        {favs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FavoriteBorderIcon className="text-blue-400" style={{ fontSize: 60 }} />
            <p className="mt-4 text-xl font-semibold text-gray-700 text-center">
              You haven’t added any favorites yet
            </p>
            <p className="text-gray-500 text-center mt-1">
              Browse countries and tap&nbsp;
              <span className="text-red-500 font-bold">★</span> to save them here.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6" align="center">Your Favorites</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favs.map(c => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}