import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PdfToWordConverter = () => {
  const [selectedPdf, setSelectedPdf] = useState(null); // For PDF-to-Word
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wordUrl, setWordUrl] = useState(null); // For PDF-to-Word

  useEffect(() => {
    return () => {
      if (wordUrl) URL.revokeObjectURL(wordUrl);
    };
  }, [wordUrl]);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);
    setWordUrl(null);
    setProgress(0);
    console.log("PDF selected:", file);
  };

  const convertPdfToWord = async () => {
    if (!selectedPdf) return;

    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("pdf", selectedPdf);

    try {
      const response = await axios.post(
        "http://192.168.1.8:8000/convert/pdf-to-word/", // Endpoint for PDF-to-Word
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      setWordUrl(url);
    } catch (error) {
      console.error("PDF-to-Word conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-16 px-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          PDF to Word Converter
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          Quickly convert your PDF files to editable Word documents in a single
          click.
        </p>

        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div
            className="relative bg-cover bg-center mb-6 rounded-xl overflow-hidden"
            style={{
              backgroundImage: "url('/pdfIcon/PdfBg.svg')", // Background image for visual effect
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="flex justify-center items-center h-full">
              <img
                src="/pdfIcon/PdfToWord.svg" // Icon for PDF to Word
                alt="Upload Icon"
                className="h-20 w-22"
              />
            </div>
          </div>

          <div className="relative group">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handlePdfUpload}
              aria-label="File Upload"
            />
            <button className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2 hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg" // Icon for add file button
                alt="Add File Icon"
                className="h-5 w-5"
              />
              <span>
                {selectedPdf
                  ? `File selected: ${selectedPdf.name}`
                  : "Choose PDF File"}
              </span>
            </button>
          </div>
        </div>

        {selectedPdf && !wordUrl && (
          <button
            onClick={convertPdfToWord}
            disabled={isConverting}
            className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isConverting ? "Converting..." : "Convert to Word"}
          </button>
        )}

        {isConverting && (
          <div className="my-8 w-20 mx-auto">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: `rgba(62, 152, 199, ${progress / 100})`,
                textColor: "#3e98c7",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        )}

        {wordUrl && (
          <div className="mt-12">
            <a
              href={wordUrl}
              download="converted.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white font-bold px-10 py-4 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Download Word Document
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Your Word document is ready for download!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PdfToWordConverter;
