import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { logout, hasSubscription, fetchUserProfile } = useAuth(); // Fetch logout and subscription details

  const fullname =
    localStorage.getItem("user_fullname") ||
    sessionStorage.getItem("user_fullname");
  const email =
    localStorage.getItem("user_email") || sessionStorage.getItem("user_email");

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUserProfile();
    };
    fetchProfile();
  }, [fetchUserProfile]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const refreshToken =
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken");
    if (!refreshToken) {
      setError("No refresh token found. Please log in again.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/delete-account/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("accessToken") ||
            sessionStorage.getItem("accessToken")
          }`,
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Account deleted successfully. Redirecting...");
        setTimeout(() => {
          handleLogout(); // Log out the user after successful deletion
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Profile
        </h2>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Full Name</p>
          <p className="text-gray-600">{fullname || "Not Available"}</p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Email</p>
          <p className="text-gray-600">{email || "Not Available"}</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700">
            Subscription Status
          </p>
          <p
            className={`text-gray-600 font-bold ${
              hasSubscription ? "text-green-500" : "text-red-500"
            }`}
          >
            {hasSubscription ? "Active" : "Not Subscribed"}
          </p>
        </div>

        {error && (
          <p className="mb-4 text-sm font-semibold text-center text-red-500">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="mb-4 text-sm font-semibold text-center text-green-500">
            {successMessage}
          </p>
        )}

        <button
          onClick={handleLogout}
          className="w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
        >
          Logout
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className={`w-full mt-4 py-2 font-semibold text-white transition duration-300 bg-red-500 rounded-lg shadow-md ${
            loading ? "cursor-not-allowed bg-red-300" : "hover:bg-red-600"
          }`}
        >
          {loading ? "Deleting Account..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
