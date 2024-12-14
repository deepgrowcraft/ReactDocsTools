import React from "react";
import { Link } from "react-router-dom";

const AllTools = () => {
  const tools = [
    {
      category: "Convert to PDF",
      items: [
        {
          name: "Word to PDF",
          icon: (
            <img
              src="../home/wordTopdf.svg"
              alt="wordTopdf"
              className="w-7 h-7"
            />
          ),
          path: "/docToPdf",
        },
        {
          name: "Excel to PDF",
          icon: (
            <img
              src="../home/exelToPdf.svg"
              alt="exelToPdf"
              className="w-7 h-7"
            />
          ),
          path: "/ExelToPdfScreen",
        },
        {
          name: "PPT to PDF",
          icon: (
            <img
              src="../home/pptToPdf.svg"
              alt="pptToPdf"
              className="w-7 h-7"
            />
          ),
          path: "/PptToPdfScreen",
        },
        {
          name: "Image to PDF",
          icon: (
            <img
              src="../home/imageToPdf.svg"
              alt="imageToPdf"
              className="w-7 h-7"
            />
          ),
          path: "/ImageToPdfScreen",
        },
      ],
    },
    {
      category: "Convert from PDF",
      items: [
        {
          name: "PDF to Word",
          icon: (
            <img
              src="../home/pdfToWord.svg"
              alt="pdfToWord"
              className="w-7 h-7"
            />
          ),
          path: "/PdfToWordScreen",
        },
        {
          name: "PDF to Excel",
          icon: (
            <img
              src="../home/pdfToExel.svg"
              alt="pdfToExcel"
              className="w-7 h-7"
            />
          ),
          path: "/PdfToExelScreen",
        },
        {
          name: "PDF to PPT",
          icon: (
            <img
              src="../home/pdfToppt.svg"
              alt="pdfToPPT"
              className="w-7 h-7"
            />
          ),
          path: "/PdfToPPTScreen",
        },
        {
          name: "PDF to Image",
          icon: (
            <img
              src="../home/pdfToImage.svg"
              alt="pdfToImage"
              className="w-7 h-7"
            />
          ),
          path: "/PdfToImageScreen",
        },
      ],
    },
    {
      category: "Merge and Split",
      items: [
        {
          name: "Merge PDF",
          icon: (
            <img
              src="../home/mergePdf.svg"
              alt="mergePdf"
              className="w-7 h-7"
            />
          ),
          path: "/MergePdfScreen",
        },
        {
          name: "Split PDF",
          icon: (
            <img
              src="../home/splitPdf.svg"
              alt="splitPdf"
              className="w-7 h-7"
            />
          ),
          path: "/SplitPdfScreen",
        },
      ],
    },
    {
      category: "PDF Security",
      items: [
        {
          name: "Protect PDF",
          icon: (
            <img src="../home/lockPdf.svg" alt="lockPdf" className="w-7 h-7" />
          ),
          path: "/ProtectPdf",
        },
        {
          name: "Unlock PDF",
          icon: (
            <img
              src="../home/pdfUnlock.svg"
              alt="pdfUnlock"
              className="w-7 h-7"
            />
          ),
          path: "/UnlockPdf",
        },
        {
          name: "E-Sign PDF",
          icon: (
            <img
              src="../home/eSignPdf.svg"
              alt="eSignPdf"
              className="w-7 h-7"
            />
          ),
          path: "/eSignPdf",
        },
        {
          name: "Watermark PDF",
          icon: (
            <img
              src="../home/addWaterMark.svg"
              alt="addWaterMark"
              className="w-7 h-7"
            />
          ),
          path: "/Watermark",
        },
      ],
    },
    {
      category: "PDF Tools",
      items: [
        {
          name: "Compress PDF",
          icon: (
            <img
              src="../home/compressPdf.svg"
              alt="compressPdf"
              className="w-7 h-7"
            />
          ),
          path: "/CompressPdfScreen",
        },
        {
          name: "Rotate PDF",
          icon: (
            <img
              src="../home/rotatePdf.svg"
              alt="rotatePdf"
              className="w-7 h-7"
            />
          ),
          path: "/RotatePdfPagesScreen",
        },
        {
          name: "Re-Arrange PDF",
          icon: (
            <img
              src="../home/rearrangePdf.svg"
              alt="rearrangePdf"
              className="w-7 h-7"
            />
          ),
          path: "/PdfReArrenge",
        },
        {
          name: "Delete PDF Pages",
          icon: (
            <img
              src="../home/removePdf.svg"
              alt="removePdf"
              className="w-7 h-7"
            />
          ),
          path: "/RemovePdfPagesScreen",
        },
      ],
    },
  ];

  return (
    <div className="absolute left-0 z-50 w-full bg-white shadow-lg">
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {tools.map((toolCategory) => (
            <div
              key={toolCategory.category}
              className="p-4 rounded-lg shadow-md bg-gray-50"
            >
              <h3 className="mb-4 text-lg font-semibold text-blue-600">
                {toolCategory.category}
              </h3>
              <ul className="space-y-2">
                {toolCategory.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTools;
