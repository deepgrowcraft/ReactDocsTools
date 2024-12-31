import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

  // Fetch user profile from the backend to update subscription and login state
  const fetchUserProfile = async () => {
    try {
      const accessToken =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");

      if (!accessToken) {
        setIsLoggedIn(false);
        setHasSubscription(false);
        return;
      }

      const response = await axios.get(`${API_URL}/user-profile/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { has_active_subscription } = response.data;

      setIsLoggedIn(true);
      setHasSubscription(has_active_subscription);
      localStorage.setItem("has_active_subscription", has_active_subscription);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setIsLoggedIn(false);
      setHasSubscription(false);
    }
  };

  // Clear user data on logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("has_active_subscription");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("has_active_subscription");
    setIsLoggedIn(false);
    setHasSubscription(false);
  };

  // Initialize user state on app load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        hasSubscription,
        fetchUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
