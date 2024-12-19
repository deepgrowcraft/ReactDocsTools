import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { uidb64, token } = useParams(); // Extract URL parameters
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear any error messages on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Show loader
    try {
      const response = await fetch(
        `http://192.168.1.44:8000/reset-password/${uidb64}/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirm_password: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Your password has been reset successfully!");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                error ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                error ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="mb-4 text-sm text-center text-red-500">{error}</p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="mb-4 text-sm text-center text-green-500">
              {successMessage}
            </p>
          )}

          {/* Loader */}
          {loading && (
            <div className="flex items-center justify-center mb-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md ${
              loading ? "cursor-not-allowed bg-blue-300" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
