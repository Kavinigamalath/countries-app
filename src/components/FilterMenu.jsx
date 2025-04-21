import React from "react";

export default function FilterMenu({ label, options, selected, onSelect }) {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <select
        value={selected}
        onChange={e => onSelect(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="">All</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}