import React, { useState, useRef } from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import PdfViewer from "./PdfViewer";
import AddTextModal from "./AddTextModal";
import AddImageModal from "./AddImageModal";
import TextAnnotations from "./TextAnnotations";
import { PDFDocument, rgb } from "pdf-lib";
import "../styles/PdfEditor.css";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PdfEditor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [pdfInstance, setPdfInstance] = useState(null);
  const containerRef = useRef(null);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPdfInstance(pdfDoc);
      setNumPages(pdfDoc.getPageCount());
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const savePdf = async () => {
    if (!pdfInstance) return;
    const pdfBytes = await pdfInstance.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited.pdf";
    link.click();
  };

  const addPage = async () => {
    if (!pdfInstance) return;

    pdfInstance.addPage([595.28, 841.89]); // A4 dimensions in points
    setNumPages(pdfInstance.getPageCount());

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    alert("A new blank page has been added.");
  };

  const removePage = async () => {
    if (!pdfInstance || currentPage > pdfInstance.getPageCount()) return;

    pdfInstance.removePage(currentPage - 1);
    setNumPages(pdfInstance.getPageCount());
    setCurrentPage(Math.max(currentPage - 1, 1));

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    alert("The current page has been removed.");
  };

  const addText = async () => {
    if (!pdfInstance || !newText) return;

    const page = pdfInstance.getPage(currentPage - 1);
    const { width, height } = page.getSize();

    page.drawText(newText, {
      x: width / 4,
      y: height / 2,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: await pdfInstance.embedFont(
        PDFDocument.PDFName.StandardFonts.Helvetica
      ),
    });

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);
    setIsTextModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen mt-20 bg-gray-100">
      <Toolbar
        zoom={zoom}
        setZoom={setZoom}
        setIsTextModalOpen={setIsTextModalOpen}
        setIsImageModalOpen={setIsImageModalOpen}
        onSave={savePdf}
        onUpload={handlePdfUpload}
        onAddPage={addPage}
        onRemovePage={removePage}
      />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          pdfFile={pdfFile}
          setNumPages={setNumPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numPages={numPages}
        />
        <PdfViewer
          pdfFile={pdfFile}
          zoom={zoom}
          currentPage={currentPage}
          containerRef={containerRef}
        />
      </div>
      {isTextModalOpen && (
        <AddTextModal
          setIsTextModalOpen={setIsTextModalOpen}
          newText={newText}
          setNewText={setNewText}
          onAddText={addText}
        />
      )}
      {isImageModalOpen && (
        <AddImageModal setIsImageModalOpen={setIsImageModalOpen} />
      )}
      <TextAnnotations textAnnotations={textAnnotations} zoom={zoom} />
    </div>
  );
};

export default PdfEditor;
