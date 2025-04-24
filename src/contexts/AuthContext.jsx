import React, { createContext, useState, useEffect } from "react"; // Import React, createContext for context API, and hooks

export const AuthContext = createContext(null); // Create a context for authentication with default value null

export function AuthProvider({ children }) { // Define provider component to wrap app and supply auth state
  const [user, setUser] = useState(() => { // Initialize user state from localStorage, lazy initial state
    const saved = localStorage.getItem("countriesAppUser"); // Retrieve saved user JSON string
    return saved ? JSON.parse(saved) : null; // Parse JSON into object or use null if not found
  });

  useEffect(() => { // Side effect: sync user state back to localStorage whenever user changes
    localStorage.setItem("countriesAppUser", JSON.stringify(user)); // Serialize user object to JSON and save
  }, [user]); // Dependency array: run effect on mount and whenever `user` updates

  const login = (username, password) => { // Function to log in a user (stubbed)
    // In a real app, you’d call your backend here.
    if (username && password) { // Basic check: both fields provided
      setUser({ name: username, favorites: [] }); // Set user object with name and empty favorites
      return true; // Indicate login success
    }
    return false; // Indicate login failure
  };

  const addFavorite = (code) => { // Add a country code to the user's favorites
    if (user && !user.favorites.includes(code)) { // Only if user exists and code not already favorited
      setUser({ ...user, favorites: [...user.favorites, code] }); // Append code to favorites array
    }
  };

  const removeFavorite = (code) => { // Remove a country code from user's favorites
    if (user) { // Only if user exists
      setUser({ 
        ...user, 
        favorites: user.favorites.filter(c => c !== code), // Filter out the given code
      });
    }
  };
  
  const logout = () => setUser(null); // Clear the user state to log out

  return (
    <AuthContext.Provider 
      value={{ user, login, logout, addFavorite, removeFavorite }} // Expose state and actions
    >
      {children} {/* Render child components within this provider */}
    </AuthContext.Provider>
  );
}
