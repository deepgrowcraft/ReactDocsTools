// import React, { useState } from "react";
// import axios from "axios";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// // Configure PDF.js worker to use the locally hosted file
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const FlipPdfScreen = () => {
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const handlePdfUpload = async (event) => {
//     const file = event.target.files[0];
//     setSelectedPdf(file);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "http://192.168.1.13:8000/upload-pdf/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           responseType: "blob",
//         }
//       );

//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = URL.createObjectURL(blob);
//       setPdfFile(url);
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPrevPage = () => setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1);
//   const goToNextPage = () =>
//     setPageNumber(pageNumber < numPages ? pageNumber + 1 : numPages);

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Flip PDF Viewer
//         </h1>
//         <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//           View and navigate through your PDF files page by page.
//         </p>

//         <div className="max-w-xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
//           <div className="relative mb-4">
//             <input
//               type="file"
//               accept="application/pdf"
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               onChange={handlePdfUpload}
//               aria-label="File Upload"
//             />
//             <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600">
//               {selectedPdf
//                 ? `File selected: ${selectedPdf.name}`
//                 : "Choose PDF File"}
//             </button>
//           </div>

//           {pdfFile && (
//             <div className="mt-4">
//               <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//                 <Page pageNumber={pageNumber} />
//               </Document>
//               <p className="mt-2">
//                 Page {pageNumber} of {numPages}
//               </p>
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={goToPrevPage}
//                   className="px-4 py-2 bg-gray-300 rounded-lg"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={goToNextPage}
//                   className="px-4 py-2 bg-gray-300 rounded-lg"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FlipPdfScreen;

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
//         "http://192.168.1.13:8000/upload-pdf/",
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

//   const handleFlipPages = async (direction) => {
//     if (!filePath) {
//       alert("Please upload a PDF first.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://192.168.1.13:8000/flip-pages/",
//         {
//           pages: selectedPages,
//           action: direction,
//           file_path: filePath,
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

// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { PDFDocument } from "pdf-lib";

// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
// const FlipPdfScreen = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [flipVertical, setFlipVertical] = useState(false);
//   const [flipHorizontal, setFlipHorizontal] = useState(false);

//   const onFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const toggleFlipVertical = () => setFlipVertical(!flipVertical);
//   const toggleFlipHorizontal = () => setFlipHorizontal(!flipHorizontal);

//   const generateFlippedPDF = async () => {
//     const existingPdfBytes = await pdfFile.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     const pages = pdfDoc.getPages();

//     pages.forEach((page) => {
//       if (flipVertical) page.setRotation(page.getRotation() + 180);
//       if (flipHorizontal) page.setRotation(page.getRotation() + 180);
//     });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     // You can now send `blob` to your Django API as FormData
//   };

//   return (
//     <div className="flex flex-col items-center p-4 mt-16">
//       <input
//         type="file"
//         onChange={onFileChange}
//         accept="application/pdf"
//         className="p-2 mb-4 border rounded cursor-pointer"
//       />
//       <div className="flex mb-4 space-x-4">
//         <button
//           onClick={toggleFlipVertical}
//           className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Flip Vertical
//         </button>
//         <button
//           onClick={toggleFlipHorizontal}
//           className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
//         >
//           Flip Horizontal
//         </button>
//         <button
//           onClick={generateFlippedPDF}
//           className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
//         >
//           Generate Flipped PDF
//         </button>
//       </div>
//       {pdfFile && (
//         <Document file={pdfFile}>
//           {Array.from(new Array(pdfFile.numPages), (el, index) => (
//             <Page
//               key={`page_${index + 1}`}
//               pageNumber={index + 1}
//               className={`transition-transform duration-300 ${
//                 flipVertical ? "scale-y-[-1]" : ""
//               } ${flipHorizontal ? "scale-x-[-1]" : ""}`}
//             />
//           ))}
//         </Document>
//       )}
//     </div>
//   );
// };

// export default FlipPdfScreen;

// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { PDFDocument } from "pdf-lib";

// // Set the worker source for pdfjs
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const FlipPdfScreen = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [flipVertical, setFlipVertical] = useState(false);
//   const [flipHorizontal, setFlipHorizontal] = useState(false);

//   const onFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const toggleFlipVertical = () => setFlipVertical(!flipVertical);
//   const toggleFlipHorizontal = () => setFlipHorizontal(!flipHorizontal);

//   const onLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const generateFlippedPDF = async () => {
//     if (!pdfFile) return;

//     const existingPdfBytes = await pdfFile.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     const pages = pdfDoc.getPages();

//     pages.forEach((page) => {
//       if (flipVertical) page.setRotation(page.getRotation() + 180);
//       if (flipHorizontal) page.setRotation(page.getRotation() + 180);
//     });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });

//     // Call Django API to upload the PDF
//     const formData = new FormData();
//     formData.append("file", blob, "flipped.pdf");

//     fetch("http://localhost:8000/api/upload-flipped-pdf/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Upload successful", data);
//       })
//       .catch((error) => {
//         console.error("Error uploading flipped PDF:", error);
//       });
//   };

//   return (
//     <div className="flex flex-col items-center p-4 mt-16">
//       <input
//         type="file"
//         onChange={onFileChange}
//         accept="application/pdf"
//         className="p-2 mb-4 border rounded cursor-pointer"
//       />
//       <div className="flex mb-4 space-x-4">
//         <button
//           onClick={toggleFlipVertical}
//           className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Flip Vertical
//         </button>
//         <button
//           onClick={toggleFlipHorizontal}
//           className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
//         >
//           Flip Horizontal
//         </button>
//         <button
//           onClick={generateFlippedPDF}
//           className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
//         >
//           Generate Flipped PDF
//         </button>
//       </div>
//       {pdfFile && (
//         <Document file={pdfFile} onLoadSuccess={onLoadSuccess}>
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
//             {Array.from(new Array(numPages), (el, index) => (
//               <div
//                 key={`page_${index + 1}`}
//                 className="overflow-hidden border rounded"
//                 style={{
//                   width: "120px", // Fixed width for consistent layout
//                   height: "160px", // Fixed height
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Page
//                   pageNumber={index + 1}
//                   scale={0.6} // Scale the page to fit within the fixed dimensions
//                   className={`transition-transform duration-300 transform ${
//                     flipVertical ? "scale-y-[-1]" : ""
//                   } ${flipHorizontal ? "scale-x-[-1]" : ""}`}
//                   style={{
//                     transformOrigin: "center",
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </Document>
//       )}
//     </div>
//   );
// };

// export default FlipPdfScreen;

// import React, { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { PDFDocument } from "pdf-lib";

// // Set the worker source for pdfjs
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const FlipPdfScreen = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [containerWidth, setContainerWidth] = useState(150); // Default width for each page container
//   const [pageScale, setPageScale] = useState(1); // Scale factor for each page
//   const [flipVertical, setFlipVertical] = useState(false);
//   const [flipHorizontal, setFlipHorizontal] = useState(false);

//   const onFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const toggleFlipVertical = () => setFlipVertical(!flipVertical);
//   const toggleFlipHorizontal = () => setFlipHorizontal(!flipHorizontal);

//   const onLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   useEffect(() => {
//     // Adjust scale dynamically based on container width
//     const adjustScale = () => {
//       const calculatedScale = containerWidth / 600; // Assuming 600 is the average PDF page width in pixels
//       setPageScale(calculatedScale);
//     };

//     adjustScale();
//     window.addEventListener("resize", adjustScale);
//     return () => window.removeEventListener("resize", adjustScale);
//   }, [containerWidth]);

//   const generateFlippedPDF = async () => {
//     if (!pdfFile) return;

//     const existingPdfBytes = await pdfFile.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     const pages = pdfDoc.getPages();

//     pages.forEach((page) => {
//       if (flipVertical) page.setRotation(page.getRotation() + 180);
//       if (flipHorizontal) page.setRotation(page.getRotation() + 180);
//     });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });

//     // Call Django API to upload the PDF
//     const formData = new FormData();
//     formData.append("file", blob, "flipped.pdf");

//     fetch("http://localhost:8000/api/upload-flipped-pdf/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Upload successful", data);
//       })
//       .catch((error) => {
//         console.error("Error uploading flipped PDF:", error);
//       });
//   };

//   return (
//     <div className="flex flex-col items-center p-4 mt-16">
//       <input
//         type="file"
//         onChange={onFileChange}
//         accept="application/pdf"
//         className="p-2 mb-4 border rounded cursor-pointer"
//       />
//       <div className="flex mb-4 space-x-4">
//         <button
//           onClick={toggleFlipVertical}
//           className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Flip Vertical
//         </button>
//         <button
//           onClick={toggleFlipHorizontal}
//           className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
//         >
//           Flip Horizontal
//         </button>
//         <button
//           onClick={generateFlippedPDF}
//           className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
//         >
//           Generate Flipped PDF
//         </button>
//       </div>
//       {pdfFile && (
//         <Document
//           file={pdfFile}
//           onLoadSuccess={onLoadSuccess}
//           loading={<p>Loading PDF...</p>}
//         >
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
//             {Array.from(new Array(numPages), (el, index) => (
//               <div
//                 key={`page_${index + 1}`}
//                 className="flex items-center justify-center overflow-hidden border rounded"
//                 style={{
//                   width: `${containerWidth}px`,
//                   height: `${containerWidth * 1.3}px`, // Maintain aspect ratio
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Page
//                   pageNumber={index + 1}
//                   scale={pageScale} // Use calculated scale to fit content within container
//                   renderMode="canvas" // Use canvas rendering for better performance
//                   className={`transition-transform duration-300 transform ${
//                     flipVertical ? "scale-y-[-1]" : ""
//                   } ${flipHorizontal ? "scale-x-[-1]" : ""}`}
//                   style={{
//                     transformOrigin: "center",
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </Document>
//       )}
//     </div>
//   );
// };

// export default FlipPdfScreen;

// import React, { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { PDFDocument } from "pdf-lib";

// // Set the worker source for pdfjs
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const FlipPdfScreen = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [containerWidth, setContainerWidth] = useState(150); // Default width for each page container
//   const [pageScale, setPageScale] = useState(1.2); // Increase scale for better readability
//   const [flipVertical, setFlipVertical] = useState(false);
//   const [flipHorizontal, setFlipHorizontal] = useState(false);

//   const onFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const toggleFlipVertical = () => setFlipVertical(!flipVertical);
//   const toggleFlipHorizontal = () => setFlipHorizontal(!flipHorizontal);

//   const onLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   useEffect(() => {
//     // Adjust scale dynamically based on container width and a standard PDF page width
//     const adjustScale = () => {
//       const calculatedScale = containerWidth / 500; // Slightly smaller than average page width to improve readability
//       setPageScale(calculatedScale);
//     };

//     adjustScale();
//     window.addEventListener("resize", adjustScale);
//     return () => window.removeEventListener("resize", adjustScale);
//   }, [containerWidth]);

//   const generateFlippedPDF = async () => {
//     if (!pdfFile) return;

//     const existingPdfBytes = await pdfFile.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     const pages = pdfDoc.getPages();

//     pages.forEach((page) => {
//       if (flipVertical) page.setRotation(page.getRotation() + 180);
//       if (flipHorizontal) page.setRotation(page.getRotation() + 180);
//     });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });

//     const formData = new FormData();
//     formData.append("file", blob, "flipped.pdf");

//     fetch("http://localhost:8000/api/upload-flipped-pdf/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.blob())
//       .then((blob) => {
//         const downloadUrl = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = downloadUrl;
//         a.download = "flipped.pdf";
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         console.log("Download successful");
//       })
//       .catch((error) => {
//         console.error("Error uploading flipped PDF:", error);
//       });
//   };

//   return (
//     <div className="flex flex-col items-center p-4 mt-16">
//       <input
//         type="file"
//         onChange={onFileChange}
//         accept="application/pdf"
//         className="p-2 mb-4 border rounded cursor-pointer"
//       />
//       <div className="flex mb-4 space-x-4">
//         <button
//           onClick={toggleFlipVertical}
//           className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Flip Vertical
//         </button>
//         <button
//           onClick={toggleFlipHorizontal}
//           className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
//         >
//           Flip Horizontal
//         </button>
//         <button
//           onClick={generateFlippedPDF}
//           className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
//         >
//           Generate Flipped PDF
//         </button>
//       </div>
//       {pdfFile && (
//         <Document
//           file={pdfFile}
//           onLoadSuccess={onLoadSuccess}
//           loading={<p>Loading PDF...</p>}
//         >
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
//             {Array.from(new Array(numPages), (el, index) => (
//               <div
//                 key={`page_${index + 1}`}
//                 className="flex items-center justify-center border rounded"
//                 style={{
//                   width: `${containerWidth}px`,
//                   height: `${containerWidth * 1.3}px`,

//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Page
//                   pageNumber={index + 1}
//                   scale={pageScale} // Increased scale to make content clearer
//                   //   renderMode="canvas" // Using canvas for better support of text and images
//                   //   className={`transition-transform duration-300 transform ${
//                   //     flipVertical ? "scale-y-[-1]" : ""
//                   //   } ${flipHorizontal ? "scale-x-[-1]" : ""}`}
//                   style={{
//                     transformOrigin: "center",
//                     // width: `${containerWidth}px`,
//                     // height: `${containerWidth * 1.3}px`,
//                     // display: "flex",
//                     // justifyContent: "center",
//                     // alignItems: "center",
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </Document>
//       )}
//     </div>
//   );
// };

// export default FlipPdfScreen;

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rotateDegrees } from "pdf-lib";

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const FlipPdfScreen = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(150); // Default width for each page container
  const [pageScale, setPageScale] = useState(1.2); // Scale factor for each page
  const [flipVertical, setFlipVertical] = useState(false);
  const [flipHorizontal, setFlipHorizontal] = useState(false);

  const onFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const toggleFlipVertical = () => setFlipVertical(!flipVertical);
  const toggleFlipHorizontal = () => setFlipHorizontal(!flipHorizontal);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(Math.min(numPages, 6)); // Limit pages to a maximum of 6
  };

  useEffect(() => {
    // Adjust scale dynamically based on container width and a standard PDF page width
    const adjustScale = () => {
      const calculatedScale = containerWidth / 600; // Adjust based on container width and a typical PDF width
      setPageScale(calculatedScale);
    };

    adjustScale();
    window.addEventListener("resize", adjustScale);
    return () => window.removeEventListener("resize", adjustScale);
  }, [containerWidth]);

  const generateFlippedPDF = async () => {
    if (!pdfFile) return;

    const existingPdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const currentRotation = page.getRotation().angle || 0;

      let newRotation = currentRotation;
      if (flipVertical) {
        newRotation = (newRotation + 180) % 360;
      }
      if (flipHorizontal) {
        newRotation = (newRotation + 180) % 360;
      }

      // Use rotateDegrees to apply the correct rotation format
      page.setRotation(rotateDegrees(newRotation));
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const formData = new FormData();
    formData.append("file", blob, "flipped.pdf");
    formData.append("flipVertical", flipVertical.toString());
    formData.append("flipHorizontal", flipHorizontal.toString());

    fetch("http://192.168.1.13:8000/upload-flipped-pdf/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "flipped.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        console.log("Download successful");
      })
      .catch((error) => {
        console.error("Error uploading flipped PDF:", error);
      });
  };

  return (
    <div className="flex flex-col items-center p-4 mt-16">
      <input
        type="file"
        onChange={onFileChange}
        accept="application/pdf"
        className="p-2 mb-4 border rounded cursor-pointer"
      />
      <div className="flex mb-4 space-x-4">
        <button
          onClick={toggleFlipVertical}
          className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Flip Vertical
        </button>
        <button
          onClick={toggleFlipHorizontal}
          className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
        >
          Flip Horizontal
        </button>
        <button
          onClick={generateFlippedPDF}
          className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
        >
          Generate Flipped PDF
        </button>
      </div>
      {pdfFile && (
        <Document
          file={pdfFile}
          onLoadSuccess={onLoadSuccess}
          loading={<p>Loading PDF...</p>}
        >
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="flex items-center justify-center overflow-hidden border rounded"
                  style={{
                    width: `${containerWidth}px`,
                    height: `${containerWidth * 1.3}px`, // Adjusted height to maintain aspect ratio
                  }}
                >
                  <Page
                    pageNumber={index + 1}
                    scale={pageScale} // Set scale for consistent display
                    renderMode="canvas" // Use canvas for better support of text and images
                    className={`transition-transform duration-300 transform ${
                      flipVertical ? "scale-y-[-1]" : ""
                    } ${flipHorizontal ? "scale-x-[-1]" : ""}`}
                    style={{
                      transformOrigin: "center",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Document>
      )}
    </div>
  );
};

export default FlipPdfScreen;
