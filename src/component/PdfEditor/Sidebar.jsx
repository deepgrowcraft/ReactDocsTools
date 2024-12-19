// import React from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const Sidebar = ({
//   pdfFile,
//   setNumPages,
//   setCurrentPage,
//   currentPage,
//   numPages,
// }) => (
//   <div className="w-1/5 overflow-y-auto bg-gray-200 border-r">
//     <div className="p-4 font-bold text-center border-b">Pages</div>
//     {pdfFile && (
//       <Document
//         file={pdfFile}
//         onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`p-2 border-b cursor-pointer ${
//               currentPage === index + 1 ? "bg-blue-100" : "hover:bg-gray-300"
//             }`}
//           >
//             <Page pageNumber={index + 1} width={100} />
//           </div>
//         ))}
//       </Document>
//     )}
//   </div>
// );

// export default Sidebar;

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const Sidebar = ({
  pdfFile,
  setNumPages,
  setCurrentPage,
  currentPage,
  numPages,
}) => {
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-1/5 overflow-y-auto bg-gray-200 border-r">
      <div className="p-4 font-bold text-center border-b">Pages</div>
      {pdfFile ? (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <div
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`p-2 border-b cursor-pointer ${
                currentPage === index + 1 ? "bg-blue-100" : "hover:bg-gray-300"
              }`}
            >
              <Page pageNumber={index + 1} width={100} />
            </div>
          ))}
        </Document>
      ) : (
        <div className="p-4 text-center text-gray-600">
          No PDF loaded. Please upload a PDF.
        </div>
      )}
    </div>
  );
};

export default Sidebar;
