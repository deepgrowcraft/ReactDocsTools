import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ProtectPdfScreen = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleProtectPdf = async () => {
    // Validation: Check if PDF file, password, and confirm password are provided
    if (!pdfFile || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    setDownloadLink(null);

    const formData = new FormData();
    formData.append("pdf_file", pdfFile);
    formData.append("password", password);

    try {
      const response = await axios.post(`${API_URL}/protect-pdf/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // For handling the PDF file response
      });

      // Create a link to download the protected PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (err) {
      setError("An error occurred while protecting the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
        Protect Your PDF
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
          className="w-full text-sm file:border file:border-gray-300 file:rounded file:px-4 file:py-2 file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Enter Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-full p-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <button
        onClick={handleProtectPdf}
        disabled={loading}
        className={`w-full py-2 text-white rounded-lg ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } transition-all`}
      >
        {loading ? "Protecting..." : "Protect PDF"}
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
            download="protected_pdf.pdf"
            className="px-4 py-2 text-white transition-all bg-green-500 rounded-lg hover:bg-green-600"
          >
            Download Protected PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ProtectPdfScreen;
