import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
      const endpoint = "http://192.168.1.17:8000/convert/merge-pdf/";

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
    <section className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-16 px-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          PDF Merger
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          Combine multiple PDF files into a single document with ease.
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
                src="/pdfIcon/mergePdf.svg"
                alt="Upload Icon"
                className="h-20 w-24"
              />
            </div>
          </div>

          <div className="relative group mb-4">
            <input
              type="file"
              accept="application/pdf"
              multiple
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handlePdfUpload}
              aria-label="File Upload"
            />
            <button className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2 hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg"
                alt="Add File Icon"
                className="h-5 w-5"
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

        {successMessage && (
          <p className="mt-6 text-green-600 text-xl font-bold animate-bounce">
            {successMessage}
          </p>
        )}

        {mergedPdfUrl && (
          <div className="mt-12">
            <a
              href={mergedPdfUrl}
              download="merged_document.pdf"
              className="inline-block bg-blue-500 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
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
