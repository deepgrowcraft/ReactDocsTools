import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
const PdfViewer = ({ pdfFile, zoom, currentPage }) => (
  <div className="flex items-center justify-center flex-grow bg-gray-50">
    {pdfFile && (
      <Document file={pdfFile}>
        <Page pageNumber={currentPage} scale={zoom} />
      </Document>
    )}
  </div>
);

export default PdfViewer;
