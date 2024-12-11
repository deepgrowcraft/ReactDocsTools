import React, { useState, useRef, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist"; // Import PDF.js
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack"; // Import GlobalWorkerOptions

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`; // Use the CDN version

const PdfWithPageNumbers = () => {
  const [text, setText] = useState(""); // Text to be added to each page
  const [file, setFile] = useState(null); // For storing the imported PDF file
  const [isCreating, setIsCreating] = useState(false);
  const [includePageNumbers, setIncludePageNumbers] = useState(false);
  const [startPage, setStartPage] = useState(1); // Start page for page numbers
  const [endPage, setEndPage] = useState(1); // End page for page numbers

  // Text styling
  const [textOpacity, setTextOpacity] = useState(1); // Text opacity (0 - 1)
  const [textColor, setTextColor] = useState("#000000"); // Text color

  // Reference to the canvas for rendering PDF
  const canvasRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 }); // Default position
  const [pdfDocument, setPdfDocument] = useState(null); // Store pdf-lib document
  const [pageCount, setPageCount] = useState(0); // Store PDF page count

  // Handle text input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(fileUrl);
    }
  };

  // Handle page number toggle
  const handlePageNumberChange = (e) => {
    setIncludePageNumbers(e.target.checked);
  };

  // Handle range change for page numbers
  const handleStartPageChange = (e) => {
    setStartPage(Number(e.target.value));
  };

  const handleEndPageChange = (e) => {
    setEndPage(Number(e.target.value));
  };

  // Handle text opacity
  const handleTextOpacityChange = (e) => {
    setTextOpacity(Number(e.target.value));
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  // Handle the start of the dragging action (mouse or touch)
  const handleDragStart = (e) => {
    // Prevent default behavior for touch events to avoid unwanted page scrolling
    if (e.type === "touchstart") {
      e.preventDefault();
    }

    // Determine the initial mouse/touch position
    const startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const startY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

    const offsetX = startX - textPosition.x;
    const offsetY = startY - textPosition.y;

    // Handle drag move
    const handleDragMove = (e) => {
      const moveX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const moveY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

      const newX = moveX - offsetX;
      const newY = moveY - offsetY;

      // Apply boundary constraints for dragging (so the text stays within the canvas)
      const canvas = canvasRef.current;
      const canvasRect = canvas.getBoundingClientRect();
      const maxX = canvasRect.width - 50;
      const maxY = canvasRect.height - 50;

      setTextPosition({
        x: Math.min(Math.max(newX, 0), maxX),
        y: Math.min(Math.max(newY, 0), maxY),
      });
    };

    // Handle the end of the dragging action (mouse or touch)
    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };

    // Add event listeners for dragging move and end for both mouse and touch
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("touchend", handleDragEnd);
  };

  // Render the PDF preview using pdf.js
  const renderPdf = async (url) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    setPdfDocument(pdf);

    // Set the total page count
    setPageCount(pdf.numPages);

    const page = await pdf.getPage(1); // Render the first page

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
  };

  useEffect(() => {
    if (pdfUrl) {
      renderPdf(pdfUrl);
    }
  }, [pdfUrl]);

  const createPdf = async () => {
    if (!file) return;

    setIsCreating(true);

    try {
      // Load the existing PDF
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);

      const pages = pdfDoc.getPages();
      const { width, height } = pages[0].getSize();

      // Add text to each page (if provided)
      pages.forEach((page, index) => {
        if (text) {
          page.drawText(text, {
            x: textPosition.x,
            y: height - textPosition.y, // Y positioning depends on the PDF page height
            size: 24,
            color: rgb(
              parseInt(textColor.slice(1, 3), 16) / 255,
              parseInt(textColor.slice(3, 5), 16) / 255,
              parseInt(textColor.slice(5, 7), 16) / 255
            ), // Convert hex to rgb
            opacity: textOpacity,
          });
        }

        // If page numbers are selected and the page is within the range, add them
        if (includePageNumbers) {
          const pageNumber = index + 1; // Page number is 1-based
          if (pageNumber >= startPage && pageNumber <= endPage) {
            page.drawText(`Page ${pageNumber}`, {
              x: width - 150,
              y: 50,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
        }
      });

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(pdfBlob, "updated_pdf_with_text_and_page_numbers.pdf");

      setIsCreating(false);
    } catch (error) {
      console.error("PDF creation failed:", error);
      setIsCreating(false);
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Edit PDF with Customizable Text and Page Numbers
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Upload your PDF, add customizable text, adjust text styling, and
          include page numbers.
        </p>

        <div className="max-w-xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
          {/* File upload */}
          <div className="mb-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-4 border border-gray-300 rounded-md"
            />
          </div>

          {/* Text input for PDF content */}
          <div className="mb-4">
            <textarea
              value={text}
              onChange={handleTextChange}
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Enter text for your PDF..."
            />
          </div>

          {/* PDF Preview */}
          {pdfUrl && (
            <div className="relative mb-4">
              <canvas
                ref={canvasRef}
                className="w-full h-auto border-2 border-gray-300"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              {text && (
                <div
                  style={{
                    position: "absolute",
                    top: textPosition.y,
                    left: textPosition.x,
                    cursor: "move",
                    fontSize: "24px",
                    color: textColor,
                    opacity: textOpacity,
                  }}
                  onTouchStart={handleDragStart}
                  onMouseDown={handleDragStart}
                  className="text-sm text-center sm:text-left sm:text-lg md:text-xl"
                >
                  {text}
                </div>
              )}
            </div>
          )}

          {/* Page Count Display */}
          {pageCount > 0 && (
            <div className="text-lg text-gray-700">
              <p>Total Pages: {pageCount}</p>
            </div>
          )}

          {/* Text Styling */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Text Style
            </label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="text-sm text-gray-700">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={textOpacity}
                  onChange={handleTextOpacityChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-700">Text Color</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={handleTextColorChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={includePageNumbers}
                onChange={handlePageNumberChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Include page numbers</span>
            </label>
          </div>
          {/* Page Number Range */}
          {includePageNumbers && (
            <div className="mb-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-700">Start Page</label>
                  <input
                    type="number"
                    min="1"
                    value={startPage}
                    onChange={handleStartPageChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-700">End Page</label>
                  <input
                    type="number"
                    min={startPage}
                    value={endPage}
                    onChange={handleEndPageChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Create PDF button */}
          <button
            onClick={createPdf}
            disabled={isCreating || !file || !text}
            className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isCreating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCreating ? "Creating PDF..." : "Create PDF"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PdfWithPageNumbers;
