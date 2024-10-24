import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      {/* Download Section */}
      <div className="bg-blue-600 py-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Download our mobile app</h2>
        <p className="text-base mb-4">
          Easily build your landing page without coding. Download now!
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="inline-block">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10 transition-transform transform hover:scale-105"
            />
          </a>
          <a href="#" className="inline-block">
            <img
              src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png"
              alt="App Store"
              className="h-10 transition-transform transform hover:scale-105"
            />
          </a>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        {/* Logo Section */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <img src="/logo.svg" alt="Logo" className="w-18 mb-2" />
        </div>

        {/* Solutions */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Solutions</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-blue-500">
                Business
              </a>
            </li>
          </ul>
        </div>

        {/* Online Document Convert */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Online Document Convert
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Tools
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Company</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Career
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Sustainability
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Security
              </a>
            </li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Product</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-blue-500">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Developers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Android App
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                iOS App
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-100 py-4 text-center text-sm">
        <p className="text-gray-500">
          © 2024 Document Converter. All Rights Reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-blue-500">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-500">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
