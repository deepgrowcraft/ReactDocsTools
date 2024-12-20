import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    setError(""); // Clear errors
    setSuccessMessage(""); // Clear success message
    setLoading(true); // Show loader

    try {
      const response = await fetch(`${API_URL}/forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage(
          "A password reset link has been sent to your email address."
        );
        setEmail(""); // Clear the input field
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="mb-4 text-sm text-center text-gray-600">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccessMessage("");
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                error ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex items-center justify-center mb-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="mb-4 text-sm text-center text-green-500">
              {successMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md ${
              loading ? "cursor-not-allowed bg-blue-300" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Remembered your password?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-500 hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
