import React from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    name: "Word to PDF",
    icon: (
      <img src="../home/wordTopdf.svg" alt="wordTopdf" className="w-10 h-10" />
    ),
    path: "/docToPdf",
  },
  {
    name: "Excel to PDF",
    icon: (
      <img src="../home/exelToPdf.svg" alt="exelToPdf" className="w-10 h-10" />
    ),
    path: "/ExelToPdfScreen",
  },
  {
    name: "PPT to PDF",
    icon: (
      <img src="../home/pptToPdf.svg" alt="pptToPdf" className="w-10 h-10" />
    ),
    path: "/PptToPdfScreen",
  },
  {
    name: "IMAGE to PDF",
    icon: (
      <img
        src="../home/imageToPdf.svg"
        alt="imageToPdf"
        className="w-10 h-10"
      />
    ),
    path: "/ImageToPdfScreen",
  },
  {
    name: "HTML to PDF",
    icon: (
      <img src="../home/htmlToPdf.svg" alt="htmlToPdf" className="w-10 h-10" />
    ),
    path: "/HtmlToPdfScreen",
  },
  {
    name: "PDF OCR",
    icon: <img src="../home/pdfOCR.svg" alt="pdfOCR" className="w-10 h-10" />,
    path: "/PdfOCRScreen",
  },
  {
    name: "PDF to Word",
    icon: (
      <img src="../home/pdfToWord.svg" alt="pdfToWord" className="w-10 h-10" />
    ),
    path: "/PdfToWordScreen",
  },
  {
    name: "PDF to Excel",
    icon: (
      <img src="../home/pdfToExel.svg" alt="pdfToExel" className="w-10 h-10" />
    ),
    path: "/PdfToExelScreen",
  },
  {
    name: "PDF to PPT",
    icon: (
      <img src="../home/pdfToppt.svg" alt="pdfToppt" className="w-10 h-10" />
    ),
    path: "/PdfToPPTScreen",
  },
  {
    name: "PDF to TEXT",
    icon: (
      <img src="../home/PdfToTxt.svg" alt="pdfToTxt" className="w-10 h-10" />
    ),
    path: "/PdfToTxtScreen",
  },
  {
    name: "PDF to IMAGE",
    icon: (
      <img
        src="../home/pdfToImage.svg"
        alt="pdfToImage"
        className="w-10 h-10"
      />
    ),
    path: "/PdfToImageScreen",
  },
  {
    name: "Merge PDF",
    icon: (
      <img src="../home/mergePdf.svg" alt="mergePdf" className="w-10 h-10" />
    ),
    path: "/MergePdfScreen",
  },
  {
    name: "Split PDF",
    icon: (
      <img src="../home/splitPdf.svg" alt="splitPdf" className="w-10 h-10" />
    ),
    path: "/SplitPdfScreen",
  },
  {
    name: "Compress PDF",
    icon: (
      <img
        src="../home/compressPdf.svg"
        alt="compressPdf"
        className="w-10 h-10"
      />
    ),
    path: "/CompressPdfScreen",
  },
  {
    name: "Flip PDF Pages",
    icon: <img src="../home/flipPdf.svg" alt="flipPdf" className="w-10 h-10" />,
    path: "/FlipPdfScreen",
  },
  {
    name: "Remove PDF Pages",
    icon: (
      <img src="../home/removePdf.svg" alt="removePdf" className="w-10 h-10" />
    ),
    path: "/RemovePdfPagesScreen",
  },
  {
    name: "PDF Scanner",
    icon: (
      <img
        src="../home/pdfScanner.svg"
        alt="pdfScanner"
        className="w-10 h-10"
      />
    ),
  },
  {
    name: "Extract PDF Content",
    icon: (
      <img
        src="../home/extractPdfContent.svg"
        alt="extractPdfContent"
        className="w-10 h-10"
      />
    ),
    path: "/ExtractPdfContent",
  },
  {
    name: "Rotate PDF",
    icon: (
      <img src="../home/rotatePdf.svg" alt="rotatePdf" className="w-10 h-10" />
    ),
    path: "/RotatePdfPagesScreen",
  },
  {
    name: "Crop PDF",
    icon: <img src="../home/cropPdf.svg" alt="cropPdf" className="w-10 h-10" />,
    path: "/CropPdfScreen",
  },
  {
    name: "Edit PDF",
    icon: <img src="../home/editPdf.svg" alt="editPdf" className="w-10 h-10" />,
  },
  {
    name: "Rearrange PDF",
    icon: (
      <img
        src="../home/rearrangePdf.svg"
        alt="rearrangePdf"
        className="w-10 h-10"
      />
    ),
  },
  {
    name: "PDF Creator",
    icon: (
      <img
        src="../home/pdfCreation.svg"
        alt="pdfCreation"
        className="w-10 h-10"
      />
    ),
  },
  {
    name: "Add Page Number",
    icon: (
      <img
        src="../home/AddPageNumber.svg"
        alt="addPageNumber"
        className="w-10 h-10"
      />
    ),
  },
  {
    name: "Add Watermark",
    icon: (
      <img
        src="../home/addWaterMark.svg"
        alt="addWaterMark"
        className="w-10 h-10"
      />
    ),
  },
  {
    name: "Unlock PDF",
    icon: (
      <img src="../home/pdfUnlock.svg" alt="pdfUnlock" className="w-10 h-10" />
    ),
  },
  {
    name: "Protect PDF",
    icon: <img src="../home/lockPdf.svg" alt="lockPdf" className="w-10 h-10" />,
  },
  {
    name: "eSign PDF",
    icon: (
      <img src="../home/eSignPdf.svg" alt="eSignPdf" className="w-10 h-10" />
    ),
  },
];

const ToolsScreen = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="mb-12 text-2xl font-extrabold text-center text-gray-800 md:text-3xl">
          Explore Our PDF Tools
        </h2>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => navigate(tool.path)}
              className="flex items-center p-2 transition-all transform bg-white border border-gray-200 shadow-md sm:p-3 rounded-2xl hover:border-blue-400 hover:shadow-lg hover:scale-110"
            >
              <div className="flex-shrink-0">{tool.icon}</div>
              <div className="ml-2">
                <h3 className="text-xs font-semibold text-gray-900 sm:text-sm">
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
