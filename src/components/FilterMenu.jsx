import React, { useEffect, useRef } from "react"; // Import React and hooks for side-effects and refs
import { Link } from "react-router-dom"; // Import Link component for in-app navigation
import FilterListIcon from "@mui/icons-material/FilterList"; // Icon for filter representation
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; // Icon for back arrow button

/**
 * FilterMenu – glassy gradient dropdown with:
 *  • Rounded corners throughout
 *  • Linear‑gradient backdrop (blue → indigo)
 *  • MUI icons
 *  • Creative back button
 *  • Auto‑reset to “All” on mouse leave
 */ // JSDoc comment block describing component features
export default function FilterMenu({ label, options, selected, onSelect }) { // Define FilterMenu component receiving props
  const boxRef = useRef(null); // Create a ref to attach to the dropdown container

  // Reset when pointer leaves the whole box
  useEffect(() => {
    const box = boxRef.current; // Get the DOM node from the ref
    if (!box) return; // If ref not yet attached, do nothing
    const handleLeave = () => onSelect(""); // Handler to reset selection to empty (All)
    box.addEventListener("mouseleave", handleLeave); // Add mouseleave listener to reset filter
    return () => box.removeEventListener("mouseleave", handleLeave); // Clean up listener on unmount or deps change
  }, [onSelect]); // Re-run effect if onSelect callback changes

  return (
    <div
      ref={boxRef} // Attach ref to this container for mouse events
      className="mb-6 rounded-2xl p-4 bg-gradient-to-r from-blue-200/70 via-blue-100/70 to-indigo-100/70 backdrop-blur-lg shadow-lg" // Tailwind classes for margin, rounding, padding, gradient, blur, and shadow
    >
      {/* Header row with icon + label + back button */}
      <div className="flex items-center justify-between mb-3"> {/* Flex container for header layout */}
        <div className="flex items-center gap-2 text-gray-800 font-semibold"> {/* Group for icon and label */}
          <FilterListIcon className="text-blue-600" /> {/* Render filter icon with color styling */}
          <span>{label}</span> {/* Display the dynamic label prop */}
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
        value={selected} // Controlled select value from props
        onChange={(e) => onSelect(e.target.value)} // Call onSelect with new value on change
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
      {options.length === 0 && ( // Conditional rendering if options array is empty
        <p className="mt-4 flex items-center gap-2 text-sm text-gray-700 justify-center"> {/* Styles for empty state message */}
          <span>No options available</span> {/* Inform user that there are no options */}
        </p>
      )}
    </div>
  ); // End of JSX return
} // End of FilterMenu component