import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

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
              alt="wordTopdf"
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
              alt="wordTopdf"
              className="w-7 h-7"
            />
          ),
          path: "/PptToPdfScreen",
        },
        {
          name: "IMAGE to PDF",
          icon: (
            <img
              src="../home/imageToPdf.svg"
              alt="wordTopdf"
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
              alt="wordTopdf"
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
              alt="wordTopdf"
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
              alt="wordTopdf"
              className="w-7 h-7"
            />
          ),
          path: "/PdfToPPTScreen",
        },
        {
          name: "PDF to IMAGE",
          icon: (
            <img
              src="../home/pdfToImage.svg"
              alt="wordTopdf"
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
              alt="wordTopdf"
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
              alt="wordTopdf"
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
            <img
              src="../home/lockPdf.svg"
              alt="wordTopdf"
              className="w-7 h-7"
            />
          ),
          path: "/ProtectPdf",
        },
        {
          name: "Unlock PDF",
          icon: (
            <img
              src="../home/pdfUnlock.svg"
              alt="wordTopdf"
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
              alt="wordTopdf"
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
              alt="wordTopdf"
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
              alt="wordTopdf"
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
              alt="wordTopdf"
              className="w-7 h-7"
            />
          ),
          path: "/RotatePdfPagesScreen",
        },
        {
          name: "Re-Arrenge PDF",
          icon: (
            <img
              src="../home/rearrangePdf.svg"
              alt="wordTopdf"
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
              alt="wordTopdf"
              className="w-7 h-7"
            />
          ),
          path: "/RemovePdfPagesScreen",
        },
      ],
    },
  ];

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full p-4 mt-20 space-y-8 bg-white rounded-lg shadow-lg max-w-7xl md:p-8">
        <div className="grid grid-cols-1 gap-8 p-5 mt-32 lg:grid-cols-3 xl:grid-cols-5 lg:mt-32 md:mt-32">
          {tools.map((toolCategory) => (
            <div
              key={toolCategory.category}
              className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <h3
                className="mb-4 text-xl font-semibold text-blue-500 cursor-pointer"
                onClick={() => toggleCategory(toolCategory.category)}
              >
                {toolCategory.category}
              </h3>
              <ul className="space-y-2 text-gray-700">
                {toolCategory.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer hover:text-blue-600"
                  >
                    <Link
                      to={item.path}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm sm:text-base">{item.name}</span>
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
