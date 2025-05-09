import React, { useContext } from "react";                                    
import { useParams, Link } from "react-router-dom";                          
import useFetch from "../hooks/useFetch";                                      
import { getByCode } from "../api/restCountries";                              
import { AuthContext } from "../contexts/AuthContext";                        

// MUI Icons for various stats and actions
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";          
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";                      
import PublicIcon from "@mui/icons-material/Public";                            
import ExploreIcon from "@mui/icons-material/Explore";                          
import LocationCityIcon from "@mui/icons-material/LocationCity";                
import LanguageIcon from "@mui/icons-material/Language";                        
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";                  
import AccessTimeIcon from "@mui/icons-material/AccessTime";                    
import MapIcon from "@mui/icons-material/Map";                                  
import FlagIcon from "@mui/icons-material/Flag";                                
import BorderAllIcon from "@mui/icons-material/BorderAll";
import { getAll } from "../api/restCountries";


// Main component for displaying country details
export default function CountryDetail() {
  const { code } = useParams();                                                
  const { data, loading, error } = useFetch(getByCode, code);                  
  const { user, addFavorite, removeFavorite } = useContext(AuthContext); 
  const { data: allCountries } = useFetch(getAll);       

  // Show loading state while fetching
  if (loading) return <p className="text-center text-lg py-20">Loading…</p>;
  // Show error if fetch fails or no country found
  if (error || !data?.[0]) return <p className="text-center text-lg py-20">Country not found</p>;

  const country = data[0];                                                      
  const isFav = user?.favorites.includes(code);                              

  // Destructure required fields for display
  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    timezones,
    area,
    independent,
    borders,
    latlng,
  } = country;

  const codeToName = {};
  allCountries?.forEach(c => {
    codeToName[c.cca3] = c.name.common;
  });

  return (
    <div className="min-h-screen bg-white/60 backdrop-blur-lg font-sans rounded-lg shrink-0">
      {/* Top navigation bar */}
      <header className="bg-blue-500 text-white shadow-md sticky top-0 z-10 rounded-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          {/* Link back to home */}
          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 text-sm sm:text-base font-medium focus:ring-2 focus:ring-white focus:outline-none transition"
          >
            <ArrowBackIosNewIcon className="!h-4 !w-4 -ml-1 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Explorer</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
            Country Information
          </h1>
        </div>
      </header>

      {/* Main content grid: flag/meta on left, stats on right */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-2 gap-10">
        {/* Left section: flag and basic meta */}
        <section className="space-y-8 animate-fade-in">
          {/* Flag display */}
          <div className="w-full aspect-video bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <img
              src={flags.svg}                                 // SVG URL of flag
              alt={`${name.common} flag`}                     // Accessible alt text
              className="w-full h-full object-cover"
            />
          </div>

          {/* Country name and official name */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">
              {name.common}                                   {/* Display common name */}
            </h2>
            <p className="text-gray-500 text-lg italic">
              {name.official}                                {/* Display official name */}
            </p>
          </div>

          {/* Favorite toggle button, shown only if user logged in */}
          {user && (
            <button
              onClick={() => (isFav ? removeFavorite(code) : addFavorite(code))} 
              className={`w-full py-3 rounded-lg text-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition
                ${
                  isFav
                    ? "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300" 
                    : "bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-300" 
                }`}
            >
              {isFav ? "★ Remove from Favorites" : "☆ Add to Favorites"}         {/* Button label */}
            </button>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latlng?.[0]},${latlng?.[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full block text-center py-3 rounded-lg text-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition
              bg-green-500 hover:bg-green-600 text-white focus:ring-green-300`}
          >
            View on Map
          </a>
        </section>

        {/* Right section: detailed stats */}
        <section className="space-y-6 animate-slide-up">

          {/* Each StatItem displays an icon, label, and value */}
          <StatItem icon={<PeopleAltIcon />} label="Population" value={population.toLocaleString()} />
          <StatItem icon={<PublicIcon />} label="Region" value={region} />
          <StatItem icon={<ExploreIcon />} label="Subregion" value={subregion || "—"} />
          <StatItem icon={<LocationCityIcon />} label="Capital" value={capital?.[0] || "—"} />
          <StatItem
            icon={<LanguageIcon />}
            label="Languages"
            // Join language names into a single string, or show "—" if none
            value={Object.values(languages || {}).join(", ") || "—"}
          />

          {/* Currencies: map over currency objects to get name and symbol */}
          <StatItem
            icon={<AttachMoneyIcon />}
            label="Currencies"
            value={
              Object.values(currencies || {})
                .map(c => `${c.name} (${c.symbol})`)
                .join(", ") || "—"
            }
          />

          {/* Timezones, area, independence status, and borders */}
          <StatItem icon={<AccessTimeIcon />} label="Timezones" value={timezones?.join(", ") || "—"} />
          <StatItem icon={<MapIcon />} label="Area" value={`${area?.toLocaleString()} km²`} />
          <StatItem icon={<FlagIcon />} label="Independent" value={independent ? "Yes" : "No"} />
          <StatItem
            icon={<BorderAllIcon />}
            label="Borders"
            value={
              borders?.length ? (
                <span className="flex flex-wrap gap-2">
                  {borders.map((code, i) => (
                    <span key={code}>
                      <Link
                        to={`/country/${code}`}
                        className="text-black-600 hover:underline font-medium"
                      >
                        {codeToName[code] || code}
                      </Link>
                      {i < borders.length - 1 && <span>,</span>}
                    </span>
                  ))}
                </span>
              ) : (
                "None"
              )
            }
          />

        </section>
      </main>
    </div>
  );
}


// StatItem subcomponent renders individual statistic rows
function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 group">
      {/* Icon with hover rotation */}
      <span className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0 transform transition-transform duration-300 group-hover:rotate-45">
        {icon}
      </span>
      {/* Label and value */}
      <div className="flex-1 border-b border-gray-100 pb-3">
        <p className="uppercase text-xs tracking-wide text-gray-500 font-semibold mb-0.5">
          {label}
        </p>
        <p className="text-lg font-medium text-gray-800 break-words leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}
