import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_URL = import.meta.env.VITE_API_URL;

const CompressPdf = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState("medium"); // Default to medium compression
  const [successMessage, setSuccessMessage] = useState("");

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);
    setCompressedPdfUrl(null);
    setSuccessMessage("");
    setProgress(0);
    console.log("PDF selected:", file);
  };

  const compressPdf = async () => {
    if (!selectedPdf) return;

    setIsCompressing(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedPdf);
    formData.append("compression_level", compressionLevel); // Add compression level to form data

    try {
      const endpoint = `${API_URL}/compress-pdf/`;

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setCompressedPdfUrl(pdfUrl);
      setSuccessMessage("Compression complete! Your PDF is ready.");
    } catch (error) {
      console.error("PDF compression failed:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          PDF Compressor
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Compress your PDF files for easier sharing and storage.
        </p>

        <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
          <div
            className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl"
            style={{
              backgroundImage: "url('/pdfIcon/PdfBg.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="flex items-center justify-center h-full">
              <img
                src="/pdfIcon/PdfCompressIcon.svg"
                alt="Upload Icon"
                className="h-20 w-22"
              />
            </div>
          </div>

          <div className="relative mb-4 group">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handlePdfUpload}
              aria-label="File Upload"
            />
            <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-red-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg"
                alt="Add File Icon"
                className="w-5 h-5"
              />
              <span>
                {selectedPdf
                  ? `File selected: ${selectedPdf.name}`
                  : "Choose PDF File"}
              </span>
            </button>
          </div>

          {/* Compression Level Radio Buttons */}
          <div className="flex justify-around mb-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="high"
                checked={compressionLevel === "high"}
                onChange={(e) => setCompressionLevel(e.target.value)}
                className="mr-2"
              />
              High Compression
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="medium"
                checked={compressionLevel === "medium"}
                onChange={(e) => setCompressionLevel(e.target.value)}
                className="mr-2"
              />
              Medium Compression
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="low"
                checked={compressionLevel === "low"}
                onChange={(e) => setCompressionLevel(e.target.value)}
                className="mr-2"
              />
              Low Compression
            </label>
          </div>

          {selectedPdf && (
            <button
              onClick={compressPdf}
              disabled={isCompressing}
              className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isCompressing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isCompressing ? "Compressing..." : "Compress PDF"}
            </button>
          )}
        </div>

        {isCompressing && (
          <div className="w-20 mx-auto my-8">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: `rgba(62, 152, 199, ${progress / 100})`,
                textColor: "#3e98c7",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        )}

        {successMessage && (
          <p className="mt-6 text-xl font-bold text-green-600 animate-bounce">
            {successMessage}
          </p>
        )}

        {compressedPdfUrl && (
          <div className="mt-12">
            <a
              href={compressedPdfUrl}
              download="compressed_document.pdf"
              className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 hover:scale-105"
            >
              Download Compressed PDF
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Your compressed PDF is ready for download!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompressPdf;
