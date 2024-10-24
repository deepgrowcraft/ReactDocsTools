import React from "react";

const Hero = () => {
  return (
    <section
      className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-16 mt-5 bg-cover bg-center bg-no-repeat h-screen"
      style={{
        backgroundImage: "url('/public/home/HeroBg.svg')", // Update the path if needed
      }}
    >
      <div className="container mx-auto text-center px-4 md:px-0">
        {/* Hero Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Instantly Convert Your Documents
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          Quickly convert PDFs, Word Docs, Excel Sheets, and more with just a
          few clicks. Fast, secure, and reliable.
        </p>

        {/* Conversion Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 md:w-1/2 lg:w-2/5 mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">
            Convert Your Files
          </h2>

          {/* Form Controls */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            {/* From Dropdown */}
            <div className="flex-1">
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <select className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out">
                <option>PDF</option>
                <option>Word</option>
                <option>Excel</option>
                <option>PPT</option>
              </select>
            </div>

            {/* To Dropdown */}
            <div className="flex-1">
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <select className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out">
                <option>Word</option>
                <option>PDF</option>
                <option>Excel</option>
                <option>PPT</option>
              </select>
            </div>
          </div>

          {/* Convert Button */}
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out shadow-lg">
            Convert Now
          </button>
        </div>

        {/* Free Trial Section */}
        <div className="mt-12">
          <a
            href="#trial"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get 14 Days Free Trial
          </a>
          <p className="mt-4 text-sm text-gray-600">
            No Credit Card Required. Cancel Anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
