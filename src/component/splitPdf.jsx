import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_URL = import.meta.env.VITE_API_URL;

const SplitPdf = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [isSplitting, setIsSplitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [splitPdfUrl, setSplitPdfUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);
    setSplitPdfUrl(null);
    setSuccessMessage("");
    setProgress(0);
    console.log("PDF selected:", file);
  };

  const splitPdf = async () => {
    if (!selectedPdf) return;

    setIsSplitting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("pdf", selectedPdf);
    formData.append("start_page", startPage);
    formData.append("end_page", endPage);

    try {
      const endpoint = `${API_URL}/convert/split-pdf/`;

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
      setSplitPdfUrl(pdfUrl);
      setSuccessMessage("Split complete! Your split PDF is ready.");
    } catch (error) {
      console.error("PDF splitting failed:", error);
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          PDF Splitter
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Select the range of pages to extract from your PDF.
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
                src="/pdfIcon/SplitPdfIcon.svg"
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

          <div className="flex justify-between mb-4">
            <input
              type="number"
              min="1"
              placeholder="Start Page"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              className="w-1/2 p-3 mr-2 text-center bg-gray-100 rounded-lg"
            />
            <input
              type="number"
              min="1"
              placeholder="End Page"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
              className="w-1/2 p-3 ml-2 text-center bg-gray-100 rounded-lg"
            />
          </div>

          {selectedPdf && (
            <button
              onClick={splitPdf}
              disabled={isSplitting}
              className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isSplitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSplitting ? "Splitting..." : "Split PDF"}
            </button>
          )}
        </div>

        {isSplitting && (
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

        {splitPdfUrl && (
          <div className="mt-12">
            <a
              href={splitPdfUrl}
              download="split_pages.pdf"
              className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 hover:scale-105"
            >
              Download Split PDF
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Your split PDF file is ready for download!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SplitPdf;
