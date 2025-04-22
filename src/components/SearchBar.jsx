import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name…"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
}
