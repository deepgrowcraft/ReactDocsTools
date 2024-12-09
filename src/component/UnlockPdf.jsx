import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
const API_URL = import.meta.env.VITE_API_URL;

const UnlockPdf = () => {
  const [file, setFile] = useState(null); // To store uploaded file
  const [password, setPassword] = useState(""); // To store the entered password
  const [pdfUrl, setPdfUrl] = useState(null); // URL for displaying PDF preview
  const [error, setError] = useState(null); // To handle error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(fileUrl);
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Unlock the PDF via Django API
  const unlockPdf = async () => {
    if (!file || !password) {
      setError("Please upload a file and enter a password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("pdf_file", file);
    formData.append("password", password);

    try {
      const response = await axios.post(
        `${API_URL}/unlock-pdf/`, // Django API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // to handle the PDF file response
        }
      );

      // Create a Blob URL for the unlocked PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "unlocked_pdf.pdf");

      setIsLoading(false);
      setPdfUrl(URL.createObjectURL(blob)); // Optional: Display the unlocked PDF in the iframe
    } catch (error) {
      setIsLoading(false);
      setError("Failed to unlock the PDF. Check your password and try again.");
      console.error(error);
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Unlock Your Password-Protected PDF
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Upload your PDF, enter the password, and unlock it for viewing or
          downloading.
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

          {/* Password input */}
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Enter PDF password"
            />
          </div>

          {/* Display error message if any */}
          {error && <div className="mb-4 text-red-500">{error}</div>}

          {/* Unlock PDF button */}
          <button
            onClick={unlockPdf}
            disabled={isLoading || !file || !password}
            className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Unlocking..." : "Unlock PDF"}
          </button>

          {/* PDF Preview (Optional) */}
          {pdfUrl && !error && !isLoading && (
            <div className="mt-6">
              <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                title="PDF Preview"
                frameBorder="0"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UnlockPdf;
