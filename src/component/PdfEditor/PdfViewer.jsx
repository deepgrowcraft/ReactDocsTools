// import React from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
// const PdfViewer = ({ pdfFile, zoom, currentPage }) => (
//   <div className="flex items-center justify-center flex-grow bg-gray-50">
//     {pdfFile && (
//       <Document file={pdfFile}>
//         <Page pageNumber={currentPage} scale={zoom} />
//       </Document>
//     )}
//   </div>
// );

// export default PdfViewer;
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PdfViewer = ({ pdfFile, zoom }) => {
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!pdfFile) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-50">
        <p className="text-gray-600">No PDF loaded. Please upload a PDF.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-y-auto bg-gray-50">
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <div key={index} className="mb-4">
            <Page pageNumber={index + 1} scale={zoom} />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
