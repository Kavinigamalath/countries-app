import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import ExploreIcon from "@mui/icons-material/Explore";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import LanguageIcon from "@mui/icons-material/Language";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await login();
      navigate("/");
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl w-full bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Info + Visual */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:flex flex-col justify-between bg-blue-600 text-white p-10"
        >
          <div className="space-y-4">
            <div className="text-5xl font-bold flex items-center gap-3">
              <ExploreIcon fontSize="inherit" />
              Country Explorer
            </div>
            <p className="text-lg opacity-90">
              Discover, learn, and save your favorite places across the globe.
            </p>
          </div>

          <div className="space-y-4 mt-10">
            <p className="flex items-center gap-3 text-lg">
              <LanguageIcon /> Learn about diverse languages.
            </p>
            <p className="flex items-center gap-3 text-lg">
              <EmojiFlagsIcon /> Explore cultures and flags.
            </p>
            <p className="flex items-center gap-3 text-lg">
              <GoogleIcon /> Save favorites with Google.
            </p>
          </div>

          <p className="mt-10 text-sm italic text-center opacity-70">
            "The world is a book, and those who do not travel read only one page."
          </p>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center px-8 sm:px-12 py-16 space-y-8"
        >
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl shadow-xl animate-bounce-slow">
            🌐
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center">
            Welcome to Country Explorer
          </h1>
          <p className="text-center text-gray-600 text-base max-w-xs">
            Sign in with Google to personalize your journey
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white text-lg font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md"
          >
            <GoogleIcon fontSize="medium" />
            Sign in with Google
          </button>

          <p className="text-sm text-gray-500 pt-4 text-center max-w-xs">
            By signing in, you agree to our&nbsp;
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
