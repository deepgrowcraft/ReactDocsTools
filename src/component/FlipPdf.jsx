// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import axios from "axios";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "./FlipPdfScreen.css";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const FlipPdfScreen = () => {
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [filePath, setFilePath] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [selectedPages, setSelectedPages] = useState([]);

//   const handlePdfUpload = async (event) => {
//     const file = event.target.files[0];
//     setSelectedPdf(file);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "http://192.168.1.9:8000/upload-pdf/",
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
//       if (error.response && error.response.data) {
//         console.error("Error uploading PDF:", error.response.data.error);
//         alert(`Error uploading PDF: ${error.response.data.error}`);
//       } else {
//         console.error("Error uploading PDF:", error.message);
//         alert(`Error uploading PDF: ${error.message}`);
//       }
//     }
//   };

//   const handlePageSelection = (pageNum) => {
//     setSelectedPages((prevSelectedPages) =>
//       prevSelectedPages.includes(pageNum)
//         ? prevSelectedPages.filter((page) => page !== pageNum)
//         : [...prevSelectedPages, pageNum]
//     );
//   };

//   const handleFlipPages = async (direction) => {
//     if (!filePath || selectedPages.length === 0) {
//       alert("Please upload a PDF and select pages to flip.");
//       return;
//     }

//     try {
//       console.log("Flipping Pages:", {
//         file_path: filePath,
//         pages: selectedPages,
//         direction,
//       });

//       const response = await axios.post(
//         "http://192.168.1.9:8000/upload-flipped-pdf/",
//         {
//           file_path: filePath,
//           pages: selectedPages,
//           direction: direction,
//         },
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
//       console.error(`Error flipping pages ${direction}:`, error);
//       if (error.response && error.response.data) {
//         alert(`Error flipping PDF: ${error.response.data.error}`);
//       } else {
//         alert(`Error flipping PDF: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <section className="px-4 py-16 bg-gray-100">
//       <div className="container mx-auto">
//         {!pdfFile ? (
//           <div className="text-center">
//             <h1 className="mb-6 text-4xl font-bold text-gray-900">
//               Upload a PDF to Get Started
//             </h1>
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handlePdfUpload}
//             />
//           </div>
//         ) : (
//           <div>
//             <h2 className="mb-4 text-2xl font-semibold">
//               Select Pages to Flip
//             </h2>
//             <div className="grid grid-cols-4 gap-4 mb-4">
//               <Document
//                 file={pdfFile}
//                 onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//               >
//                 {Array.from(new Array(numPages), (el, index) => (
//                   <div
//                     key={`page_${index + 1}`}
//                     className={`border-2 rounded overflow-hidden ${
//                       selectedPages.includes(index + 1)
//                         ? "border-blue-500"
//                         : "border-gray-300"
//                     }`}
//                     onClick={() => handlePageSelection(index + 1)}
//                   >
//                     <Page pageNumber={index + 1} width={150} />
//                     <p className="mt-2 text-center">Page {index + 1}</p>
//                   </div>
//                 ))}
//               </Document>
//             </div>

//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => handleFlipPages("horizontal")}
//                 className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//               >
//                 Flip Horizontally
//               </button>
//               <button
//                 onClick={() => handleFlipPages("vertical")}
//                 className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//               >
//                 Flip Vertically
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FlipPdfScreen;

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./FlipPdfScreen.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const FlipPdfScreen = () => {
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
      const response = await axios.post(
        "http://192.168.1.9:8000/upload-pdf/",
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
    setSelectedPages((prevSelectedPages) =>
      prevSelectedPages.includes(pageNum)
        ? prevSelectedPages.filter((page) => page !== pageNum)
        : [...prevSelectedPages, pageNum]
    );
  };

  const handleFlipPages = async (direction) => {
    if (!filePath || selectedPages.length === 0) {
      alert("Please upload a PDF and select pages to flip.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.9:8000/upload-flipped-pdf/",
        {
          file_path: filePath,
          pages: selectedPages,
          direction: direction,
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
      console.error(`Error flipping pages ${direction}:`, error);
      if (error.response && error.response.data) {
        alert(`Error flipping PDF: ${error.response.data.error}`);
      } else {
        alert(`Error flipping PDF: ${error.message}`);
      }
    }
  };

  return (
    <section className="px-4 py-16 bg-gray-100">
      <div className="container mx-auto">
        {!pdfFile ? (
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              Upload a PDF to Get Started
            </h1>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="p-2 border rounded cursor-pointer"
            />
          </div>
        ) : (
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Select Pages to Flip
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
                          ? "border-blue-500 shadow-lg"
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
                onClick={() => handleFlipPages("horizontal")}
                className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Flip Horizontally
              </button>
              <button
                onClick={() => handleFlipPages("vertical")}
                className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Flip Vertically
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlipPdfScreen;
