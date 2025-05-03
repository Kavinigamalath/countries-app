// src/pages/Login.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

// Login component for handling user authentication
export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      await login();
      navigate("/");
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden p-6">
      
      {/* Glassmorphic Login Card */}
      <div className="z-10 bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl max-w-md w-full px-10 py-12 text-center space-y-6">

        {/* App Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg text-3xl font-bold">
          🌐
        </div>

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-blue-800">Country Explorer</h1>
        <p className="text-center text-gray-700 text-lg font-light leading-relaxed tracking-wide">
          <span className="block text-xl font-semibold text-blue-700 mb-2">
            ...Discover the world...
          </span>
          <span className="block">
            Find your favorite countries.
          </span>
          <span className="block">
            All in one place.
          </span>
        </p>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white text-lg font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md"
        >
          <GoogleIcon fontSize="medium" />
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-600 pt-4">
          By signing in, you agree to our&nbsp;<br></br>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">Terms of Service</a>&nbsp;and&nbsp;
          <a href="#" className="text-blue-700 underline hover:text-blue-900">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}