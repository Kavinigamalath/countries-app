// src/contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";

// Firebase imports for authentication and Firestore database
import { auth, db, provider } from "../firebase";

// Firebase imports for authentication and Firestore database
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";

// Firestore imports for document operations
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

// Create a context for authentication
export const AuthContext = createContext(null);

// AuthProvider component to manage authentication state and actions
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Load user favorites from Firestore
  const loadFavorites = async (uid) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data().favorites || [];
    } else {
      await setDoc(ref, { favorites: [] });
      return [];
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const favorites = await loadFavorites(firebaseUser.uid);
        // Set user state with uid, displayName, and favorites
        setUser({ uid: firebaseUser.uid, name: firebaseUser.displayName, favorites });
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  // Login and logout functions using Firebase authentication
  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  // Add and remove favorites in Firestore
  const addFavorite = async (code) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, { favorites: arrayUnion(code) });
    setUser((u) => ({ ...u, favorites: [...u.favorites, code] }));
  };

  // Remove favorite from Firestore and update user state
  const removeFavorite = async (code) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, { favorites: arrayRemove(code) });
    setUser((u) => ({
      ...u,
      favorites: u.favorites.filter((c) => c !== code),
    }));
  };

  // Delete user account and associated Firestore data
  const deleteAccount = async () => {
    if (!auth.currentUser) throw new Error("User not logged in");
    try {
      await reauthenticateWithPopup(auth.currentUser, provider); // Ask Google login again
      const uid = auth.currentUser.uid;
      await deleteDoc(doc(db, "users", uid));                    // Delete Firestore data
      await deleteUser(auth.currentUser);                        // Delete Firebase Auth user
      setUser(null);
    } catch (err) {
      console.error("Account deletion failed:", err);
      throw err;
    }
  };

  // Provide user state and functions to children components
  return (

    // AuthContext.Provider to share authentication state and functions
    <AuthContext.Provider value={{ user, login, logout, addFavorite, removeFavorite,loadingUser,deleteAccount  }}>

      {/* Render children components */}
      {children}
  
    </AuthContext.Provider>
  );
}
