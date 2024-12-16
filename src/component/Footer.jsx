import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-700 bg-white">
      {/* Download Section */}
      <div className="py-8 text-center text-white bg-blue-600">
        <h2 className="mb-2 text-2xl font-bold">Download our mobile app</h2>
        <p className="mb-4 text-base">
          Easily build your landing page without coding. Download now!
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.gcs.alldocument_reader.mobisystems.office.viewer.filereader.pdf.reader.pdftools.alltools&hl=en"
            className="inline-block"
          >
            <img
              src="./playstore.svg"
              alt="Google Play"
              className="h-10 transition-transform transform hover:scale-105"
            />
          </a>
          <a
            href="https://apps.apple.com/ph/app/all-file-reader/id6590624041"
            className="inline-block"
          >
            <img
              src="./appstore.svg"
              alt="App Store"
              className="h-10 transition-transform transform hover:scale-105"
            />
          </a>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container grid grid-cols-2 gap-6 px-4 py-8 mx-auto text-sm md:grid-cols-5">
        {/* Logo Section */}
        <div className="flex flex-col items-center col-span-2 md:col-span-1 md:items-start">
          <a href="/" className="hover:text-blue-500">
            <img src="/logo.svg" alt="Logo" className="mb-2 w-18" />
          </a>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="mb-2 font-semibold text-gray-800">Solutions</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://growcraftsolution.com/"
                className="hover:text-blue-500"
              >
                Business
              </a>
            </li>
          </ul>
        </div>

        {/* Online Document Convert */}
        <div>
          <h3 className="mb-2 font-semibold text-gray-800">
            Online Document Convert
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-blue-500">
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
          <h3 className="mb-2 font-semibold text-gray-800">Company</h3>
          <ul className="space-y-1">
            <li>
              <a href="/about" className="hover:text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-500">
                Contact
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
          <h3 className="mb-2 font-semibold text-gray-800">Product</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-blue-500">
                Pricing
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/dev?id=5043097689055528565&hl=en"
                className="hover:text-blue-500"
              >
                More Apps
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=com.gcs.alldocument_reader.mobisystems.office.viewer.filereader.pdf.reader.pdftools.alltools&hl=en"
                className="hover:text-blue-500"
              >
                Android App
              </a>
            </li>
            <li>
              <a
                href="https://apps.apple.com/ph/app/all-file-reader/id6590624041"
                className="hover:text-blue-500"
              >
                iOS App
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="py-4 text-sm text-center bg-gray-100">
        <p className="text-gray-500">
          © 2024 pdfSmallTools All Rights Reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="/PrivacyPolicy" className="hover:text-blue-500">
            Privacy Policy
          </a>
          <a href="/TermsAndConditions" className="hover:text-blue-500">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
