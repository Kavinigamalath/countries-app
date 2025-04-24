import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";

export default function App() {
  return (
    // Wraps the entire app in authentication context, providing
    // user info, login/logout functions, and favorites state
    <AuthProvider>
      {/* Flex column to allow header, main content, and footer layout */}
      <div className="min-h-screen flex flex-col">
        {/* Site header / navigation bar */}
        <Header />

        {/* 
          Main content area grows to fill available space.
          Container centers content and adds horizontal padding (p-4).
        */}
        <main className="flex-grow container mx-auto p-4">
          {/* Client-side routing */}
          <Routes>
            {/* Public login page */}
            <Route path="/login" element={<Login />} />

            {/* Protected or user‐specific favorites page */}
            <Route path="/favorites" element={<Favorites />} />

            {/* Home page listing all countries */}
            <Route path="/" element={<Home />} />

            {/* Dynamic route for individual country details */}
            <Route path="/country/:code" element={<CountryDetail />} />

            {/*
              Catch-all route: any unknown path redirects back to home.
              `replace` ensures this redirect replaces history entry.
            */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
    
        {/* Site footer displayed on every page */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
