// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import AllTools from "./AllTools"; // Import the AllTools component

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [showMegaMenu, setShowMegaMenu] = useState(false);

//   // Toggle the mobile menu
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleMegaMenu = () => {
//     setShowMegaMenu(!showMegaMenu);
//   };

//   // Handle scrolling to hide/show header
//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;

//     // Hide header on scroll down, show on scroll up
//     if (currentScrollY > lastScrollY) {
//       setIsVisible(false);
//     } else {
//       setIsVisible(true);
//     }

//     setLastScrollY(currentScrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`w-full bg-white shadow-md fixed top-0 left-0 z-50 transition-transform duration-300 ${
//         isVisible ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
//       <div className="container flex items-center justify-between px-4 py-4 mx-auto md:px-0">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center text-2xl font-bold text-blue-600"
//         >
//           <img src="/logo.svg" alt="Logo" className="h-10 mb-1 w-18" />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden space-x-8 text-lg md:flex">
//           <div
//             className="relative group"
//             onMouseEnter={() => {
//               clearTimeout(window.dropdownTimer);
//               setShowMegaMenu(true);
//             }}
//             onMouseLeave={() => {
//               window.dropdownTimer = setTimeout(
//                 () => setShowMegaMenu(false),
//                 30000
//               );
//             }}
//           >
//             <button className="text-lg text-gray-700 hover:text-blue-600">
//               All Tools
//             </button>
//             {/* {showMegaMenu && <AllTools />} */}
//           </div>

//           <Link
//             to="/MergePdfScreen"
//             className="transition duration-300 hover:text-blue-600"
//           >
//             Merge PDF
//           </Link>
//           <Link
//             to="/SplitPdfScreen"
//             className="transition duration-300 hover:text-blue-600"
//           >
//             Split PDF
//           </Link>
//           <Link
//             to="/CompressPdfScreen"
//             className="transition duration-300 hover:text-blue-600"
//           >
//             Compress PDF
//           </Link>
//           <Link
//             to="/PdfToWordScreen"
//             className="transition duration-300 hover:text-blue-600"
//           >
//             Convert PDF
//           </Link>
//         </nav>

//         {/* Sign Up Button for Desktop */}
//         <div className="hidden space-x-4 md:flex">
//           <Link
//             to="#login"
//             className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Log In
//           </Link>
//           <Link
//             to="#signup"
//             className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Sign Up
//           </Link>
//         </div>

//         {/* Hamburger Icon for Mobile Menu */}
//         <button
//           onClick={toggleMenu}
//           className="text-2xl md:hidden focus:outline-none"
//         >
//           <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
//         </button>
//       </div>

//       {/* Mega Menu */}
//       {showMegaMenu && (
//         <div
//           className="absolute left-0 z-50 w-full bg-white shadow-lg"
//           onMouseEnter={() => setShowMegaMenu(true)}
//           onMouseLeave={() => setShowMegaMenu(false)}
//         >
//           <AllTools />
//         </div>
//       )}

//       {/* Mobile Menu */}
//       <div
//         className={`${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:hidden fixed top-0 left-0 w-3/4 h-full bg-white shadow-md transition-transform duration-300 z-40`}
//       >
//         <Link
//           to="/"
//           className="flex items-center text-2xl font-bold text-blue-600"
//         >
//           <img src="/logo.svg" alt="Logo" className="h-10 mb-1 w-18" />
//         </Link>
//         <nav className="flex flex-col items-start p-6 mt-10 space-y-6 bg-white">
//           <Link
//             to="/MergePdfScreen"
//             className="hover:text-blue-600"
//             onClick={toggleMenu}
//           >
//             Merge PDF
//           </Link>
//           <Link
//             to="/SplitPdfScreen"
//             className="hover:text-blue-600"
//             onClick={toggleMenu}
//           >
//             Split PDF
//           </Link>
//           <Link
//             to="/CompressPdfScreen"
//             className="hover:text-blue-600"
//             onClick={toggleMenu}
//           >
//             Compress PDF
//           </Link>
//           <Link
//             to="/PdfToWordScreen"
//             className="hover:text-blue-600"
//             onClick={toggleMenu}
//           >
//             Convert PDF
//           </Link>

//           <Link
//             to="#login"
//             className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
//             onClick={toggleMenu}
//           >
//             Log In
//           </Link>
//           <Link
//             to="#signup"
//             className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
//             onClick={toggleMenu}
//           >
//             Sign Up
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import AllTools from "./AllTools";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isVisible, setIsVisible] = useState(true); // For sticky header
  const [lastScrollY, setLastScrollY] = useState(0); // Track scroll direction
  const [showMegaMenu, setShowMegaMenu] = useState(false); // Mega menu toggle
  const megaMenuRef = useRef(null); // Ref for the mega menu container

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle the mega menu
  const toggleMegaMenu = () => {
    setShowMegaMenu(!showMegaMenu);
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

  // Close mega menu on clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        !event.target.closest("button") // Ensure clicks on the button don't close the menu
      ) {
        setShowMegaMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
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
          <img src="/logo.svg" alt="Logo" className="h-10 mb-1 w-18" />
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
              All Tools
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

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden fixed top-0 left-0 w-3/4 h-full bg-white shadow-md transition-transform duration-300 z-40`}
      >
        <nav className="flex flex-col items-start p-6 mt-10 space-y-6 bg-white">
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
    </header>
  );
};

export default Header;
