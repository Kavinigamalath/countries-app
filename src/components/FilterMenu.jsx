import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

/**
 * FilterMenu – glassy gradient dropdown with:
 *  • Rounded corners throughout
 *  • Linear‑gradient backdrop (blue → indigo)
 *  • MUI icons
 *  • Creative back button
 *  • Auto‑reset to “All” on mouse leave
 */
export default function FilterMenu({ label, options, selected, onSelect }) {
  const boxRef = useRef(null);

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
      ref={boxRef}
      className="mb-6 rounded-2xl p-4 bg-gradient-to-r from-blue-200/70 via-blue-100/70 to-indigo-100/70 backdrop-blur-lg shadow-lg"
    >
      {/* Header row with icon + label + back btn */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-800 font-semibold">
          <FilterListIcon className="text-blue-600" />
          <span>{label}</span>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1 px-3 py-1.5 bg-white/70 hover:bg-white text-blue-600 rounded-full shadow transition-all group"
        >
          <ArrowBackIosNewIcon className="-ml-1 group-hover:-translate-x-0.5 transition-transform" fontSize="small" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* Select */}
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full mt-2 p-2 bg-white/60 focus:bg-white/90 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Empty‑state if options empty */}
      {options.length === 0 && (
        <p className="mt-4 flex items-center gap-2 text-sm text-gray-700 justify-center">
          <span>No options available</span>
        </p>
      )}
    </div>
  );
}
