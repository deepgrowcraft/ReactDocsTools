import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./FlipPdfScreen.css";

const API_URL = import.meta.env.VITE_API_URL;

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const CropPdfPages = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [cropDimensions, setCropDimensions] = useState({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(null);
  const [cropBox, setCropBox] = useState({
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
  });

  // Handle PDF Upload
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
      console.error("Error uploading PDF:", error.message);
      alert(`Error uploading PDF: ${error.message}`);
    }
  };

  // Handle Page Selection
  const handlePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((page) => page !== pageNum)
        : [...prevSelected, pageNum]
    );
  };

  // Mouse down handler (starts drawing the crop box)
  const handleMouseDown = (e, pageIndex) => {
    if (selectedPages.includes(pageIndex)) {
      setCurrentPageIndex(pageIndex); // Track the page being cropped
      const rect = e.target.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;

      setCropBox({
        startX,
        startY,
        width: 0,
        height: 0,
      });
      setIsDrawing(true);
    }
  };

  // Mouse up handler (ends drawing the crop box)
  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (currentPageIndex !== null) {
        handleCropDimensionsUpdate(currentPageIndex);
      }
    }
  };

  // Mouse move handler (updates the crop box during drawing)
  const handleMouseMove = (e) => {
    if (!isDrawing || currentPageIndex === null) return;

    const pageElement = document.getElementById(`pdf-page-${currentPageIndex}`);
    const rect = pageElement.getBoundingClientRect();
    const width = e.clientX - rect.left - cropBox.startX;
    const height = e.clientY - rect.top - cropBox.startY;

    setCropBox((prev) => ({
      ...prev,
      width,
      height,
    }));
  };

  // Update crop dimensions for the specific page
  const handleCropDimensionsUpdate = (pageIndex) => {
    setCropDimensions((prev) => ({
      ...prev,
      [pageIndex]: {
        top: cropBox.startY,
        left: cropBox.startX,
        right: cropBox.startX + cropBox.width,
        bottom: cropBox.startY + cropBox.height,
      },
    }));
  };

  // Apply crop
  const handleApplyCrop = async () => {
    if (!filePath || selectedPages.length === 0) {
      alert("Please upload a PDF and select pages to crop.");
      return;
    }

    const cropPayload = {
      file_path: filePath,
      selected_pages: selectedPages,
      crop_dimensions: cropDimensions,
    };

    try {
      const response = await axios.post(`${API_URL}/crop-pages/`, cropPayload, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error applying crop:", error.message);
      alert(`Error applying crop: ${error.message}`);
    }
  };

  // Add global mousemove event listener
  useEffect(() => {
    if (isDrawing) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("touchmove", handleGlobalMouseMove);

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("touchmove", handleGlobalMouseMove);
      };
    }
  }, [isDrawing]);

  return (
    <section className="min-h-screen px-4 py-16 mt-10 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
      <div className="container mx-auto text-center">
        <h1 className="mb-8 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Crop PDF Pages
        </h1>
        <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 md:text-xl">
          Choose specific pages to crop individually, or apply the same crop
          dimensions to multiple pages.
        </p>

        {!pdfFile ? (
          <div className="max-w-lg p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl">
            <div
              className="relative mb-6 bg-center bg-cover rounded-xl"
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
                  src="/pdfIcon/cropPdf.svg"
                  alt="Crop Icon"
                  className="w-20 h-20"
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
              <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105">
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
            <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">
              Select Pages to Crop
            </h2>

            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    key={`page_${index + 1}`}
                    id={`pdf-page-${index}`}
                    className={`pdf-page ${
                      selectedPages.includes(index)
                        ? "border-2 border-blue-600"
                        : ""
                    }`}
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={() => handlePageSelection(index)}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    onMouseUp={handleMouseUp}
                  >
                    <Page pageNumber={index + 1} width={150} />
                    {isDrawing &&
                      currentPageIndex === index &&
                      cropBox.width &&
                      cropBox.height && (
                        <div
                          style={{
                            position: "absolute",
                            left: cropBox.startX,
                            top: cropBox.startY,
                            width: cropBox.width,
                            height: cropBox.height,
                            border: "2px dashed rgba(0, 0, 0, 0.5)",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                          }}
                        />
                      )}
                    {cropDimensions[index] && !isDrawing && (
                      <div
                        style={{
                          position: "absolute",
                          left: cropDimensions[index].left,
                          top: cropDimensions[index].top,
                          width:
                            cropDimensions[index].right -
                            cropDimensions[index].left,
                          height:
                            cropDimensions[index].bottom -
                            cropDimensions[index].top,
                          border: "2px dashed rgba(0, 0, 0, 0.5)",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Document>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handleApplyCrop}
                className="px-8 py-3 font-semibold text-white transition-all duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none"
              >
                Apply Crop
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CropPdfPages;
