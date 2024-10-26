import React from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    name: "Word to PDF",
    icon: (
      <img src="../home/wordTopdf.svg" alt="wordTopdf" className="h-10 w-10" />
    ),
    path: "/docToPdf",
  },
  {
    name: "Excel to PDF",
    icon: (
      <img src="../home/exelToPdf.svg" alt="exelToPdf" className="h-10 w-10" />
    ),
    path: "/ExelToPdfScreen",
  },
  {
    name: "PPT to PDF",
    icon: (
      <img src="../home/pptToPdf.svg" alt="pptToPdf" className="h-10 w-10" />
    ),
    path: "/PptToPdfScreen",
  },
  {
    name: "IMAGE to PDF",
    icon: (
      <img
        src="../home/imageToPdf.svg"
        alt="imageToPdf"
        className="h-10 w-10"
      />
    ),
    path: "/ImageToPdfScreen",
  },
  {
    name: "HTML to PDF",
    icon: (
      <img src="../home/htmlToPdf.svg" alt="htmlToPdf" className="h-10 w-10" />
    ),
    path: "/HtmlToPdfScreen",
  },
  {
    name: "PDF OCR",
    icon: <img src="../home/pdfOCR.svg" alt="pdfOCR" className="h-10 w-10" />,
    path: "/PdfOCRScreen",
  },
  {
    name: "PDF to Word",
    icon: (
      <img src="../home/pdfToWord.svg" alt="pdfToWord" className="h-10 w-10" />
    ),
  },
  {
    name: "PDF to Excel",
    icon: (
      <img src="../home/pdfToExel.svg" alt="pdfToExel" className="h-10 w-10" />
    ),
  },
  {
    name: "PDF to PPT",
    icon: (
      <img src="../home/pdfToppt.svg" alt="pdfToppt" className="h-10 w-10" />
    ),
  },
  {
    name: "PDF to TEXT",
    icon: (
      <img src="../home/PdfToTxt.svg" alt="pdfToTxt" className="h-10 w-10" />
    ),
  },
  {
    name: "PDF to IMAGE",
    icon: (
      <img
        src="../home/pdfToImage.svg"
        alt="pdfToImage"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Merge PDF",
    icon: (
      <img src="../home/mergePdf.svg" alt="mergePdf" className="h-10 w-10" />
    ),
  },
  {
    name: "Split PDF",
    icon: (
      <img src="../home/splitPdf.svg" alt="splitPdf" className="h-10 w-10" />
    ),
  },
  {
    name: "Compress PDF",
    icon: (
      <img
        src="../home/compressPdf.svg"
        alt="compressPdf"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Flip PDF Pages",
    icon: <img src="../home/flipPdf.svg" alt="flipPdf" className="h-10 w-10" />,
  },
  {
    name: "Remove PDF Pages",
    icon: (
      <img src="../home/removePdf.svg" alt="removePdf" className="h-10 w-10" />
    ),
  },
  {
    name: "PDF Scanner",
    icon: (
      <img
        src="../home/pdfScanner.svg"
        alt="pdfScanner"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Extract PDF Content",
    icon: (
      <img
        src="../home/extractPdfContent.svg"
        alt="extractPdfContent"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Rotate PDF",
    icon: (
      <img src="../home/rotatePdf.svg" alt="rotatePdf" className="h-10 w-10" />
    ),
  },
  {
    name: "Crop PDF",
    icon: <img src="../home/cropPdf.svg" alt="cropPdf" className="h-10 w-10" />,
  },
  {
    name: "Edit PDF",
    icon: <img src="../home/editPdf.svg" alt="editPdf" className="h-10 w-10" />,
  },
  {
    name: "Rearrange PDF",
    icon: (
      <img
        src="../home/rearrangePdf.svg"
        alt="rearrangePdf"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "PDF Creator",
    icon: (
      <img
        src="../home/pdfCreation.svg"
        alt="pdfCreation"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Add Page Number",
    icon: (
      <img
        src="../home/AddPageNumber.svg"
        alt="addPageNumber"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Add Watermark",
    icon: (
      <img
        src="../home/addWaterMark.svg"
        alt="addWaterMark"
        className="h-10 w-10"
      />
    ),
  },
  {
    name: "Unlock PDF",
    icon: (
      <img src="../home/pdfUnlock.svg" alt="pdfUnlock" className="h-10 w-10" />
    ),
  },
  {
    name: "Protect PDF",
    icon: <img src="../home/lockPdf.svg" alt="lockPdf" className="h-10 w-10" />,
  },
  {
    name: "eSign PDF",
    icon: (
      <img src="../home/eSignPdf.svg" alt="eSignPdf" className="h-10 w-10" />
    ),
  },
];

const ToolsScreen = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-12">
          Explore Our PDF Tools
        </h2>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => navigate(tool.path)}
              className="flex items-center p-2 sm:p-3 bg-white border border-gray-200 rounded-2xl shadow-md hover:border-blue-400 hover:shadow-lg transition-all transform hover:scale-110"
            >
              <div className="flex-shrink-0">{tool.icon}</div>
              <div className="ml-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                  {tool.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ToolsScreen;
