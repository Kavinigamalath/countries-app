import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">🌍 Countries</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Hello, {user.name}</span>
              <button onClick={logout} className="btn">Logout</button>
            </>
          ) : (
            <button onClick={() => login("Student")} className="btn">Login</button>
          )}
        </div>
      </div>
    </header>
  );
}
