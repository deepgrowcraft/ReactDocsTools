import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const HtmlToPdf = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleInputChange = (event) => {
    setHtmlContent(event.target.value);
    setPdfUrl(null);
  };

  const convertHtmlToPdf = async () => {
    if (!htmlContent) return;

    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("html_content", htmlContent);

    try {
      const response = await axios.post(
        "http://192.168.1.28:8000/convert/html-to-pdf/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("File conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-16 px-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Convert HTML to PDF
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          Enter HTML content to convert it into a PDF file.
        </p>

        {/* HTML Content Input */}
        <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-8 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-6">
          <textarea
            placeholder="Enter HTML content here..."
            value={htmlContent}
            onChange={handleInputChange}
            rows="8"
            className="w-full bg-blue-50 p-4 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
          ></textarea>
        </div>

        {/* Convert Button */}
        {htmlContent && !pdfUrl && (
          <button
            onClick={convertHtmlToPdf}
            disabled={isConverting}
            className={`mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isConverting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isConverting ? "Converting..." : "Convert to PDF"}
          </button>
        )}

        {/* Progress Bar */}
        {isConverting && (
          <div className="my-8 w-32 mx-auto">
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

        {/* Download Button */}
        {pdfUrl && (
          <div className="mt-12">
            <a
              href={pdfUrl}
              download="converted.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white font-bold px-10 py-4 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
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

export default HtmlToPdf;
