// import React, { useState, useRef } from "react";
// import Toolbar from "./Toolbar";
// import Sidebar from "./Sidebar";
// import PdfViewer from "./PdfViewer";
// import AddTextModal from "./AddTextModal";
// import AddImageModal from "./AddImageModal";
// import TextAnnotations from "./TextAnnotations";
// import { PDFDocument, rgb } from "pdf-lib";
// import "../styles/PdfEditor.css";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const PdfEditor = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [zoom, setZoom] = useState(1.0);
//   const [textAnnotations, setTextAnnotations] = useState([]);
//   const [isTextModalOpen, setIsTextModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [newText, setNewText] = useState("");
//   const [fontSize, setFontSize] = useState(16);
//   const [isBold, setIsBold] = useState(false);
//   const [pdfInstance, setPdfInstance] = useState(null);
//   const [isPdfUploaded, setIsPdfUploaded] = useState(false); // New state to track PDF upload
//   const containerRef = useRef(null);
//   const [selectedPdf, setSelectedPdf] = useState(null);

//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     setSelectedPdf(file);
//     if (file && file.type === "application/pdf") {
//       const fileUrl = URL.createObjectURL(file);
//       setPdfFile(fileUrl);
//       setIsPdfUploaded(true); // Set to true once the PDF is uploaded

//       const arrayBuffer = await file.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(arrayBuffer);
//       setPdfInstance(pdfDoc);
//       setNumPages(pdfDoc.getPageCount());
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//   };

//   const savePdf = async () => {
//     if (!pdfInstance) return;
//     const pdfBytes = await pdfInstance.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "edited.pdf";
//     link.click();
//   };

//   const addPage = async () => {
//     if (!pdfInstance) return;

//     pdfInstance.addPage([595.28, 841.89]); // A4 dimensions in points
//     setNumPages(pdfInstance.getPageCount());

//     const pdfBytes = await pdfInstance.save();
//     const updatedFileUrl = URL.createObjectURL(
//       new Blob([pdfBytes], { type: "application/pdf" })
//     );
//     setPdfFile(updatedFileUrl);

//     alert("A new blank page has been added.");
//   };

//   const removePage = async () => {
//     if (!pdfInstance || currentPage > pdfInstance.getPageCount()) return;

//     pdfInstance.removePage(currentPage - 1);
//     setNumPages(pdfInstance.getPageCount());
//     setCurrentPage(Math.max(currentPage - 1, 1));

//     const pdfBytes = await pdfInstance.save();
//     const updatedFileUrl = URL.createObjectURL(
//       new Blob([pdfBytes], { type: "application/pdf" })
//     );
//     setPdfFile(updatedFileUrl);

//     alert("The current page has been removed.");
//   };

//   const addText = async () => {
//     if (!pdfInstance || !newText) return;

//     const page = pdfInstance.getPage(currentPage - 1);
//     const { width, height } = page.getSize();

//     page.drawText(newText, {
//       x: width / 4,
//       y: height / 2,
//       size: fontSize,
//       color: rgb(0, 0, 0),
//       font: await pdfInstance.embedFont(
//         PDFDocument.PDFName.StandardFonts.Helvetica
//       ),
//     });

//     const pdfBytes = await pdfInstance.save();
//     const updatedFileUrl = URL.createObjectURL(
//       new Blob([pdfBytes], { type: "application/pdf" })
//     );
//     setPdfFile(updatedFileUrl);
//     setIsTextModalOpen(false);
//   };

//   const addTextToPdf = async (position) => {
//     if (!pdfInstance || !newText) return;
//     const page = pdfInstance.getPage(currentPage - 1);
//     const { width, height } = page.getSize();

//     page.drawText(newText, {
//       x: position.x,
//       y: height - position.y - 20, // Adjust Y to match the PDF coordinate system
//       size: 16,
//       color: rgb(0, 0, 0),
//     });

//     const pdfBytes = await pdfInstance.save();
//     const updatedFileUrl = URL.createObjectURL(
//       new Blob([pdfBytes], { type: "application/pdf" })
//     );
//     setPdfFile(updatedFileUrl);
//   };

//   // Function to add image to the PDF
//   const addImageToPdf = async (position) => {
//     if (!pdfInstance || !imageUrl) return;
//     const page = pdfInstance.getPage(currentPage - 1);
//     const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
//     const image = await pdfInstance.embedPng(imageBytes);

//     const { width, height } = page.getSize();
//     const imageWidth = 100; // Set image width
//     const imageHeight = 100; // Set image height

//     page.drawImage(image, {
//       x: position.x,
//       y: height - position.y - imageHeight, // Adjust Y coordinate
//       width: imageWidth,
//       height: imageHeight,
//     });

//     const pdfBytes = await pdfInstance.save();
//     const updatedFileUrl = URL.createObjectURL(
//       new Blob([pdfBytes], { type: "application/pdf" })
//     );
//     setPdfFile(updatedFileUrl);
//   };

//   return (
//     <div className="flex flex-col h-screen mt-20 bg-gray-100">
//       {/* Conditional Rendering: Show upload button if no PDF is uploaded */}
//       {!isPdfUploaded ? (
//         // <div className="flex flex-col items-center justify-center h-full space-y-4">
//         //   <label className="px-6 py-3 text-lg text-white transition duration-200 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
//         //     Upload PDF
//         //     <input
//         //       type="file"
//         //       accept="application/pdf"
//         //       onChange={handlePdfUpload}
//         //       className="hidden"
//         //     />
//         //   </label>
//         // </div>

//         <>
//           <div className="container mx-auto text-center mt-28">
//             <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl ">
//               Edit PDF
//             </h1>
//             <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//               This online PDF editor lets you make changes directly to your PDF
//               document. You can insert text, images, and draw shapes such as
//               boxes, circles, and arrows. Additionally, you have the option to
//               highlight text or apply a watermark to your PDF.
//             </p>

//             <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
//               <div
//                 className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl"
//                 style={{
//                   backgroundImage: "url('/pdfIcon/PdfBg.svg')", // Background image for visual effect
//                   backgroundSize: "contain",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   height: "200px",
//                 }}
//               >
//                 <div className="flex items-center justify-center h-full">
//                   <img
//                     src="/pdfIcon/editPdfs.svg" // Icon for PDF to PPT
//                     alt="Upload Icon"
//                     className="h-20 w-22"
//                   />
//                 </div>
//               </div>

//               <div className="relative mb-4 group">
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   onChange={handlePdfUpload}
//                   aria-label="File Upload"
//                 />
//                 <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105">
//                   <img
//                     src="/home/addFile.svg"
//                     alt="Add File Icon"
//                     className="w-5 h-5"
//                   />
//                   <span>
//                     {selectedPdf
//                       ? `File selected: ${selectedPdf.name}`
//                       : "Choose PDF File"}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <Toolbar
//             zoom={zoom}
//             setZoom={setZoom}
//             setIsTextModalOpen={setIsTextModalOpen}
//             setIsImageModalOpen={setIsImageModalOpen}
//             onSave={savePdf}
//             onUpload={handlePdfUpload}
//             onAddPage={addPage}
//             onRemovePage={removePage}
//           />

//           <DraggableText
//             newText={newText}
//             fontSize={16}
//             onDropText={addTextToPdf}
//           />

//           {/* Draggable Image */}
//           {imageUrl && (
//             <DraggableImage imageUrl={imageUrl} onDropImage={addImageToPdf} />
//           )}
//           <div className="flex flex-grow overflow-hidden">
//             <Sidebar
//               pdfFile={pdfFile}
//               setNumPages={setNumPages}
//               setCurrentPage={setCurrentPage}
//               currentPage={currentPage}
//               numPages={numPages}
//             />
//             <PdfViewer
//               pdfFile={pdfFile}
//               zoom={zoom}
//               currentPage={currentPage}
//               containerRef={containerRef}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal for adding text or image */}
//       {isTextModalOpen && (
//         <AddTextModal
//           setIsTextModalOpen={setIsTextModalOpen}
//           newText={newText}
//           setNewText={setNewText}
//           onAddText={addText}
//         />
//       )}
//       {isImageModalOpen && (
//         <AddImageModal setIsImageModalOpen={setIsImageModalOpen} />
//       )}
//       <TextAnnotations textAnnotations={textAnnotations} zoom={zoom} />
//     </div>
//   );
// };

// export default PdfEditor;

import React, { useState, useRef } from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import PdfViewer from "./PdfViewer";
import AddTextModal from "./AddTextModal";
import AddImageModal from "./AddImageModal";
import TextAnnotations from "./TextAnnotations";
import { PDFDocument, rgb } from "pdf-lib";
import "../styles/PdfEditor.css";
import { Document, Page, pdfjs } from "react-pdf";
import DraggableText from "./DraggleText";
import DraggableImage from "./DraggleImgae";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PdfEditor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [pdfInstance, setPdfInstance] = useState(null);
  const [isPdfUploaded, setIsPdfUploaded] = useState(false); // New state to track PDF upload
  const containerRef = useRef(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [draggableTextEnabled, setDraggableTextEnabled] = useState(false);
  const [draggableImageEnabled, setDraggableImageEnabled] = useState(false);

  const handleAddText = () => {
    setDraggableTextEnabled(true); // Enable draggable text
    setDraggableImageEnabled(false); // Disable draggable image
  };

  const handleAddImage = () => {
    setDraggableImageEnabled(true); // Enable draggable image
    setDraggableTextEnabled(false); // Disable draggable text
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedPdf(file);
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      setIsPdfUploaded(true); // Set to true once the PDF is uploaded

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPdfInstance(pdfDoc);
      setNumPages(pdfDoc.getPageCount());
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const savePdf = async () => {
    if (!pdfInstance) return;
    const pdfBytes = await pdfInstance.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited.pdf";
    link.click();
  };

  const addPage = async () => {
    if (!pdfInstance) return;

    pdfInstance.addPage([595.28, 841.89]); // A4 dimensions in points
    setNumPages(pdfInstance.getPageCount());

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    alert("A new blank page has been added.");
  };

  const removePage = async () => {
    if (!pdfInstance || currentPage > pdfInstance.getPageCount()) return;

    pdfInstance.removePage(currentPage - 1);
    setNumPages(pdfInstance.getPageCount());
    setCurrentPage(Math.max(currentPage - 1, 1));

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    alert("The current page has been removed.");
  };

  const addText = async () => {
    if (!pdfInstance || !newText) return;

    const page = pdfInstance.getPage(currentPage - 1);
    const { width, height } = page.getSize();

    page.drawText(newText, {
      x: width / 4,
      y: height / 2,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: await pdfInstance.embedFont(
        PDFDocument.PDFName.StandardFonts.Helvetica
      ),
    });

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);
    setIsTextModalOpen(false);
  };

  const addTextToPdf = async (position) => {
    if (!pdfInstance || !newText) return;
    const page = pdfInstance.getPage(currentPage - 1);
    const { width, height } = page.getSize();

    page.drawText(newText, {
      x: position.x,
      y: height - position.y - 20, // Adjust Y to match the PDF coordinate system
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);
  };

  // Function to add image to the PDF
  const addImageToPdf = async (position) => {
    if (!pdfInstance || !imageUrl) return;
    const page = pdfInstance.getPage(currentPage - 1);
    const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const image = await pdfInstance.embedPng(imageBytes);

    const { width, height } = page.getSize();
    const imageWidth = 100; // Set image width
    const imageHeight = 100; // Set image height

    page.drawImage(image, {
      x: position.x,
      y: height - position.y - imageHeight, // Adjust Y coordinate
      width: imageWidth,
      height: imageHeight,
    });

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);
  };

  return (
    <div className="flex flex-col h-screen mt-20 bg-gray-100">
      {/* Conditional Rendering: Show upload button if no PDF is uploaded */}
      {!isPdfUploaded ? (
        // <div className="flex flex-col items-center justify-center h-full space-y-4">
        //   <label className="px-6 py-3 text-lg text-white transition duration-200 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
        //     Upload PDF
        //     <input
        //       type="file"
        //       accept="application/pdf"
        //       onChange={handlePdfUpload}
        //       className="hidden"
        //     />
        //   </label>
        // </div>

        <>
          <div className="container mx-auto text-center mt-28">
            <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl ">
              Edit PDF
            </h1>
            <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
              This online PDF editor lets you make changes directly to your PDF
              document. You can insert text, images, and draw shapes such as
              boxes, circles, and arrows. Additionally, you have the option to
              highlight text or apply a watermark to your PDF.
            </p>

            <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
              <div
                className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl"
                style={{
                  backgroundImage: "url('/pdfIcon/PdfBg.svg')", // Background image for visual effect
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "200px",
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <img
                    src="/pdfIcon/editPdfs.svg" // Icon for PDF to PPT
                    alt="Upload Icon"
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
          </div>
        </>
      ) : (
        <>
          <Toolbar
            zoom={zoom}
            setZoom={setZoom}
            setIsTextModalOpen={setIsTextModalOpen}
            setIsImageModalOpen={setIsImageModalOpen}
            onSave={savePdf}
            onUpload={handlePdfUpload}
            onAddPage={addPage}
            onRemovePage={removePage}
            onAddText={handleAddText} // Pass handleAddText
            onAddImage={handleAddImage} // Pass handleAddImage
          />

          {/* Only render DraggableText if enabled */}
          {draggableTextEnabled && (
            <DraggableText
              newText={newText}
              fontSize={16}
              onDropText={addTextToPdf}
            />
          )}

          {/* Only render DraggableImage if enabled */}
          {draggableImageEnabled && (
            <DraggableImage imageUrl={imageUrl} onDropImage={addImageToPdf} />
          )}

          <div className="flex flex-grow overflow-hidden">
            <Sidebar
              pdfFile={pdfFile}
              setNumPages={setNumPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              numPages={numPages}
            />
            <PdfViewer
              pdfFile={pdfFile}
              zoom={zoom}
              currentPage={currentPage}
              containerRef={containerRef}
            />
          </div>
        </>
      )}

      {/* Modal for adding text or image */}
      {isTextModalOpen && (
        <AddTextModal
          setIsTextModalOpen={setIsTextModalOpen}
          newText={newText}
          setNewText={setNewText}
          onAddText={addText}
        />
      )}
      {isImageModalOpen && (
        <AddImageModal setIsImageModalOpen={setIsImageModalOpen} />
      )}
      <TextAnnotations textAnnotations={textAnnotations} zoom={zoom} />
    </div>
  );
};

export default PdfEditor;
