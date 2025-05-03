import React, { useContext } from "react";                             
import { Navigate, Link } from "react-router-dom";                     
import { AuthContext } from "../contexts/AuthContext";                 
import useFetch from "../hooks/useFetch";                              
import { getAll } from "../api/restCountries";                         
import CountryCard from "../components/CountryCard";                   

// MUI Icons for UI feedback
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";  
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";    


// Favorites component for displaying user's favorite countries
export default function Favorites() {
  const { user, loadingUser } = useContext(AuthContext);                       
  const { data: countries, loading, error } = useFetch(getAll);        

  if (loadingUser) return <p className="text-center py-20">Checking session…</p>;    
  // Redirect to login if no user is authenticated
  if (!user) return <Navigate to="/login" replace />;

  // Show loading message while data is being fetched
  if (loading) return <p className="text-center py-20">Loading…</p>;

  // Show error message if fetch fails
  if (error)   return <p className="text-center py-20">Error loading data</p>;

  // Filter only those countries that the user has favorited
  const favs = (countries || []).filter(c => user.favorites.includes(c.cca3));

  return (
    <div className="min-h-screen px-4 py-10">                        {/* Full-height container with padding */}
      <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 p-8">

        {/* Back button to return to main explorer */}
        <Link
          to="/"                                                        
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 text-blue-700 font-medium border border-blue-300 rounded-full bg-white/70 hover:bg-white/90 transition group focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {/* Icon and text for back navigation */}
          <ArrowBackIosNewIcon
            fontSize="small"
            className="transition-transform duration-300 group-hover:-translate-x-1"  
          />
          <span>Back to Explorer</span>
        </Link>

        {/* If no favorites, show empty state */}
        {favs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FavoriteBorderIcon className="text-blue-400" style={{ fontSize: 60 }} />  {/* Large icon */}
            <p className="mt-4 text-xl font-semibold text-gray-700 text-center">
              You haven’t added any favorites yet                        {/* Informative message */}
            </p>
            <p className="text-gray-500 text-center mt-1">
              Browse countries and tap&nbsp;
              <span className="text-red-500 font-bold">★</span> to save them here. {/* Hint on how to favorite */}
            </p>
          </div>
        ) : (
          <>
            {/* Title for favorites section */}
            <h2 className="text-3xl justify-items-center gap-8 font-bold text-gray-800 mb-6" align="center">
              Your Favorites
            </h2>

            {/* Grid of favorite country cards */}
            <div className="grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favs.map(c => (
                <CountryCard key={c.cca3} country={c} />                // Render each favorite country
              ))}
            </div>
          </>
        )}
      </div>
      
    </div>
    
  );
}
