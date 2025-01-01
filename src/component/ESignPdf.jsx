import React, { useState, useEffect } from "react";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const API_URL = import.meta.env.VITE_API_URL;

const ESignPdfScreen = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [signature, setSignature] = useState(null);
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [inputText, setInputText] = useState("");
  const [activeOption, setActiveOption] = useState("draw"); // Default to "draw"
  const [pageNumber, setPageNumber] = useState(1); // Default to page 1
  const [pageRange, setPageRange] = useState(""); // Store custom page range
  const [totalPages, setTotalPages] = useState(0); // Store total number of pages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [signatureCanvas, setSignatureCanvas] = useState(null);

  // Handle PDF file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    setError(null);
  };

  // Handle custom page range input
  const handlePageRangeChange = (e) => {
    setPageRange(e.target.value);
  };

  // Clear the signature
  const handleClearSignature = () => {
    if (signatureCanvas) {
      signatureCanvas.clear();
      setSignature(null);
    }
  };

  // Save the drawn signature
  const handleSaveSignature = () => {
    if (signatureCanvas && !signatureCanvas.isEmpty()) {
      const canvas = signatureCanvas.getCanvas();
      const context = canvas.getContext("2d");

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      const tempContext = tempCanvas.getContext("2d");
      tempContext.fillStyle = "white";
      tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempContext.drawImage(canvas, 0, 0);

      const signatureData = tempCanvas.toDataURL("image/png");

      const byteString = atob(signatureData.split(",")[1]);
      const mimeString = signatureData
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const buffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        buffer[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: mimeString });

      setSignature(blob);
      setError(null);
    } else {
      setError("Please draw a signature before saving.");
    }
  };

  // Handle uploaded signature file
  const handleUploadedSignatureChange = (e) => {
    const file = e.target.files[0];
    setUploadedSignature(file);
  };

  // Validate page range format
  const validatePageRange = (range) => {
    const regex = /^\d+(-\d+)?(,\d+(-\d+)?)*$/;
    return regex.test(range);
  };

  // Parse the page range into an array of pages
  const parsePageRange = (range) => {
    const pages = [];
    const ranges = range.split(",");
    ranges.forEach((r) => {
      if (r.includes("-")) {
        const [start, end] = r.split("-").map(Number);
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      } else {
        pages.push(Number(r));
      }
    });
    return pages;
  };

  // Handle the PDF signing process
  const handleSignPdf = async () => {
    if (!pdfFile || (!signature && !uploadedSignature && !inputText)) {
      setError(
        "Please upload a PDF file and provide a signature or input text."
      );
      return;
    }

    if (pageRange && !validatePageRange(pageRange)) {
      setError("Invalid page range format. Use formats like 1-3 or 2,5,7.");
      return;
    }

    setLoading(true);
    setError(null);
    setDownloadLink(null);

    const formData = new FormData();
    formData.append("pdf_file", pdfFile);

    if (activeOption === "draw" && signature) {
      formData.append("signature", signature, "signature.png");
    } else if (activeOption === "upload" && uploadedSignature) {
      formData.append("uploaded_signature", uploadedSignature);
    } else if (activeOption === "text" && inputText) {
      formData.append("input_text", inputText);
    }

    if (pageRange) {
      const pages = parsePageRange(pageRange);
      formData.append("page_range", JSON.stringify(pages));
    } else {
      formData.append("page_number", pageNumber);
    }

    try {
      const response = await axios.post(`${API_URL}/esign-pdf/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (err) {
      setError("An error occurred while signing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  // Load PDF and set the total pages
  useEffect(() => {
    if (pdfFile) {
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const loadingTask = pdfjs.getDocument({ data: event.target.result });
        const pdf = await loadingTask.promise;
        setTotalPages(pdf.numPages);
      };
      fileReader.readAsArrayBuffer(pdfFile);
    }
  }, [pdfFile]);

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
        E-sign Your PDF
      </h2>

      <div className="mb-4">
        <label
          htmlFor="pdfFile"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Upload PDF
        </label>
        <input
          type="file"
          id="pdfFile"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full text-sm file:border file:border-gray-300 file:rounded file:px-4 file:py-2 file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100"
        />
      </div>

      {totalPages > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Total Pages: <strong>{totalPages}</strong>
          </p>
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="pageRange"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Custom Page Range (e.g., 1-3, 5, 7-9)
        </label>
        <input
          type="text"
          id="pageRange"
          value={pageRange}
          onChange={handlePageRangeChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter page range"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <button
            onClick={() => setActiveOption("draw")}
            className={`py-2 px-4 rounded-lg text-white ${
              activeOption === "draw" ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Draw Signature
          </button>
          <button
            onClick={() => setActiveOption("upload")}
            className={`py-2 px-4 rounded-lg text-white ${
              activeOption === "upload" ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Upload Signature
          </button>
          <button
            onClick={() => setActiveOption("text")}
            className={`py-2 px-4 rounded-lg text-white ${
              activeOption === "text" ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Add Text
          </button>
        </div>

        {activeOption === "draw" && (
          <>
            <SignatureCanvas
              ref={(ref) => setSignatureCanvas(ref)}
              penColor="black"
              canvasProps={{
                className:
                  "w-full h-32 border border-gray-300 rounded-lg bg-white",
              }}
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={handleClearSignature}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear Signature
              </button>
              <button
                onClick={handleSaveSignature}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Save Signature
              </button>
            </div>
          </>
        )}

        {activeOption === "upload" && (
          <div className="mt-2">
            <label
              htmlFor="uploadedSignature"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Upload Signature
            </label>
            <input
              type="file"
              id="uploadedSignature"
              accept="image/*"
              onChange={handleUploadedSignatureChange}
              className="w-full text-sm file:border file:border-gray-300 file:rounded file:px-4 file:py-2 file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100"
            />
          </div>
        )}

        {activeOption === "text" && (
          <div className="mt-2">
            <label
              htmlFor="inputText"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Enter Text
            </label>
            <input
              type="text"
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter text to add to the PDF"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSignPdf}
        disabled={
          loading || !pdfFile || !(signature || uploadedSignature || inputText)
        }
        className={`w-full py-2 text-white rounded-lg ${
          loading || !pdfFile || !(signature || uploadedSignature || inputText)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Signing..." : "Sign PDF"}
      </button>

      {error && (
        <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {downloadLink && (
        <div className="mt-6 text-center">
          <a
            href={downloadLink}
            download="signed_pdf.pdf"
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Download Signed PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ESignPdfScreen;
