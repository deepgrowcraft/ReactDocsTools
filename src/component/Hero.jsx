import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50 to-blue-100 py-16 mt-5">
      <div className="container mx-auto text-center px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Convert Any Document Instantly
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Convert PDFs, Word Docs, Excel Sheets, and more with just a click.
          Fast, secure, and reliable.
        </p>
        <div className="bg-white shadow-md rounded-lg p-6 inline-block">
          <h2 className="text-2xl font-bold mb-4">Convert PDF to Word</h2>
          <div className="flex justify-center space-x-4">
            <div className="w-40">
              <label className="block text-sm font-medium text-gray-700">
                Convert
              </label>
              <select className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>PDF</option>
                <option>Word</option>
                <option>Excel</option>
                <option>PPT</option>
              </select>
            </div>
            <div className="w-40">
              <label className="block text-sm font-medium text-gray-700">
                To
              </label>
              <select className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>Word</option>
                <option>PDF</option>
                <option>Excel</option>
                <option>PPT</option>
              </select>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-700">
            Convert
          </button>
        </div>
        <div className="mt-8">
          <a
            href="#trial"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700"
          >
            Get 14 days Free Trial
          </a>
          <p className="mt-2 text-sm">No Card Required. Cancel Anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
