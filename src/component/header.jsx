import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import AllTools from "./AllTools";
import { useAuth } from "./AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isVisible, setIsVisible] = useState(true); // For sticky header
  const [lastScrollY, setLastScrollY] = useState(0); // Track scroll direction
  const [showMegaMenu, setShowMegaMenu] = useState(false); // Mega menu toggle
  const megaMenuRef = useRef(null); // Ref for the mega menu container
  const { isLoggedIn } = useAuth();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        setShowMegaMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-blue-600"
        >
          <img src="/logo.svg" alt="Logo" className="h-10 w-18" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 text-lg md:flex">
          <div
            className="relative group"
            onMouseEnter={() => {
              clearTimeout(window.dropdownTimer);
              setShowMegaMenu(true);
            }}
            onMouseLeave={() => {
              window.dropdownTimer = setTimeout(
                () => setShowMegaMenu(false),
                30000
              );
            }}
          >
            <button className="text-lg text-gray-700 hover:text-blue-600">
              <Link
                to="/tools"
                className="transition duration-300 hover:text-blue-600"
              >
                All Tools
              </Link>
            </button>
          </div>
          <Link
            to="/MergePdfScreen"
            className="transition duration-300 hover:text-blue-600"
          >
            Merge PDF
          </Link>
          <Link
            to="/SplitPdfScreen"
            className="transition duration-300 hover:text-blue-600"
          >
            Split PDF
          </Link>
          <Link
            to="/CompressPdfScreen"
            className="transition duration-300 hover:text-blue-600"
          >
            Compress PDF
          </Link>
          <Link
            to="/PdfToWordScreen"
            className="transition duration-300 hover:text-blue-600"
          >
            Convert PDF
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden space-x-4 md:flex">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/Login"
                className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Log In
              </Link>
              <Link
                to="/Signup"
                className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon for Mobile Menu */}
        <button
          onClick={toggleMenu}
          className="text-2xl md:hidden focus:outline-none"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mega Menu */}
      {showMegaMenu && (
        <div
          ref={megaMenuRef}
          className="absolute left-0 z-50 w-full bg-white shadow-lg"
          onMouseEnter={() => setShowMegaMenu(true)}
          onMouseLeave={() => setShowMegaMenu(false)}
        >
          <AllTools />
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>
      )}

      {/* mobile view */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-xl transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="container flex items-center justify-between px-4 py-4 mx-auto md:px-0">
          <Link to="/" onClick={toggleMenu}>
            <img src="/logo.svg" alt="Website Logo" className="h-10 w-18" />
          </Link>
        </div>

        <nav className="flex flex-col items-start p-6 space-y-6 bg-white">
          <Link
            to="/MergePdfScreen"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Merge PDF
          </Link>
          <Link
            to="/SplitPdfScreen"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Split PDF
          </Link>
          <Link
            to="/CompressPdfScreen"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Compress PDF
          </Link>
          <Link
            to="/PdfToWordScreen"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Convert PDF
          </Link>
          <Link
            to="/tools"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Tools
          </Link>

          {isLoggedIn ? (
            <Link
              to="/profile"
              className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={toggleMenu}
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/Login"
                className="w-auto px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={toggleMenu}
              >
                Log In
              </Link>
              <Link
                to="/Signup"
                className="w-auto px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
