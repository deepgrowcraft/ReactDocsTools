import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [fromType, setFromType] = useState("PDF");
  const [toType, setToType] = useState("Word");

  const tools = {
    "Word to PDF": "/docToPdf",
    "Excel to PDF": "/ExelToPdfScreen",
    "PPT to PDF": "/PptToPdfScreen",
    "IMAGE to PDF": "/ImageToPdfScreen",
    "HTML to PDF": "/HtmlToPdfScreen",
    "PDF OCR": "/PdfOCRScreen",
    "PDF to Word": "/PdfToWordScreen",
    "PDF to Excel": "/PdfToExelScreen",
    "PDF to PPT": "/PdfToPPTScreen",
    "PDF to TEXT": "/PdfToTxtScreen",
    "PDF to IMAGE": "/PdfToImageScreen",
    "Merge PDF": "/MergePdfScreen",
    "Split PDF": "/SplitPdfScreen",
    "Compress PDF": "/CompressPdfScreen",
    "Flip PDF Pages": "/FlipPdfScreen",
    "Remove PDF Pages": "/RemovePdfPagesScreen",
    "Extract PDF Content": "/ExtractPdfContent",
    "Rotate PDF": "/RotatePdfPagesScreen",
    "Crop PDF": "/CropPdfScreen",
    "Edit PDF": "/PdfEditor",
    "Rearrange PDF": "/PdfReArrenge",
    "PDF Creator": "/PdfCreator",
    "Add Page Number": "/PdfWithPageNumber",
    "Add Watermark": "/Watermark",
    "Unlock PDF": "/UnlockPdf",
    "Protect PDF": "/ProtectPdf",
    "eSign PDF": "/eSignPdf",
  };

  const handleConvertNow = () => {
    const key = `${fromType} to ${toType}`;
    const path = tools[key];
    if (path) {
      navigate(path);
    } else {
      console.log("Invalid conversion combination");
    }
  };

  return (
    <section
      className="min-h-screen py-16 mt-10 bg-center bg-no-repeat bg-cover bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 lg:bg-fixed md:bg-scroll"
      style={{
        backgroundImage: "url('/home/HeroBg.svg')",
      }}
    >
      <div className="container px-4 mx-auto text-center md:px-8 lg:px-12">
        {/* Hero Heading */}
        <h1 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
          Instantly Convert Your Documents
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-base text-gray-700 md:text-lg lg:text-xl">
          Quickly convert PDFs, Word Docs, Excel Sheets, and more with just a
          few clicks. Fast, secure, and reliable.
        </p>

        {/* Conversion Form */}
        <div className="p-6 mx-auto bg-white shadow-lg rounded-xl md:p-8 lg:p-10 md:w-3/4 lg:w-2/5">
          <h2 className="mb-6 text-xl font-semibold text-blue-600 md:text-2xl">
            Convert Your Files
          </h2>

          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            {/* From Dropdown */}
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-left text-gray-700">
                From
              </label>
              <select
                value={fromType}
                onChange={(e) => setFromType(e.target.value)}
                className="block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>PDF</option>
                <option>Word</option>
                <option>Excel</option>
                <option>PPT</option>
                <option>IMAGE</option>
                <option>HTML</option>
              </select>
            </div>

            {/* To Dropdown */}
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-left text-gray-700">
                To
              </label>
              <select
                value={toType}
                onChange={(e) => setToType(e.target.value)}
                className="block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>PDF</option>
                <option>Word</option>
                <option>Excel</option>
                <option>PPT</option>
                <option>TEXT</option>
                <option>IMAGE</option>
              </select>
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConvertNow}
            className="w-full px-4 py-3 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Convert Now
          </button>
        </div>

        {/* Free Trial Section */}
        <div className="mt-12">
          <a
            href="#trial"
            className="inline-block px-8 py-3 text-sm font-bold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-lg md:text-base lg:text-lg hover:bg-blue-700 hover:scale-105"
          >
            Get 14 Days Free Trial
          </a>
          <p className="mt-4 text-sm text-gray-600 md:text-base">
            No Credit Card Required. Cancel Anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
