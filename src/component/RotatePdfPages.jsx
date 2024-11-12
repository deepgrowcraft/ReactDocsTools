import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./FlipPdfScreen.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const RotatePdfPages = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPageRotations, setSelectedPageRotations] = useState({});
  const [rotateAll, setRotateAll] = useState(false);
  const [allRotationAngle, setAllRotationAngle] = useState(0); // Rotation angle for all pages if rotateAll is true

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://192.168.1.22:8000/upload-pdf/",
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
    setSelectedPageRotations((prevSelected) => ({
      ...prevSelected,
      [pageNum]: prevSelected[pageNum] || 0, // Set to 0 if not already selected
    }));
  };

  const handleRotationChange = (pageNum, angle) => {
    setSelectedPageRotations((prevSelected) => ({
      ...prevSelected,
      [pageNum]: angle,
    }));
  };

  const handleRotatePages = async () => {
    if (
      !filePath ||
      (Object.keys(selectedPageRotations).length === 0 && !rotateAll)
    ) {
      alert("Please upload a PDF and select pages to rotate.");
      return;
    }

    const requestPayload = rotateAll
      ? { file_path: filePath, all_rotation: allRotationAngle }
      : { file_path: filePath, page_rotations: selectedPageRotations };

    try {
      const response = await axios.post(
        "http://192.168.1.22:8000/rotate-pages/",
        requestPayload,
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
      console.error("Error rotating pages:", error);
      if (error.response && error.response.data) {
        alert(`Error rotating pages: ${error.response.data.error}`);
      } else {
        alert(`Error rotating pages: ${error.message}`);
      }
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Rotate PDF Pages
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Select pages to rotate individually, or rotate all pages at once by
          90°, 180°, or 270°.
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
                  src="/pdfIcon/rotatePdfPage.svg"
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
              {rotateAll
                ? "Rotate All Pages"
                : "Select Pages and Rotation Angle"}
            </h2>

            {/* Toggle for rotating all pages */}
            <div className="flex items-center justify-center mb-6 space-x-3">
              <input
                type="checkbox"
                checked={rotateAll}
                onChange={() => setRotateAll(!rotateAll)}
                className="w-5 h-5 text-blue-600 transition duration-150 ease-in-out form-checkbox"
              />
              <span className="text-lg font-medium">Rotate All Pages</span>
            </div>

            {rotateAll ? (
              <div className="mb-6">
                <label className="block mb-2 text-lg font-medium">
                  Rotation Angle for All Pages:
                </label>
                <select
                  value={allRotationAngle}
                  onChange={(e) =>
                    setAllRotationAngle(parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value={0}>0° (No Rotation)</option>
                  <option value={90}>90°</option>
                  <option value={180}>180°</option>
                  <option value={270}>270°</option>
                </select>
              </div>
            ) : (
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
                          selectedPageRotations[index + 1] !== undefined
                            ? "border-yellow-500 shadow-lg"
                            : "border-gray-300"
                        }`}
                        onClick={() => handlePageSelection(index + 1)}
                      >
                        <Page pageNumber={index + 1} width={150} />
                        <p className="mt-2 text-sm text-center">
                          Page {index + 1}
                        </p>
                        {selectedPageRotations[index + 1] !== undefined && (
                          <select
                            value={selectedPageRotations[index + 1]}
                            onChange={(e) =>
                              handleRotationChange(
                                index + 1,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-2 py-1 mt-2 text-sm border border-gray-300 rounded-lg"
                          >
                            <option value={0}>0°</option>
                            <option value={90}>90°</option>
                            <option value={180}>180°</option>
                            <option value={270}>270°</option>
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </Document>
              </div>
            )}

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handleRotatePages}
                className="px-6 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
              >
                Rotate Selected Pages
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RotatePdfPages;
