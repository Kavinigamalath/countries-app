import React, { useEffect, useRef } from "react"; 
import { Link } from "react-router-dom"; // Import Link component for in-app navigation
import FilterListIcon from "@mui/icons-material/FilterList"; 
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; 


export default function FilterMenu({ label, options, selected, onSelect }) { // Define FilterMenu component receiving props
  const boxRef = useRef(null); // Create a ref to attach to the dropdown container

  // Reset when pointer leaves the whole box
  useEffect(() => {
    const box = boxRef.current; 
    if (!box) return; 
    const handleLeave = () => onSelect(""); 
    box.addEventListener("mouseleave", handleLeave); 
    return () => box.removeEventListener("mouseleave", handleLeave); 
  }, [onSelect]); 

  return (
    <div
      ref={boxRef} // Attach ref to this container for mouse events
      className="mb-6 rounded-2xl p-4 bg-gradient-to-r from-blue-200/70 via-blue-100/70 to-indigo-100/70 backdrop-blur-lg shadow-lg" // Tailwind classes for margin, rounding, padding, gradient, blur, and shadow
    >
      {/* Header row with icon + label + back button */}
      <div className="flex items-center justify-between mb-3"> 
        <div className="flex items-center gap-2 text-gray-800 font-semibold"> 
          <FilterListIcon className="text-blue-600" /> 
          <span>{label}</span> 
        </div>
        <Link
          to="/" // Navigate back to home when clicked
          className="flex items-center gap-1 px-3 py-1.5 bg-white/70 hover:bg-white text-blue-600 rounded-full shadow transition-all group" // Tailwind styles for back button
        >
          <ArrowBackIosNewIcon className="-ml-1 group-hover:-translate-x-0.5 transition-transform" fontSize="small" /> {/* Back arrow icon with hover transform */}
          <span className="text-sm font-medium">Back</span> {/* Label for back button */}
        </Link>
      </div>

      {/* Dropdown select input */}
      <select
        value={selected} 
        onChange={(e) => onSelect(e.target.value)} 
        className="w-full mt-2 p-2 bg-white/60 focus:bg-white/90 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition" // Tailwind styles for select appearance and focus
      >
        <option value="">All</option> {/* Default option representing no filter */}
        {options.map((opt) => (
          <option key={opt} value={opt}> {/* Render each option dynamically */}
            {opt} {/* Display option text */}
          </option>
        ))}
      </select>

      {/* Show empty state when no options available */}
      {options.length === 0 && ( 
        <p className="mt-4 flex items-center gap-2 text-sm text-gray-700 justify-center"> 
          <span>No options available</span> 
        </p>
      )}
    </div>
  ); 
} 