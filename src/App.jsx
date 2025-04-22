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
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
    
         {/* FOOTER */}
         <Footer />
       
      </div>
    </AuthProvider>
  );
}
