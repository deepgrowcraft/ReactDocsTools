import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_URL = import.meta.env.VITE_API_URL;

const DocToPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // Log whenever pdfUrl changes
    console.log("Current pdfUrl:", pdfUrl);
    // Clean up URL to prevent memory leaks
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPdfUrl(null);
    console.log("File selected:", file);
  };

  // Convert DOC to PDF logic
  const convertDocToPdf = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Starting conversion...");

      // Configure request to get a binary file as a blob
      const response = await axios.post(
        `${API_URL}/convert/docx-to-pdf/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Set response type to blob to handle binary data
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      // Create a blob URL for the downloaded PDF file
      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl); // Set pdfUrl to display download link

      console.log("PDF ready for download:", pdfUrl);
    } catch (error) {
      console.error("File conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Convert Word to PDF
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          This tool makes converting Word to PDF easy. Transform your DOC or
          DOCX files into the widely-used PDF format online.
        </p>

        {/* Upload Area */}
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
                src="/home/doctopdf1.svg"
                alt="Upload Icon"
                className="h-20 w-22"
              />
            </div>
          </div>

          {/* File upload input */}
          <div className="relative group">
            <input
              type="file"
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
              <span>{selectedFile ? selectedFile.name : "Choose a File"}</span>
            </button>
          </div>
        </div>

        {/* Convert button */}
        {selectedFile && !pdfUrl && (
          <button
            onClick={convertDocToPdf}
            disabled={isConverting}
            className="px-8 py-3 mt-6 font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
          >
            {isConverting ? "Converting..." : "Convert to PDF"}
          </button>
        )}

        {/* Progress Bar */}
        {isConverting && (
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

        {/* Download button */}
        {pdfUrl && (
          <div className="mt-12">
            <a
              href={pdfUrl}
              download="converted.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-green-500 rounded-full shadow-xl hover:bg-green-600 hover:scale-105"
            >
              Download PDF
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Your PDF is ready for download!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocToPdf;
