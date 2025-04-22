import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("countriesAppUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("countriesAppUser", JSON.stringify(user));
  }, [user]);

  const login = (username, password) => {
    // In a real app, you’d call your backend here.
    if (username && password) {
      setUser({ name: username, favorites: [] });
      return true;
    }
    return false;
  };
  

  const addFavorite = (code) => {
    if (user && !user.favorites.includes(code)) {
      setUser({ ...user, favorites: [...user.favorites, code] });
    }
  };

  const removeFavorite = (code) => {
    if (user) {
      setUser({
        ...user,
        favorites: user.favorites.filter(c => c !== code),
      });
    }
  };
  
  const logout = () => setUser(null);



  return (
    <AuthContext.Provider value={{ user, login, logout, addFavorite, removeFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}


// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("countriesAppUser");
//     return saved ? JSON.parse(saved) : null;
//   });

//   useEffect(() => {
//     localStorage.setItem("countriesAppUser", JSON.stringify(user));
//   }, [user]);

//   const login = (username) => setUser({ name: username });
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
