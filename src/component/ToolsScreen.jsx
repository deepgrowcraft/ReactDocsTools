import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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

const ToolsGridScreen = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-12 bg-gradient-to-r from-gray-50 to-gray-100 mt-14">
      <Helmet>
        <title>PDF Small Tools - pdf tools</title>
        <meta
          name="description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta
          property="og:title"
          content="PDF Small Tools - terms and conditions"
        />
        <meta
          property="og:description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdfsmalltools.com/" />
        <meta
          property="og:image"
          content="https://pdfsmalltools.com/pdfIcon/editPdfs.svg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PDF Small Tools - Convert, Edit, Compress & More"
        />
        <meta
          name="twitter:description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta
          name="twitter:image"
          content="https://pdfsmalltools.com/pdfIcon/editPdfs.svg"
        />
        <link rel="icon" href="https://pdfsmalltools.com/favicon.ico" />
      </Helmet>
      <div className="container mx-auto">
        {/* Header Section */}
        <h2 className="mb-12 text-2xl font-extrabold text-center text-gray-800 md:text-3xl">
          Explore Our PDF Tools
        </h2>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => navigate(tool.path)}
              className="relative flex flex-col items-center p-4 transition-all transform bg-white border border-gray-200 shadow-md rounded-2xl group hover:border-blue-400 hover:shadow-xl hover:scale-105"
            >
              {/* Tool Icon */}
              <div className="flex items-center justify-center w-16 h-16 p-3 transition-all duration-300 bg-blue-100 rounded-full group-hover:bg-blue-500">
                {tool.icon}
              </div>

              {/* Tool Name */}
              <h3 className="mt-4 text-sm font-semibold text-center text-gray-900 transition-colors duration-300 group-hover:text-blue-500 sm:text-base">
                {tool.name}
              </h3>

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 opacity-0 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 group-hover:opacity-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGridScreen;
