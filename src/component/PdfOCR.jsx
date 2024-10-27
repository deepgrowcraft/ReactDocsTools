import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
        "http://192.168.1.12:8000/convert/pdf-ocr/", // Update endpoint for OCR
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
    <section className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-16 px-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          PDF OCR Tool
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          Upload a scanned PDF file and extract text using Optical Character
          Recognition (OCR).
        </p>

        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div
            className="relative bg-cover bg-center mb-6 rounded-xl overflow-hidden"
            style={{
              backgroundImage: "url('/home/doctoPdfBg.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="flex justify-center items-center h-full">
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
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleFileUpload}
              aria-label="File Upload"
            />
            <button className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2 hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg"
                alt="addFile Icon"
                className="h-5 w-5"
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
            className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isProcessing ? "Processing..." : "Extract Text"}
          </button>
        )}

        {isProcessing && (
          <div className="my-8 w-20 mx-auto">
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
          <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Extracted Text:</h2>
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Copy Text
              </button>
            </div>
            <pre className="text-left text-gray-800 whitespace-pre-wrap overflow-auto max-h-96">
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
