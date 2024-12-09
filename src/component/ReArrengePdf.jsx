// import React, { useState, useRef } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { PDFDocument } from "pdf-lib";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const RearrangePdf = () => {
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [pdfPages, setPdfPages] = useState([]);
//   const [isRearranging, setIsRearranging] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [rearrangedPdfUrl, setRearrangedPdfUrl] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const fileInputRef = useRef(null);

//   const handlePdfUpload = (event) => {
//     const file = event.target.files[0];
//     setSelectedPdf(file);
//     setRearrangedPdfUrl(null);
//     setSuccessMessage("");
//     setProgress(0);
//     setPdfPages([]); // Reset the pages
//     console.log("PDF selected:", file);

//     // Load PDF file and extract its pages
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const pdfData = reader.result;
//         await loadPdfPages(pdfData);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   // Load PDF pages and generate thumbnails
//   const loadPdfPages = async (pdfData) => {
//     const pdfDoc = await pdfjs.getDocument(pdfData).promise;
//     const numPages = pdfDoc.numPages;
//     const pages = [];

//     for (let i = 1; i <= numPages; i++) {
//       const page = await pdfDoc.getPage(i);
//       const viewport = page.getViewport({ scale: 0.2 }); // Scale down the page for the thumbnail
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.height = viewport.height;
//       canvas.width = viewport.width;
//       await page.render({ canvasContext: context, viewport }).promise;
//       const thumbnailUrl = canvas.toDataURL();
//       pages.push({ id: i, thumbnail: thumbnailUrl });
//     }

//     setPdfPages(pages);
//   };

//   const rearrangePdf = async () => {
//     if (!selectedPdf || pdfPages.length === 0) return;

//     setIsRearranging(true);
//     setProgress(0);

//     try {
//       // Create a new PDF document using pdf-lib
//       const pdfDoc = await PDFDocument.load(await selectedPdf.arrayBuffer());

//       // Reorder the pages based on the user's arrangement (assuming the order is stored in pdfPages)
//       const newPdf = await PDFDocument.create();
//       for (const page of pdfPages) {
//         const [copiedPage] = await newPdf.copyPages(pdfDoc, [page.id - 1]); // Adjust for 0-indexing
//         newPdf.addPage(copiedPage);
//       }

//       // Serialize the new PDF
//       const newPdfBytes = await newPdf.save();
//       const pdfUrl = URL.createObjectURL(
//         new Blob([newPdfBytes], { type: "application/pdf" })
//       );

//       setRearrangedPdfUrl(pdfUrl);
//       setSuccessMessage("Rearrangement complete! Your PDF is ready.");
//     } catch (error) {
//       console.error("PDF rearrangement failed:", error);
//     } finally {
//       setIsRearranging(false);
//     }
//   };

//   // Handle the drag start event to track the dragged item
//   const handleDragStart = (e, index) => {
//     e.dataTransfer.setData("draggedItem", index);
//   };

//   // Handle the drag over event to allow dropping
//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   // Handle the drop event to reorder the pages
//   const handleDrop = (e, dropIndex) => {
//     const draggedIndex = e.dataTransfer.getData("draggedItem");
//     const updatedPages = [...pdfPages];
//     const draggedItem = updatedPages[draggedIndex];

//     // Remove the dragged item and insert it at the dropped position
//     updatedPages.splice(draggedIndex, 1);
//     updatedPages.splice(dropIndex, 0, draggedItem);

//     setPdfPages(updatedPages);
//   };

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Rearrange PDF Pages
//         </h1>
//         <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//           Rearrange pages in your PDF document for better organization.
//         </p>

//         <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
//           <div className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl">
//             <div className="flex items-center justify-center h-full">
//               <img
//                 src="/pdfIcon/editPdfs.svg"
//                 alt="Upload Icon"
//                 className="h-20 w-22"
//               />
//             </div>
//           </div>

//           <div className="relative mb-4 group">
//             <input
//               type="file"
//               accept="application/pdf"
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               onChange={handlePdfUpload}
//               ref={fileInputRef}
//               aria-label="File Upload"
//             />
//             <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105">
//               <img
//                 src="/home/addFile.svg"
//                 alt="Add File Icon"
//                 className="w-5 h-5"
//               />
//               <span>
//                 {selectedPdf
//                   ? `File selected: ${selectedPdf.name}`
//                   : "Choose PDF File"}
//               </span>
//             </button>
//           </div>

//           {pdfPages.length > 0 && (
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Rearrange Pages
//               </h2>
//               <div className="grid grid-cols-6 gap-4 mt-4">
//                 {pdfPages.map((page, index) => (
//                   <div
//                     key={page.id}
//                     className="p-2 bg-gray-100 rounded-lg shadow-md cursor-pointer"
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, index)}
//                     onDragOver={handleDragOver}
//                     onDrop={(e) => handleDrop(e, index)}
//                   >
//                     <img
//                       src={page.thumbnail}
//                       alt={`Page ${page.id}`}
//                       className="object-cover w-full h-32 rounded-md"
//                     />
//                     <p className="mt-2 text-center">Page {page.id}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {selectedPdf && (
//             <button
//               onClick={rearrangePdf}
//               disabled={isRearranging}
//               className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
//                 isRearranging ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isRearranging ? "Rearranging..." : "Rearrange PDF"}
//             </button>
//           )}
//         </div>

//         {isRearranging && (
//           <div className="w-20 mx-auto my-8">
//             <div
//               className="circular-progress-bar"
//               style={{ position: "relative", width: "80px", height: "80px" }}
//             >
//               <div
//                 className="circular-progress"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   background: `conic-gradient(#4caf50 ${progress}%, #d6d6d6 ${progress}%)`,
//                   borderRadius: "50%",
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                 }}
//               >
//                 <span
//                   style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {progress}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {successMessage && (
//           <p className="mt-6 text-xl font-bold text-green-600 animate-bounce">
//             {successMessage}
//           </p>
//         )}

//         {rearrangedPdfUrl && (
//           <div className="mt-12">
//             <a
//               href={rearrangedPdfUrl}
//               download="rearranged_document.pdf"
//               className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 hover:scale-105"
//             >
//               Download Rearranged PDF
//             </a>
//             <p className="mt-4 text-sm text-gray-600">
//               Your rearranged PDF is ready for download!
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default RearrangePdf;

import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const RearrangePdf = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [isRearranging, setIsRearranging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rearrangedPdfUrl, setRearrangedPdfUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef(null);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);
    setRearrangedPdfUrl(null);
    setSuccessMessage("");
    setProgress(0);
    setPdfPages([]); // Reset the pages
    console.log("PDF selected:", file);

    // Load PDF file and extract its pages
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const pdfData = reader.result;
        await loadPdfPages(pdfData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Load PDF pages and generate thumbnails
  const loadPdfPages = async (pdfData) => {
    const pdfDoc = await pdfjs.getDocument(pdfData).promise;
    const numPages = pdfDoc.numPages;
    const pages = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 0.2 }); // Scale down the page for the thumbnail
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      const thumbnailUrl = canvas.toDataURL();
      pages.push({ id: i, thumbnail: thumbnailUrl });
    }

    setPdfPages(pages);
  };

  const rearrangePdf = async () => {
    if (!selectedPdf || pdfPages.length === 0) return;

    setIsRearranging(true);
    setProgress(0);

    try {
      // Create a new PDF document using pdf-lib
      const pdfDoc = await PDFDocument.load(await selectedPdf.arrayBuffer());

      // Reorder the pages based on the user's arrangement (assuming the order is stored in pdfPages)
      const newPdf = await PDFDocument.create();
      for (const page of pdfPages) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [page.id - 1]); // Adjust for 0-indexing
        newPdf.addPage(copiedPage);
      }

      // Serialize the new PDF
      const newPdfBytes = await newPdf.save();
      const pdfUrl = URL.createObjectURL(
        new Blob([newPdfBytes], { type: "application/pdf" })
      );

      setRearrangedPdfUrl(pdfUrl);
      setSuccessMessage("Rearrangement complete! Your PDF is ready.");
    } catch (error) {
      console.error("PDF rearrangement failed:", error);
    } finally {
      setIsRearranging(false);
    }
  };

  // Handle the drag start event to track the dragged item
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedItem", index);
  };

  // Handle the drag over event to allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle the drop event to reorder the pages
  const handleDrop = (e, dropIndex) => {
    const draggedIndex = e.dataTransfer.getData("draggedItem");
    const updatedPages = [...pdfPages];
    const draggedItem = updatedPages[draggedIndex];

    // Remove the dragged item and insert it at the dropped position
    updatedPages.splice(draggedIndex, 1);
    updatedPages.splice(dropIndex, 0, draggedItem);

    setPdfPages(updatedPages);
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Rearrange PDF Pages
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Rearrange pages in your PDF document for better organization.
        </p>

        <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
          <div className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl">
            <div className="flex items-center justify-center h-full">
              <img
                src="/pdfIcon/editPdfs.svg"
                alt="Upload Icon"
                className="h-20 transition-all transform w-22 hover:scale-105"
              />
            </div>
          </div>

          <div className="relative mb-4 group">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handlePdfUpload}
              ref={fileInputRef}
              aria-label="File Upload"
            />
            <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105">
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

          {pdfPages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Rearrange Pages
              </h2>
              <div className="grid grid-cols-6 gap-4 mx-auto mt-4 max-w-7xl">
                {pdfPages.map((page, index) => (
                  <div
                    key={page.id}
                    className="p-2 transition-all transform bg-gray-100 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:shadow-xl"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <img
                      src={page.thumbnail}
                      alt={`Page ${page.id}`}
                      className="object-cover w-full h-32 transition-all transform rounded-md hover:scale-110"
                    />
                    <p className="mt-2 text-center text-gray-600">
                      Page {page.id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedPdf && (
            <button
              onClick={rearrangePdf}
              disabled={isRearranging}
              className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isRearranging ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isRearranging ? "Rearranging..." : "Rearrange PDF"}
            </button>
          )}
        </div>

        {isRearranging && (
          <div className="w-20 mx-auto my-8">
            <div
              className="circular-progress-bar"
              style={{ position: "relative", width: "80px", height: "80px" }}
            >
              <div
                className="circular-progress"
                style={{
                  width: "100%",
                  height: "100%",
                  background: `conic-gradient(#4caf50 ${progress}%, #d6d6d6 ${progress}%)`,
                  borderRadius: "50%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                  }}
                >
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <p className="mt-6 text-xl font-bold text-green-600 animate-bounce">
            {successMessage}
          </p>
        )}

        {rearrangedPdfUrl && (
          <div className="mt-12">
            <a
              href={rearrangedPdfUrl}
              download="rearranged_document.pdf"
              className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 hover:scale-105"
            >
              Download Rearranged PDF
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Your rearranged PDF is ready for download!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RearrangePdf;
