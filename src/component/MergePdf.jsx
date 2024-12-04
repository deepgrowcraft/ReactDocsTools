import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_URL = import.meta.env.VITE_API_URL;

const MergePdf = () => {
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePdfUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedPdfs(files);
    setMergedPdfUrl(null);
    setSuccessMessage("");
    setProgress(0);
  };

  const mergePdfs = async () => {
    if (selectedPdfs.length < 2) {
      alert("Please select at least two PDF files to merge.");
      return;
    }

    setIsMerging(true);
    setProgress(0);

    const formData = new FormData();
    selectedPdfs.forEach((file) => {
      formData.append("pdfs", file);
    });

    try {
      const endpoint = `${API_URL}/convert/merge-pdf/`;

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
      setMergedPdfUrl(pdfUrl);
      setSuccessMessage("Merge complete! Your merged PDF is ready.");
    } catch (error) {
      console.error("PDF merging failed:", error);
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          PDF Merger
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Combine multiple PDF files into a single document with ease.
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
                src="/pdfIcon/mergePdf.svg"
                alt="Upload Icon"
                className="w-24 h-20"
              />
            </div>
          </div>

          <div className="relative mb-4 group">
            <input
              type="file"
              accept="application/pdf"
              multiple
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
                {selectedPdfs.length > 0
                  ? `${selectedPdfs.length} file(s) selected`
                  : "Choose PDF Files"}
              </span>
            </button>
          </div>

          {selectedPdfs.length > 0 && (
            <button
              onClick={mergePdfs}
              disabled={isMerging}
              className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isMerging ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isMerging ? "Merging..." : "Merge PDFs"}
            </button>
          )}
        </div>

        {isMerging && (
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

        {mergedPdfUrl && (
          <div className="mt-12">
            <a
              href={mergedPdfUrl}
              download="merged_document.pdf"
              className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 hover:scale-105"
            >
              Download Merged PDF
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Your merged PDF is ready for download!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MergePdf;
