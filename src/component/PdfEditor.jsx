import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faUndo,
  faRedo,
  faRotateRight,
  faFileCirclePlus,
  faFileCircleMinus,
  faFont,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { degrees } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PdfEditor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [pdfInstance, setPdfInstance] = useState(null);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageWidth, setImageWidth] = useState(150);
  const [imageHeight, setImageHeight] = useState(150);

  const containerRef = useRef(null);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);

      // Load the PDF into pdf-lib for manipulation
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPdfInstance(pdfDoc);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const updateAnnotation = (id, key, value) => {
    setTextAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, [key]: value } : annotation
      )
    );
  };

  const deleteAnnotation = (id) => {
    setTextAnnotations((prev) =>
      prev.filter((annotation) => annotation.id !== id)
    );
    setSelectedAnnotation(null);
  };

  const applyTextStyle = (key, value) => {
    if (selectedAnnotation) {
      updateAnnotation(selectedAnnotation, key, value);
    }
  };

  const removePage = async () => {
    if (!pdfInstance || currentPage > pdfInstance.getPageCount()) return;

    pdfInstance.removePage(currentPage - 1);

    const updatedNumPages = pdfInstance.getPageCount();
    setNumPages(updatedNumPages);
    setCurrentPage(Math.max(currentPage - 1, 1));

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    alert("Page removed successfully.");
  };

  const addPage = async () => {
    if (!pdfInstance) return;

    pdfInstance.insertPage(currentPage, [595.28, 841.89]);

    const updatedNumPages = pdfInstance.getPageCount();
    setNumPages(updatedNumPages);

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    alert("A new blank page has been added after the current page.");
  };

  const rotatePage = async () => {
    if (!pdfInstance) {
      alert("PDF instance not loaded.");
      return;
    }

    const page = pdfInstance.getPage(currentPage - 1);
    const currentRotation = page.getRotation().angle;

    const newRotation = (currentRotation + 90) % 360;
    page.setRotation(degrees(newRotation));

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    alert(`Page rotated to ${newRotation} degrees.`);
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

  const addCustomText = async () => {
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
      weight: isBold ? "bold" : undefined,
    });

    const pdfBytes = await pdfInstance.save();
    const updatedFileUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfFile(updatedFileUrl);

    setIsTextModalOpen(false);
    setNewText("");
    alert("Text added successfully!");
  };

  const addCustomImage = async () => {
    if (!pdfInstance || !imageFile) return;

    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;

        const fileType = imageFile.type;
        let embeddedImage;

        if (fileType === "image/jpeg") {
          embeddedImage = await pdfInstance.embedJpg(arrayBuffer);
        } else if (fileType === "image/png") {
          embeddedImage = await pdfInstance.embedPng(arrayBuffer);
        } else {
          alert("Unsupported image format. Please upload a JPEG or PNG image.");
          return;
        }

        const page = pdfInstance.getPage(currentPage - 1);
        const { width, height } = page.getSize();

        page.drawImage(embeddedImage, {
          x: (width - imageWidth) / 2,
          y: (height - imageHeight) / 2,
          width: imageWidth,
          height: imageHeight,
        });

        const pdfBytes = await pdfInstance.save();
        const updatedFileUrl = URL.createObjectURL(
          new Blob([pdfBytes], { type: "application/pdf" })
        );
        setPdfFile(updatedFileUrl);

        setIsImageModalOpen(false);
        setImageFile(null);
        alert("Image added successfully!");
      } catch (error) {
        console.error("Error embedding image:", error);
        alert("Failed to add the image. Please try again.");
      }
    };

    fileReader.readAsArrayBuffer(imageFile);
  };

  return (
    <div className="flex flex-col h-screen mt-20 bg-gray-100">
      <style>
        {`
          @media (max-width: 768px) {
            .top-toolbar {
              flex-wrap: wrap;
            }
            .toolbar-button {
              flex: 1 0 45%;
              margin-bottom: 8px;
            }
          }
        `}
      </style>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow top-toolbar">
        <div className="flex flex-wrap space-x-4">
          <button
            className="px-3 py-2 text-sm text-white bg-blue-500 rounded toolbar-button"
            onClick={() => setZoom(zoom + 0.1)}
          >
            <FontAwesomeIcon icon={faPlus} />
            In
          </button>
          <button
            className="px-3 py-2 text-sm text-white bg-blue-500 rounded toolbar-button"
            onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
          >
            <FontAwesomeIcon icon={faMinus} /> Out
          </button>
          <button
            className="px-3 py-2 text-sm text-white bg-purple-500 rounded toolbar-button"
            onClick={() => setIsTextModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFont} /> Add
          </button>
          <button
            className="px-3 py-2 text-sm text-white bg-green-500 rounded toolbar-button"
            onClick={() => setIsImageModalOpen(true)}
          >
            <FontAwesomeIcon icon={faImage} /> Add
          </button>
          <button
            className="px-3 py-2 text-sm text-white bg-green-500 rounded toolbar-button"
            onClick={addPage}
          >
            <FontAwesomeIcon icon={faFileCirclePlus} /> Add
          </button>
          <button
            className="px-3 py-2 text-sm text-white bg-red-500 rounded toolbar-button"
            onClick={removePage}
          >
            <FontAwesomeIcon icon={faFileCircleMinus} /> Remove
          </button>
          <button
            className="px-3 py-2 text-sm text-white bg-yellow-500 rounded toolbar-button"
            onClick={rotatePage}
          >
            <FontAwesomeIcon icon={faRotateRight} /> Rotate
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <label className="px-3 py-2 text-white bg-blue-500 rounded cursor-pointer toolbar-button">
            Upload
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>
          <button
            className="px-3 py-2 mt-2 text-sm text-white bg-purple-500 rounded md:mt-0 toolbar-button"
            onClick={savePdf}
          >
            Download
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar Thumbnails */}
        <div className="hidden w-1/5 overflow-y-auto bg-gray-200 border-r md:block">
          <div className="p-4 font-bold text-center border-b">Pages</div>
          {pdfFile && (
            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`p-2 border-b cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-blue-100"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <Page pageNumber={index + 1} width={100} />
                </div>
              ))}
            </Document>
          )}
        </div>

        {/* PDF Viewer */}
        <div
          className="relative flex items-center justify-center flex-grow bg-gray-50"
          ref={containerRef}
        >
          {pdfFile && (
            <div className="relative">
              <Document file={pdfFile}>
                <Page pageNumber={currentPage} scale={zoom} />
              </Document>
              {/* Render Text Annotations */}
              {textAnnotations
                .filter((annotation) => annotation.page === currentPage)
                .map((annotation) => (
                  <div
                    key={annotation.id}
                    className="absolute cursor-move"
                    style={{
                      left: annotation.x * zoom,
                      top: annotation.y * zoom,
                      fontSize: `${annotation.fontSize}px`,
                      fontWeight: annotation.isBold ? "bold" : "normal",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      background:
                        selectedAnnotation === annotation.id
                          ? "rgba(0,0,255,0.1)"
                          : "",
                    }}
                    draggable
                    onDragEnd={(e) => {
                      const rect = containerRef.current.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / zoom;
                      const y = (e.clientY - rect.top) / zoom;
                      updateAnnotation(annotation.id, "x", x);
                      updateAnnotation(annotation.id, "y", y);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAnnotation(annotation.id);
                    }}
                  >
                    {annotation.text}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Text Modal */}
      {isTextModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-4/5 p-4 bg-white rounded shadow-lg md:w-1/3">
            <h2 className="text-lg font-bold">Add Custom Text</h2>
            <input
              type="text"
              placeholder="Enter text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
            <div className="flex mt-4 space-x-2">
              <input
                type="number"
                placeholder="Font Size"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="w-1/3 p-2 border rounded"
              />
              <label>
                <input
                  type="checkbox"
                  checked={isBold}
                  onChange={(e) => setIsBold(e.target.checked)}
                />{" "}
                Bold
              </label>
            </div>
            <button
              onClick={addCustomText}
              className="px-3 py-2 mt-4 text-white bg-blue-500 rounded"
            >
              Add Text
            </button>
            <button
              onClick={() => setIsTextModalOpen(false)}
              className="px-3 py-2 mt-4 ml-2 text-white bg-red-500 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Image Modal */}
      {isImageModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-4/5 p-4 bg-white rounded shadow-lg md:w-1/3">
            <h2 className="text-lg font-bold">Add Custom Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 mt-2 border rounded"
            />
            <div className="flex mt-4 space-x-2">
              <input
                type="number"
                placeholder="Width"
                value={imageWidth}
                onChange={(e) => setImageWidth(parseInt(e.target.value, 10))}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Height"
                value={imageHeight}
                onChange={(e) => setImageHeight(parseInt(e.target.value, 10))}
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <button
              onClick={addCustomImage}
              className="px-3 py-2 mt-4 text-white bg-green-500 rounded"
            >
              Add Image
            </button>
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="px-3 py-2 mt-4 ml-2 text-white bg-red-500 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfEditor;
