import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./FlipPdfScreen.css";
const API_URL = import.meta.env.VITE_API_URL;

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const RemovePdfPages = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/upload-pdf/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { file_path } = response.data;
      setFilePath(file_path);

      const blob = new Blob([file], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfFile(url);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error uploading PDF:", error.response.data.error);
        alert(`Error uploading PDF: ${error.response.data.error}`);
      } else {
        console.error("Error uploading PDF:", error.message);
        alert(`Error uploading PDF: ${error.message}`);
      }
    }
  };

  const handlePageSelection = (pageNum) => {
    setSelectedPages((prevSelectedPages) =>
      prevSelectedPages.includes(pageNum)
        ? prevSelectedPages.filter((page) => page !== pageNum)
        : [...prevSelectedPages, pageNum]
    );
  };

  const handleRemovePages = async () => {
    if (!filePath || selectedPages.length === 0) {
      alert("Please upload a PDF and select pages to remove.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/remove-pages/`,
        {
          file_path: filePath,
          pages: selectedPages,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error removing pages:", error);
      if (error.response && error.response.data) {
        alert(`Error removing pages: ${error.response.data.error}`);
      } else {
        alert(`Error removing pages: ${error.message}`);
      }
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Remove PDF Pages
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Select pages from your PDF document to remove them easily, then
          download the updated version.
        </p>
        {!pdfFile ? (
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
                  src="/pdfIcon/removePages.svg"
                  alt="Remove Icon"
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
              <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105">
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
          </div>
        ) : (
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Select Pages to Remove
            </h2>
            <div className="">
              <Document
                file={pdfFile}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {Array.from(new Array(numPages), (el, index) => (
                    <div
                      key={`page_${index + 1}`}
                      className={`pdf-page border-2 rounded overflow-hidden cursor-pointer ${
                        selectedPages.includes(index + 1)
                          ? "border-red-500 shadow-lg"
                          : "border-gray-300"
                      }`}
                      onClick={() => handlePageSelection(index + 1)}
                    >
                      <Page pageNumber={index + 1} width={150} />
                      <p className="mt-2 text-sm text-center">
                        Page {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </Document>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handleRemovePages}
                className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove Selected Pages
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RemovePdfPages;
