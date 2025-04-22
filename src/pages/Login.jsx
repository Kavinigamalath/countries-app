// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    if (login(username, password)) {
      navigate("/");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-900 to-white-800 flex items-center justify-center p-4">
      {/* Glass card */}
      <div className="max-w-md w-full bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        {/* Header with logo or icon */}
        <div className="py-6 flex justify-center bg-white bg-opacity-10">
          {/* Replace svg with your logo as needed */}
          <svg
            className="h-12 w-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0 1.657-1.343 3-3 3S6 12.657 6 11s1.343-3 3-3 3 1.343 3 3z
                 M19 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z
                 M12 21v-2
                 M12 6V4
                 M4.22 4.22l1.42 1.42
                 M18.36 18.36l1.42 1.42
                 M4.22 19.78l1.42-1.42
                 M18.36 5.64l1.42-1.42"
            />
          </svg>
        </div>

        <div className="p-8">
          {/* Title */}
          <h2 className="text-center text-3xl font-extrabold text-blue-600 mb-4">
            Log In
          </h2>

          {/* Error */}
          {error && (
            <div className="bg-red-600 bg-opacity-30 text-red-100 text-center py-2 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-blue-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => {
                  setError("");
                  setUsername(e.target.value);
                }}
                className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-blue-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => {
                  setError("");
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:from-blue-900 hover:to-blue-600 transition"
            >
              Log In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-blue-500 underline hover:text-blue-900"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
