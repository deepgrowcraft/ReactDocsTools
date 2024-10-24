// import React from "react";

// const tools = [
//   {
//     name: "Word to PDF",
//     description: "Transform DOC and DOCX files into PDFs.",
//   },
//   { name: "Excel to PDF", description: "Convert Excel files into PDF format." },
//   { name: "PPT to PDF", description: "Convert PowerPoint files into PDF." },
//   { name: "IMAGE to PDF", description: "Convert images into PDF format." },
//   { name: "HTML to PDF", description: "Convert HTML files into PDFs." },
//   { name: "PDF OCR", description: "Convert scanned PDFs to editable text." },
//   { name: "PDF to Word", description: "Convert PDF files into DOC or DOCX." },
//   { name: "PDF to Excel", description: "Convert PDF files into Excel sheets." },
//   {
//     name: "PDF to PPT",
//     description: "Convert PDF files into PowerPoint slides.",
//   },
//   { name: "PDF to TEXT", description: "Extract text from PDF files." },
//   { name: "PDF to IMAGE", description: "Convert PDF pages into image files." },
//   { name: "Merge PDF", description: "Merge multiple PDFs into one file." },
//   { name: "Split PDF", description: "Split a PDF into multiple parts." },
//   { name: "Compress PDF", description: "Compress the size of your PDFs." },
//   {
//     name: "Flip PDF Pages",
//     description: "Flip through PDF pages interactively.",
//   },
//   {
//     name: "Remove PDF Pages",
//     description: "Delete specific pages from a PDF.",
//   },
//   { name: "PDF Scanner", description: "Scan documents and save them as PDFs." },
//   {
//     name: "Extract PDF Content",
//     description: "Extract text and images from PDFs.",
//   },
//   { name: "Rotate PDF", description: "Rotate PDF pages." },
//   { name: "Crop PDF", description: "Crop the margins of PDF files." },
//   { name: "Edit PDF", description: "Edit text and images in PDFs." },
//   { name: "Rearrange PDF", description: "Reorder the pages in a PDF file." },
//   { name: "PDF Creator", description: "Create a new PDF from scratch." },
//   { name: "Add Page Number", description: "Add page numbers to a PDF." },
//   { name: "Add Watermark", description: "Add a watermark to your PDF." },
//   { name: "Unlock PDF", description: "Unlock password-protected PDFs." },
//   { name: "Protect PDF", description: "Encrypt your PDF files." },
//   { name: "eSign PDF", description: "Electronically sign PDF documents." },
// ];

// const ToolsGrid = () => {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto text-center mb-12">
//         <h2 className="text-4xl font-bold mb-4">
//           Free Online Document Conversion Made Easy
//         </h2>
//         <p className="text-lg text-gray-600">
//           Effortlessly convert your documents with our free online tools.
//           Whether you need to change formats or compress files, our service
//           makes it quick and easy—all without any cost.
//         </p>
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {tools.map((tool, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-semibold mb-2 text-blue-600">
//                 {tool.name}
//               </h3>
//               <p className="text-gray-500">{tool.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ToolsGrid;

import React from "react";
// Import custom icons from React Icons or use custom SVG icons
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaImage,
  FaLock,
  FaUnlock,
  FaSignature,
  FaCompressAlt,
} from "react-icons/fa";

const tools = [
  {
    name: "Word to PDF",
    description: "Transform DOC and DOCX files into PDFs.",
    icon: <img src="../home/wordTopdf.svg" alt="wordTopdf" className="h-15" />,
  },
  {
    name: "Excel to PDF",
    description: "Convert Excel files into PDF format.",
    icon: <img src="../home/exelToPdf.svg" alt="exelToPdf" className="h-15" />,
  },
  {
    name: "PPT to PDF",
    description: "Convert PowerPoint files into PDF.",
    icon: <img src="../home/pptToPdf.svg" alt="pptToPdf" className="h-15" />,
  },
  {
    name: "IMAGE to PDF",
    description: "Convert images into PDF format.",
    icon: (
      <img src="../home/imageToPdf.svg" alt="imageToPdf" className="h-15" />
    ),
  },
  {
    name: "HTML to PDF",
    description: "Convert HTML files into PDFs.",
    icon: <img src="../home/htmlToPdf.svg" alt="htmlToPdf" className="h-15" />,
  },
  {
    name: "PDF OCR",
    description: "Convert scanned PDFs to editable text.",
    icon: <img src="../home/pdfOCR.svg" alt="pdfOCR" className="h-15" />,
  },
  {
    name: "PDF to Word",
    description: "Convert PDF files into DOC or DOCX.",
    icon: <img src="../home/pdfToWord.svg" alt="pdfToWord" className="h-15" />,
  },
  {
    name: "PDF to Excel",
    description: "Convert PDF files into Excel sheets.",
    icon: <img src="../home/pdfToExel.svg" alt="pdfToExel" className="h-15" />,
  },
  {
    name: "PDF to PPT",
    description: "Convert PDF files into PowerPoint slides.",
    icon: <img src="../home/pdfToppt.svg" alt="pdfToppt" className="h-15" />,
  },
  {
    name: "PDF to TEXT",
    description: "Extract text from PDF files.",
    icon: <img src="../home/PdfToTxt.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "PDF to IMAGE",
    description: "Convert PDF pages into image files.",
    icon: (
      <img src="../home/pdfToImage.svg" alt="pdfToImage" className="h-15" />
    ),
  },
  {
    name: "Merge PDF",
    description: "Merge multiple PDFs into one file.",
    icon: <img src="../home/mergePdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Split PDF",
    description: "Split a PDF into multiple parts.",
    icon: <img src="../home/splitPdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Compress PDF",
    description: "Compress the size of your PDFs.",
    icon: <img src="../home/compressPdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Flip PDF Pages",
    description: "Flip through PDF pages interactively.",
    icon: <img src="../home/flipPdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Remove PDF Pages",
    description: "Delete specific pages from a PDF.",
    icon: <img src="../home/removePdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "PDF Scanner",
    description: "Scan documents and save them as PDFs.",
    icon: <img src="../home/pdfScanner.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Extract PDF Content",
    description: "Extract text and images from PDFs.",
    icon: (
      <img
        src="../home/extractPdfContent.svg"
        alt="pdfToTxt"
        className="h-15"
      />
    ),
  },
  {
    name: "Rotate PDF",
    description: "Rotate PDF pages.",
    icon: <img src="../home/rotatePdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Crop PDF",
    description: "Crop the margins of PDF files.",
    icon: <img src="../home/cropPdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Edit PDF",
    description: "Edit text and images in PDFs.",
    icon: <img src="../home/editPdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Rearrange PDF",
    description: "Reorder the pages in a PDF file.",
    icon: (
      <img src="../home/rearrangePdf.svg" alt="pdfToTxt" className="h-15" />
    ),
  },
  {
    name: "PDF Creator",
    description: "Create a new PDF from scratch.",
    icon: <img src="../home/pdfCreation.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Add Page Number",
    description: "Add page numbers to a PDF.",
    icon: (
      <img src="../home/AddPageNumber.svg" alt="pdfToTxt" className="h-15" />
    ),
  },
  {
    name: "Add Watermark",
    description: "Add a watermark to your PDF.",
    icon: (
      <img src="../home/addWaterMark.svg" alt="pdfToTxt" className="h-15" />
    ),
  },
  {
    name: "Unlock PDF",
    description: "Unlock password-protected PDFs.",
    icon: <img src="../home/pdfUnlock.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "Protect PDF",
    description: "Encrypt your PDF files.",
    icon: <img src="../home/lockPdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  {
    name: "eSign PDF",
    description: "Electronically sign PDF documents.",
    icon: <img src="../home/eSignPdf.svg" alt="pdfToTxt" className="h-15" />,
  },
];

const ToolsGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Free Online Document Conversion Made Easy
        </h2>
        <p className="text-lg text-gray-600">
          Effortlessly convert your documents with our free online tools.
          Whether you need to change formats or compress files, our service
          makes it quick and easy—all without any cost.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-2xl hover:scale-105 transition transform duration-300 ease-in-out group"
            >
              {/* Custom Icon */}
              <div className="text-5xl text-blue-600 mb-4 group-hover:text-blue-700 transition duration-300">
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600 group-hover:text-blue-700 transition duration-300">
                {tool.name}
              </h3>
              <p className="text-gray-500">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
