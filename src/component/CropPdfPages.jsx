import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./FlipPdfScreen.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const CropPdfPages = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [cropDimensions, setCropDimensions] = useState({});
  const [cropAll, setCropAll] = useState(false);

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://uins2zge62.execute-api.ap-south-1.amazonaws.com/dev/upload-pdf/",
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
      console.error("Error uploading PDF:", error.message);
      alert(`Error uploading PDF: ${error.message}`);
    }
  };

  const handlePageSelection = (pageNum) => {
    setSelectedPages((prevSelected) =>
      prevSelected.includes(pageNum)
        ? prevSelected.filter((page) => page !== pageNum)
        : [...prevSelected, pageNum]
    );
  };

  const handleCropChange = (pageNum, field, value) => {
    setCropDimensions((prev) => ({
      ...prev,
      [pageNum]: {
        ...prev[pageNum],
        [field]: isNaN(value) ? 0 : parseFloat(value),
      },
    }));
  };

  const handleCropPages = async () => {
    if (!filePath || selectedPages.length === 0) {
      alert("Please upload a PDF and select pages to crop.");
      return;
    }

    const cropPayload = cropAll
      ? {
          file_path: filePath,
          crop_all: true,
          crop_dimensions: cropDimensions[selectedPages[0]],
        }
      : { file_path: filePath, crop_dimensions: cropDimensions };

    try {
      const response = await axios.post(
        "https://uins2zge62.execute-api.ap-south-1.amazonaws.com/dev/crop-pages/",
        cropPayload,
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
      console.error("Error cropping pages:", error.message);
      alert(`Error cropping pages: ${error.message}`);
    }
  };

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
              {cropAll ? "Apply Crop to All Pages" : "Select Pages to Crop"}
            </h2>

            <div className="flex items-center justify-center mb-6 space-x-3">
              <input
                type="checkbox"
                checked={cropAll}
                onChange={() => setCropAll(!cropAll)}
                className="w-5 h-5 text-blue-600 transition duration-150 ease-in-out form-checkbox"
              />
              <span className="text-lg font-medium text-gray-700">
                Crop All Pages
              </span>
            </div>

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
                        ? "border-green-500 shadow-lg"
                        : "border-gray-300"
                    }`}
                    onClick={() => handlePageSelection(index + 1)}
                  >
                    <Page pageNumber={index + 1} width={150} />
                    <p className="mt-2 text-sm text-center text-gray-700">
                      Page {index + 1}
                    </p>

                    {selectedPages.includes(index + 1) && (
                      <div className="mt-4 space-y-2 text-sm text-gray-600">
                        {["top", "bottom", "left", "right"].map((field) => (
                          <label key={field}>
                            <span>
                              {field.charAt(0).toUpperCase() + field.slice(1)}:
                            </span>
                            <input
                              type="number"
                              placeholder="px"
                              className="w-full p-1 border rounded"
                              value={cropDimensions[index + 1]?.[field] || ""}
                              onChange={(e) =>
                                handleCropChange(
                                  index + 1,
                                  field,
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Document>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handleCropPages}
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

// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import axios from "axios";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "./FlipPdfScreen.css";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const CropPdfPages = () => {
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [filePath, setFilePath] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [selectedPages, setSelectedPages] = useState([]);
//   const [cropBoxes, setCropBoxes] = useState({}); // Stores dimensions of crop boxes

//   const handlePdfUpload = async (event) => {
//     const file = event.target.files[0];
//     setSelectedPdf(file);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "https://uins2zge62.execute-api.ap-south-1.amazonaws.com/dev/upload-pdf/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const { file_path } = response.data;
//       setFilePath(file_path);

//       const blob = new Blob([file], { type: "application/pdf" });
//       const url = URL.createObjectURL(blob);
//       setPdfFile(url);
//     } catch (error) {
//       console.error("Error uploading PDF:", error.message);
//       alert(`Error uploading PDF: ${error.message}`);
//     }
//   };

//   const handlePageSelection = (pageNum) => {
//     setSelectedPages((prevSelected) =>
//       prevSelected.includes(pageNum)
//         ? prevSelected.filter((page) => page !== pageNum)
//         : [...prevSelected, pageNum]
//     );
//   };

//   const handleCropPages = async () => {
//     if (!filePath || selectedPages.length === 0) {
//       alert("Please upload a PDF and select pages to crop.");
//       return;
//     }

//     const cropPayload = {
//       file_path: filePath,
//       crop_dimensions: cropBoxes,
//     };

//     try {
//       const response = await axios.post(
//         "https://uins2zge62.execute-api.ap-south-1.amazonaws.com/dev/crop-pages/",
//         cropPayload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           responseType: "blob",
//         }
//       );

//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const pdfUrl = URL.createObjectURL(blob);
//       window.open(pdfUrl);
//     } catch (error) {
//       console.error("Error cropping pages:", error.message);
//       alert(`Error cropping pages: ${error.message}`);
//     }
//   };

//   const handleDrag = (pageNum, e) => {
//     // Track the dragging state for crop box
//     const { movementX, movementY } = e;
//     setCropBoxes((prev) => ({
//       ...prev,
//       [pageNum]: {
//         ...prev[pageNum],
//         x: (prev[pageNum]?.x || 0) + movementX,
//         y: (prev[pageNum]?.y || 0) + movementY,
//       },
//     }));
//   };

//   const handleResize = (pageNum, e, direction) => {
//     e.preventDefault();
//     const { movementX, movementY } = e;
//     setCropBoxes((prev) => {
//       const box = prev[pageNum] || { width: 100, height: 100, x: 10, y: 10 };

//       let newWidth = box.width;
//       let newHeight = box.height;
//       let newX = box.x;
//       let newY = box.y;

//       // Adjust width, height, x, and y based on the resizing direction
//       if (direction === "right") newWidth += movementX;
//       if (direction === "bottom") newHeight += movementY;
//       if (direction === "left") {
//         newWidth -= movementX;
//         newX += movementX;
//       }
//       if (direction === "top") {
//         newHeight -= movementY;
//         newY += movementY;
//       }

//       return {
//         ...prev,
//         [pageNum]: {
//           ...box,
//           width: newWidth,
//           height: newHeight,
//           x: newX,
//           y: newY,
//         },
//       };
//     });
//   };

//   return (
//     <section className="min-h-screen px-4 py-16 mt-10 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-8 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Crop PDF Pages
//         </h1>
//         <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 md:text-xl">
//           Choose specific pages to crop individually, or apply the same crop
//           dimensions to multiple pages.
//         </p>

//         {!pdfFile ? (
//           <div className="max-w-lg p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl">
//             <input
//               type="file"
//               accept="application/pdf"
//               className="w-full cursor-pointer"
//               onChange={handlePdfUpload}
//               aria-label="File Upload"
//             />
//           </div>
//         ) : (
//           <div>
//             <Document
//               file={pdfFile}
//               onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//             >
//               <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
//                 {Array.from(new Array(numPages), (el, index) => (
//                   <div
//                     key={`page_${index + 1}`}
//                     className="relative border-2 border-gray-300 rounded cursor-pointer"
//                     style={{
//                       position: "relative",
//                       width: "150px",
//                       height: "200px",
//                     }}
//                     onClick={() => handlePageSelection(index + 1)}
//                   >
//                     <Page pageNumber={index + 1} width={150} />

//                     {selectedPages.includes(index + 1) && (
//                       <div
//                         className="absolute border border-blue-500"
//                         style={{
//                           top: cropBoxes[index + 1]?.y || 10,
//                           left: cropBoxes[index + 1]?.x || 10,
//                           width: cropBoxes[index + 1]?.width || 100,
//                           height: cropBoxes[index + 1]?.height || 100,
//                           cursor: "move",
//                         }}
//                         onMouseDown={(e) => {
//                           e.preventDefault();
//                           const moveHandler = (ev) => handleDrag(index + 1, ev);
//                           document.addEventListener("mousemove", moveHandler);
//                           document.addEventListener("mouseup", () =>
//                             document.removeEventListener(
//                               "mousemove",
//                               moveHandler
//                             )
//                           );
//                         }}
//                       >
//                         {/* Resize handles */}
//                         <div
//                           className="absolute w-2 h-2 bg-blue-500 cursor-n-resize"
//                           style={{ top: "-5px", left: "50%" }}
//                           onMouseDown={(e) => {
//                             e.preventDefault();
//                             const resizeHandler = (ev) =>
//                               handleResize(index + 1, ev, "top");
//                             document.addEventListener(
//                               "mousemove",
//                               resizeHandler
//                             );
//                             document.addEventListener("mouseup", () =>
//                               document.removeEventListener(
//                                 "mousemove",
//                                 resizeHandler
//                               )
//                             );
//                           }}
//                         />
//                         {/* Other resize handles (left, right, bottom) */}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </Document>
//             <button onClick={handleCropPages} className="btn btn-primary">
//               Apply Crop
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CropPdfPages;
