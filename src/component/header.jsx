import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scrolling to hide/show header
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full bg-white shadow-md fixed top-0 left-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container flex items-center justify-between px-4 py-4 mx-auto md:px-0">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          <img src="/logo.svg" alt="Logo" className="h-10 mb-1 w-18" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 text-lg md:flex">
          <Link to="/" className="transition duration-300 hover:text-blue-600">
            Home
          </Link>
          <Link
            to="/about"
            className="transition duration-300 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="transition duration-300 hover:text-blue-600"
          >
            Contact
          </Link>
        </nav>

        {/* Sign Up Button for Desktop */}
        <div className="hidden space-x-4 md:flex">
          <Link
            to="#login"
            className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Log In
          </Link>
          <Link
            to="#signup"
            className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Icon for Mobile Menu */}
        <button
          onClick={toggleMenu}
          className="text-2xl md:hidden focus:outline-none"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden fixed top-0 left-0 w-3/4 h-full bg-white shadow-md transition-transform duration-300 z-40`}
      >
        <nav className="flex flex-col items-start p-6 mt-10 space-y-6 bg-white">
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
            className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={toggleMenu}
          >
            Log In
          </Link>
          <Link
            to="#signup"
            className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};

export default Header;
