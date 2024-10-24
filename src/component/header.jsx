import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Online File <span className="text-purple-500">Converter</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className="hover:text-blue-600 transition duration-300">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 transition duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Sign Up Button for Desktop */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="#login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="#signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Icon for Mobile Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Menu (Visible only when menu is open) */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden fixed top-0 left-0 w-3/4 h-full bg-white shadow-md transition-transform duration-300 z-40`}
      >
        <nav className="flex flex-col items-start space-y-6 p-6 mt-10">
          <Link to="/" className="hover:text-blue-600" onClick={toggleMenu}>
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            to="#login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
            onClick={toggleMenu}
          >
            Log In
          </Link>
          <Link
            to="#signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};

export default Header;
