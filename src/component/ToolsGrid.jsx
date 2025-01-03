import React from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    name: "Word to PDF",
    description: "Transform DOC and DOCX files into PDFs.",
    icon: <img src="../home/wordTopdf.svg" alt="wordTopdf" className="h-15" />,
    path: "/doc-to-pdf",
  },
  {
    name: "Excel to PDF",
    description: "Convert Excel files into PDF format.",
    icon: <img src="../home/exelToPdf.svg" alt="exelToPdf" className="h-15" />,
    path: "/exel-to-pdf",
  },
  {
    name: "PPT to PDF",
    description: "Convert PowerPoint files into PDF.",
    icon: <img src="../home/pptToPdf.svg" alt="pptToPdf" className="h-15" />,
    path: "/ppt-to-pdf",
  },
  {
    name: "IMAGE to PDF",
    description: "Convert images into PDF format.",
    icon: (
      <img src="../home/imageToPdf.svg" alt="imageToPdf" className="h-15" />
    ),
    path: "/image-to-pdf",
  },
  {
    name: "HTML to PDF",
    description: "Convert HTML files into PDFs.",
    path: "/html-to-pdf",
    icon: <img src="../home/htmlToPdf.svg" alt="htmlToPdf" className="h-15" />,
  },
  {
    name: "PDF OCR",
    description: "Convert scanned PDFs to editable text.",
    icon: <img src="../home/pdfOCR.svg" alt="pdfOCR" className="h-15" />,
    path: "/pdf-ocr",
  },
  {
    name: "PDF to Word",
    description: "Convert PDF files into DOC or DOCX.",
    icon: <img src="../home/pdfToWord.svg" alt="pdfToWord" className="h-15" />,
    path: "/pdf-to-word",
  },
  {
    name: "PDF to Excel",
    description: "Convert PDF files into Excel sheets.",
    icon: <img src="../home/pdfToExel.svg" alt="pdfToExel" className="h-15" />,
    path: "/pdf-to-exel",
  },
  {
    name: "PDF to PPT",
    description: "Convert PDF files into PowerPoint slides.",
    icon: <img src="../home/pdfToppt.svg" alt="pdfToppt" className="h-15" />,
    path: "/pdf-to-ppt",
  },
  {
    name: "PDF to TEXT",
    description: "Extract text from PDF files.",
    icon: <img src="../home/PdfToTxt.svg" alt="pdfToTxt" className="h-15" />,
    path: "/pdf-to-text",
  },
  {
    name: "PDF to IMAGE",
    description: "Convert PDF pages into image files.",
    icon: (
      <img src="../home/pdfToImage.svg" alt="pdfToImage" className="h-15" />
    ),
    path: "/pdf-to-image",
  },
  {
    name: "Merge PDF",
    description: "Merge multiple PDFs into one file.",
    icon: <img src="../home/mergePdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/merge-pdf",
  },
  {
    name: "Split PDF",
    description: "Split a PDF into multiple parts.",
    icon: <img src="../home/splitPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/split-pdf",
  },
  {
    name: "Compress PDF",
    description: "Compress the size of your PDFs.",
    icon: <img src="../home/compressPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/compress-pdf",
  },
  {
    name: "Flip PDF Pages",
    description: "Flip through PDF pages interactively.",
    icon: <img src="../home/flipPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/flip-pdf",
  },
  {
    name: "Remove PDF Pages",
    description: "Delete specific pages from a PDF.",
    path: "/remove-page",
    icon: <img src="../home/removePdf.svg" alt="pdfToTxt" className="h-15" />,
  },
  // {
  //   name: "PDF Scanner",
  //   description: "Scan documents and save them as PDFs.",
  //   icon: <img src="../home/pdfScanner.svg" alt="pdfToTxt" className="h-15" />,
  // },
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
    path: "/extract-content",
  },
  {
    name: "Rotate PDF",
    description: "Rotate PDF pages.",
    icon: <img src="../home/rotatePdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/rotate-page",
  },
  {
    name: "Crop PDF",
    description: "Crop the margins of PDF files.",
    icon: <img src="../home/cropPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/crop-pdf",
  },
  {
    name: "Edit PDF",
    description: "Edit text and images in PDFs.",
    icon: <img src="../home/editPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/pdf-editor",
  },
  {
    name: "Rearrange PDF",
    description: "Reorder the pages in a PDF file.",
    icon: (
      <img src="../home/rearrangePdf.svg" alt="pdfToTxt" className="h-15" />
    ),
    path: "/rearrenge-pdf-page",
  },
  {
    name: "PDF Creator",
    description: "Create a new PDF from scratch.",
    icon: <img src="../home/pdfCreation.svg" alt="pdfToTxt" className="h-15" />,
    path: "/pdf-create",
  },
  {
    name: "Add Page Number",
    description: "Add page numbers to a PDF.",
    icon: (
      <img src="../home/AddPageNumber.svg" alt="pdfToTxt" className="h-15" />
    ),
    path: "/add-page-number",
  },
  {
    name: "Add Watermark",
    description: "Add a watermark to your PDF.",
    icon: (
      <img src="../home/addWaterMark.svg" alt="pdfToTxt" className="h-15" />
    ),
    path: "/Watermark",
  },
  {
    name: "Unlock PDF",
    description: "Unlock password-protected PDFs.",
    icon: <img src="../home/pdfUnlock.svg" alt="pdfToTxt" className="h-15" />,
    path: "/UnlockPdf",
  },
  {
    name: "Protect PDF",
    description: "Encrypt your PDF files.",
    icon: <img src="../home/lockPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/ProtectPdf",
  },
  {
    name: "eSign PDF",
    description: "Electronically sign PDF documents.",
    icon: <img src="../home/eSignPdf.svg" alt="pdfToTxt" className="h-15" />,
    path: "/eSignPdf",
  },
];
const strokeColors = ["#FFB3B3", "#B3FFCC", "#B3D9FF", "#FFCCF2"];

const ToolsGrid = () => {
  const navigate = useNavigate(); // Use the navigate hook

  return (
    <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
      {/* Header Section */}
      <div className="container px-4 mx-auto mb-12 text-center md:px-8">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
          Free Online Document Conversion Made Easy
        </h2>
        <p className="max-w-3xl mx-auto text-base text-gray-600 sm:text-lg lg:text-xl">
          Effortlessly convert your documents with our free online tools.
          Whether you need to change formats or compress files, our service
          makes it quick and easy—all without any cost.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => navigate(tool.path)}
              className="relative p-6 text-center transition-transform duration-300 transform bg-white shadow-lg cursor-pointer rounded-xl hover:scale-105 hover:shadow-2xl group hover:-translate-y-2"
            >
              {/* Top-right Stroke */}
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

              {/* Bottom-left Stroke */}
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
                <div className="flex items-center justify-center w-16 h-16 p-2 mx-auto mb-4 transition-all duration-300 bg-blue-100 rounded-full group-hover:bg-blue-500 group-hover:shadow-lg group-hover:scale-110">
                  {tool.icon}
                </div>

                {/* Tool Name */}
                <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors duration-300 sm:text-xl group-hover:text-white">
                  {tool.name}
                </h3>

                {/* Tool Description */}
                <p className="text-sm text-gray-600 transition-colors duration-300 sm:text-base group-hover:text-gray-200">
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
