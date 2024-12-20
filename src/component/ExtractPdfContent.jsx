import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
const API_URL = import.meta.env.VITE_API_EC2;

const ExtractPdfContent = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [extractAll, setExtractAll] = useState(false);
  const [extractedContent, setExtractedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true); // Show loader
      const response = await axios.post(
        `${API_URL}/upload-pdf/`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { file_path } = response.data;
      setFilePath(file_path);

      const blob = new Blob([file], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfFile(url);
    } catch (error) {
      alert(`Error uploading PDF: ${error.message}`);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handlePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((page) => page !== pageNum)
        : [...prevSelected, pageNum]
    );
  };

  const handleExtractContent = async () => {
    if (!selectedPdf) {
      alert("Please upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedPdf);
    formData.append("extract_all", extractAll);
    if (!extractAll) {
      formData.append("pages", JSON.stringify(selectedPages)); // Convert to JSON
    }

    try {
      setIsLoading(true); // Show loader
      const response = await axios.post(
        `${API_URL}/extract-content/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setExtractedContent(response.data.pages || {});
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("Error extracting content.");
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy text.");
      });
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Extract PDF Content
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Select specific pages or extract content from the entire PDF.
        </p>

        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        )}

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
                  src="/pdfIcon/extractPdf.svg"
                  alt="Rotate Icon"
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
              {extractAll
                ? "Extract Content from All Pages"
                : "Select Pages to Extract"}
            </h2>
            <div className="flex items-center justify-center mb-6">
              <input
                type="checkbox"
                checked={extractAll}
                onChange={() => setExtractAll(!extractAll)}
                className="w-5 h-5"
              />
              <label className="ml-2 text-lg">Extract All Pages</label>
            </div>

            {!extractAll && (
              <Document
                file={pdfFile}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                className="max-w-full"
              >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {Array.from(new Array(numPages), (el, index) => (
                    <div
                      key={index}
                      className={`p-2 border rounded-lg cursor-pointer ${
                        selectedPages.includes(index + 1)
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-300"
                      } hover:shadow-md`}
                      onClick={() => handlePageSelection(index + 1)}
                    >
                      <Page pageNumber={index + 1} width={100} />
                      <p className="mt-2 text-sm font-medium text-gray-700">
                        Page {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </Document>
            )}

            <button
              onClick={handleExtractContent}
              className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Extract Content
            </button>

            {Object.keys(extractedContent).length > 0 && (
              <div className="p-4 mt-6 text-left bg-gray-100 border rounded-lg">
                <h3 className="mb-4 text-xl font-bold">Extracted Content:</h3>
                {Object.entries(extractedContent).map(([page, text]) => (
                  <div key={page} className="mb-6">
                    <h4 className="mb-2 text-lg font-semibold">Page {page}:</h4>
                    <pre className="p-2 mb-2 text-sm text-gray-800 whitespace-pre-wrap bg-white border rounded">
                      {text || "No content found."}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(text)}
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      Copy Text
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExtractPdfContent;
