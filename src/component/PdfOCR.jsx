import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_URL = import.meta.env.VITE_API_URL;

const PdfOcr = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ocrText, setOcrText] = useState(null);
  const [showFullText, setShowFullText] = useState(false); // State for "Read More"

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setOcrText(null);
    setProgress(0);
    setShowFullText(false); // Reset the "Read More" state
    console.log("File selected:", file);
  };

  const performOcr = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Starting OCR...");

      const response = await axios.post(
        `${API_URL}/convert/pdf-ocr/`, // Update endpoint for OCR
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setOcrText(response.data.ocr_text);
      console.log("OCR text:", response.data.ocr_text);
    } catch (error) {
      console.error("OCR failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (ocrText) {
      navigator.clipboard.writeText(ocrText);
      alert("Text copied to clipboard!");
    }
  };

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const MAX_LENGTH = 500; // Set the length for "Read More" limit

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          PDF OCR Tool
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Upload a scanned PDF file and extract text using Optical Character
          Recognition (OCR).
        </p>

        <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
          <div
            className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl"
            style={{
              backgroundImage: "url('/home/doctoPdfBg.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="flex items-center justify-center h-full">
              <img
                src="/pdfIcon/pdfOCR.svg"
                alt="Upload Icon"
                className="h-20 w-22"
              />
            </div>
          </div>

          <div className="relative group">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              aria-label="File Upload"
            />
            <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-red-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg"
                alt="addFile Icon"
                className="w-5 h-5"
              />
              <span>
                {selectedFile
                  ? `File selected: ${selectedFile.name}`
                  : "Choose PDF File"}
              </span>
            </button>
          </div>
        </div>

        {selectedFile && !ocrText && (
          <button
            onClick={performOcr}
            disabled={isProcessing}
            className="px-8 py-3 mt-6 font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
          >
            {isProcessing ? "Processing..." : "Extract Text"}
          </button>
        )}

        {isProcessing && (
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

        {ocrText && (
          <div className="p-6 mt-12 bg-gray-100 rounded-lg shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Extracted Text:</h2>
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Copy Text
              </button>
            </div>
            <pre className="overflow-auto text-left text-gray-800 whitespace-pre-wrap max-h-96">
              {ocrText.length > MAX_LENGTH && !showFullText
                ? `${ocrText.slice(0, MAX_LENGTH)}...`
                : ocrText}
            </pre>
            {ocrText.length > MAX_LENGTH && (
              <button
                onClick={toggleShowFullText}
                className="mt-4 text-blue-500 hover:text-blue-600"
              >
                {showFullText ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PdfOcr;
