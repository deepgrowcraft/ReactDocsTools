import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email is not valid.";
    }

    // Password Validation
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch("http://192.168.1.44:8000/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          localStorage.setItem("user_fullname", data.user_fullname);
          localStorage.setItem("user_email", data.user_email);

          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
            navigate("/");
          }, 1000);
        } else {
          const errorData = await response.json();
          setApiError(
            errorData.error || "An error occurred. Please try again."
          );
        }
      } catch (error) {
        setApiError("Unable to connect to the server.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Clear field-specific error
    setApiError(""); // Clear API error
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 md:flex-row bg-gradient-to-r from-blue-50 to-purple-50">
      {successPopup && (
        <div className="absolute z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-green-500">
              Login Successful!
            </h2>
            <p className="mb-4 text-gray-700">
              You will be redirected to the home page shortly.
            </p>
            <div className="flex items-center justify-center w-6 h-6 mx-auto border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <div className="w-full p-8 bg-white rounded-lg shadow-lg md:w-1/2">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Log In to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm font-semibold text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* API Error */}
          {apiError && (
            <p className="mb-4 text-sm text-center text-red-500">{apiError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md ${
              loading ? "cursor-not-allowed bg-blue-300" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Sign Up Option */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-blue-500 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="home/signupsideimage.svg"
          alt="Log In"
          className="mb-2 w-18"
        />
      </div>
    </div>
  );
};

export default Login;
