import React from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    name: "Word to PDF",
    description: "Transform DOC and DOCX files into PDFs.",
    icon: <img src="../home/wordTopdf.svg" alt="wordTopdf" className="h-15" />,
    path: "/docToPdf",
  },
  {
    name: "Excel to PDF",
    description: "Convert Excel files into PDF format.",
    icon: <img src="../home/exelToPdf.svg" alt="exelToPdf" className="h-15" />,
    path: "/ExelToPdfScreen",
  },
  {
    name: "PPT to PDF",
    description: "Convert PowerPoint files into PDF.",
    icon: <img src="../home/pptToPdf.svg" alt="pptToPdf" className="h-15" />,
    path: "/PptToPdfScreen",
  },
  {
    name: "IMAGE to PDF",
    description: "Convert images into PDF format.",
    icon: (
      <img src="../home/imageToPdf.svg" alt="imageToPdf" className="h-15" />
    ),
    path: "/ImageToPdfScreen",
  },
  {
    name: "HTML to PDF",
    description: "Convert HTML files into PDFs.",
    path: "/HtmlToPdfScreen",
    icon: <img src="../home/htmlToPdf.svg" alt="htmlToPdf" className="h-15" />,
  },
  {
    name: "PDF OCR",
    description: "Convert scanned PDFs to editable text.",
    icon: <img src="../home/pdfOCR.svg" alt="pdfOCR" className="h-15" />,
    path: "/PdfOCRScreen",
  },
  {
    name: "PDF to Word",
    description: "Convert PDF files into DOC or DOCX.",
    icon: <img src="../home/pdfToWord.svg" alt="pdfToWord" className="h-15" />,
    path: "/PdfToWordScreen",
  },
  {
    name: "PDF to Excel",
    description: "Convert PDF files into Excel sheets.",
    icon: <img src="../home/pdfToExel.svg" alt="pdfToExel" className="h-15" />,
    path: "/PdfToExelScreen",
  },
  {
    name: "PDF to PPT",
    description: "Convert PDF files into PowerPoint slides.",
    icon: <img src="../home/pdfToppt.svg" alt="pdfToppt" className="h-15" />,
    path: "/PdfToPPTScreen",
  },
  {
    name: "PDF to TEXT",
    description: "Extract text from PDF files.",
    icon: <img src="../home/PdfToTxt.svg" alt="pdfToTxt" className="h-15" />,
    path: "/PdfToTxtScreen",
  },
  {
    name: "PDF to IMAGE",
    description: "Convert PDF pages into image files.",
    icon: (
      <img src="../home/pdfToImage.svg" alt="pdfToImage" className="h-15" />
    ),
    path: "/PdfToImageScreen",
  },
  {
    name: "Merge PDF",
    description: "Merge multiple PDFs into one file.",
    icon: <img src="../home/mergePdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/MergePdfScreen",
  },
  {
    name: "Split PDF",
    description: "Split a PDF into multiple parts.",
    icon: <img src="../home/splitPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/SplitPdfScreen",
  },
  {
    name: "Compress PDF",
    description: "Compress the size of your PDFs.",
    icon: <img src="../home/compressPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/CompressPdfScreen",
  },
  {
    name: "Flip PDF Pages",
    description: "Flip through PDF pages interactively.",
    icon: <img src="../home/flipPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/FlipPdfScreen",
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
const strokeColors = ["#FFB3B3", "#B3FFCC", "#B3D9FF", "#FFCCF2"];

const ToolsGrid = () => {
  const navigate = useNavigate(); // Use the navigate hook

  return (
    <section className="py-16 bg-gray-100">
      {/* Header Section */}
      <div className="container mx-auto mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-800">
          Free Online Document Conversion Made Easy
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Effortlessly convert your documents with our free online tools.
          Whether you need to change formats or compress files, our service
          makes it quick and easy—all without any cost.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => navigate(tool.path)} // Add onClick to navigate to the tool's path
              className="relative p-6 text-center transition-all duration-300 transform bg-white shadow-lg cursor-pointer rounded-xl hover:scale-105 hover:shadow-2xl group hover:-translate-y-2 hover:rotate-1" // Add cursor-pointer for indication
              style={{
                perspective: "1000px", // Adds a 3D perspective for tilt effect
              }}
            >
              {/* Top-right curved stroke */}
              <div
                className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
                style={{
                  borderTopRightRadius: "10px",
                  borderRight: `2px solid ${
                    strokeColors[index % strokeColors.length]
                  }`,
                  borderTop: `2px solid ${
                    strokeColors[index % strokeColors.length]
                  }`,
                }}
              ></div>

              {/* Bottom-left curved stroke */}
              <div
                className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none"
                style={{
                  borderBottomLeftRadius: "10px",
                  borderLeft: `2px solid ${
                    strokeColors[index % strokeColors.length]
                  }`,
                  borderBottom: `2px solid ${
                    strokeColors[index % strokeColors.length]
                  }`,
                }}
              ></div>

              {/* Icon and Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 p-2 mx-auto mb-4 transition-all duration-300 bg-blue-100 rounded-full group-hover:bg-blue-500 group-hover:shadow-lg group-hover:scale-110 group-hover:translate-y-1">
                  {tool.icon}
                </div>

                {/* Tool Name */}
                <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-white">
                  {tool.name}
                </h3>

                {/* Tool Description */}
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-200">
                  {tool.description}
                </p>
              </div>

              {/* Hover Background Overlay */}
              <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-tr from-blue-400 to-blue-700 group-hover:opacity-100 rounded-xl"></div>

              {/* Border Transition */}
              <div className="absolute inset-0 transition-all duration-300 border-2 border-transparent rounded-xl group-hover:border-blue-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
