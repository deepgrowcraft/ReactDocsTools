import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    reenterpassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    // Full Name Validation
    if (!formData.fullname.trim()) {
      errors.fullname = "Full Name is required.";
    } else if (formData.fullname.length < 3) {
      errors.fullname = "Full Name must be at least 3 characters.";
    } else if (formData.fullname.length > 50) {
      errors.fullname = "Full Name must be less than 50 characters.";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email is not valid.";
    } else if (formData.email.length > 100) {
      errors.email = "Email must be less than 100 characters.";
    }

    // Password Validation
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (formData.password.length > 50) {
      errors.password = "Password must be less than 50 characters.";
    }

    // Re-enter Password Validation
    if (formData.reenterpassword !== formData.password) {
      errors.reenterpassword = "Passwords do not match.";
    }

    // Terms and Conditions Validation
    if (!formData.terms) {
      errors.terms = "You must agree to the Terms and Conditions.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
            navigate("/login");
          }, 3000);
          setFormData({
            fullname: "",
            email: "",
            password: "",
            reenterpassword: "",
            terms: false,
          });
          setErrors({});
        } else {
          const errorData = await response.json();
          setErrors(errorData);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.error(error);
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
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 md:flex-row bg-gradient-to-r from-blue-50 to-purple-50">
      {successPopup && (
        <div className="absolute z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-green-500">
              Signup Successful!
            </h2>
            <p className="mb-4 text-gray-700">
              You will be redirected to the login page shortly.
            </p>
            <div className="flex items-center justify-center w-6 h-6 mx-auto border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Left Side: Form */}
      <div className="w-full p-8 bg-white rounded-lg shadow-lg md:w-1/2">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.fullname ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.fullname && (
              <p className="mt-1 text-sm text-red-500">{errors.fullname}</p>
            )}
          </div>

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

          {/* Re-enter Password */}
          <div className="mb-4">
            <label
              htmlFor="reenterpassword"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              id="reenterpassword"
              placeholder="Re-enter your password"
              value={formData.reenterpassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.reenterpassword
                  ? "border-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.reenterpassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.reenterpassword}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a
                href="/TermsAndConditions"
                className="text-blue-500 hover:underline"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="mb-4 text-sm text-red-500">{errors.terms}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md ${
              loading ? "cursor-not-allowed bg-blue-300" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="home/signupsideimage.svg"
          alt="Sign Up"
          className="mb-2 w-18"
        />
      </div>
    </div>
  );
};

export default Signup;
