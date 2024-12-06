import React, { useState, useRef, useEffect } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist"; // Import PDF.js
import { GlobalWorkerOptions } from "pdfjs-dist/webpack"; // Import GlobalWorkerOptions

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`; // Use the CDN version

const WatermarkPdf = () => {
  const [file, setFile] = useState(null); // For storing the imported PDF file
  const [watermarkText, setWatermarkText] = useState(""); // Watermark text
  const [watermarkPages, setWatermarkPages] = useState("all"); // Apply watermark to all pages or custom range
  const [watermarkStartPage, setWatermarkStartPage] = useState(1); // Start page for watermark range
  const [watermarkEndPage, setWatermarkEndPage] = useState(1); // End page for watermark range
  const [isCreating, setIsCreating] = useState(false);

  const canvasRef = useRef(null); // Canvas reference for PDF preview
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(fileUrl);
    }
  };

  // Handle watermark text change
  const handleWatermarkTextChange = (e) => {
    setWatermarkText(e.target.value);
  };

  // Handle watermark page range change
  const handleWatermarkPagesChange = (e) => {
    setWatermarkPages(e.target.value);
  };

  const handleWatermarkStartPageChange = (e) => {
    setWatermarkStartPage(Number(e.target.value));
  };

  const handleWatermarkEndPageChange = (e) => {
    setWatermarkEndPage(Number(e.target.value));
  };

  // Render the PDF preview using pdf.js
  const renderPdf = async (url) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
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

      // Add watermark to pages
      pages.forEach((page, index) => {
        const pageNumber = index + 1;

        // Apply watermark if on the correct page range
        if (
          watermarkPages === "all" ||
          (pageNumber >= watermarkStartPage && pageNumber <= watermarkEndPage)
        ) {
          page.drawText(watermarkText, {
            x: width / 2 - (watermarkText.length * 12) / 2, // Center the watermark text
            y: height / 2, // Position watermark in the center of the page
            size: 50,
            color: rgb(0.75, 0.75, 0.75), // Light grey color
            opacity: 0.3, // Set opacity
            rotate: degrees(45), // Rotate watermark 45 degrees
          });
        }
      });

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(pdfBlob, "pdf_with_watermark.pdf");

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
          Add Watermark to PDF
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Upload your PDF, add a watermark, and choose where to apply it.
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

          {/* Watermark text input */}
          <div className="mb-4">
            <textarea
              value={watermarkText}
              onChange={handleWatermarkTextChange}
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Enter watermark text..."
            />
          </div>

          {/* PDF Preview */}
          {pdfUrl && (
            <div className="relative mb-4">
              <canvas ref={canvasRef} className="border-2 border-gray-300" />
            </div>
          )}

          {/* Watermark page range */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Apply Watermark to:
            </label>
            <select
              value={watermarkPages}
              onChange={handleWatermarkPagesChange}
              className="w-full p-4 border border-gray-300 rounded-md"
            >
              <option value="all">All Pages</option>
              <option value="range">Custom Page Range</option>
            </select>
          </div>

          {/* Page range inputs */}
          {watermarkPages === "range" && (
            <div className="flex mb-4 space-x-4">
              <div className="flex-1">
                <label className="text-sm text-gray-700">Start Page</label>
                <input
                  type="number"
                  min="1"
                  value={watermarkStartPage}
                  onChange={handleWatermarkStartPageChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-700">End Page</label>
                <input
                  type="number"
                  min={watermarkStartPage}
                  value={watermarkEndPage}
                  onChange={handleWatermarkEndPageChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}

          {/* Create PDF button */}
          <button
            onClick={createPdf}
            disabled={isCreating || !file || !watermarkText}
            className={`mt-4 w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isCreating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCreating ? "Creating PDF..." : "Create PDF with Watermark"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WatermarkPdf;
