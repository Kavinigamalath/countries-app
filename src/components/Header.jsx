import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">🌍 Countries</Link>
        <div>
         {user ? (
            <>
              <span className="mr-4">Hello, {user.name}</span>
              <Link to="/favorites" className="mr-4">Favorites</Link>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <button
             onClick={() => navigate("/login")}
             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
