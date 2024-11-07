import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PptToPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    console.log("Current pdfUrl:", pdfUrl);
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPdfUrl(null);
    console.log("File selected:", file);
  };

  const convertPptToPdf = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Starting conversion...");

      const response = await axios.post(
        "http://192.168.1.13:8000/convert/ppt-to-pdf/", // Update endpoint for PowerPoint files
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Handle binary data
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);

      console.log("PDF ready for download:", pdfUrl);
    } catch (error) {
      console.error("File conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-16 px-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Convert PowerPoint to PDF
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          This tool makes converting PowerPoint to PDF easy. Transform your PPT
          or PPTX files into the widely-used PDF format online.
        </p>

        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div
            className="relative bg-cover bg-center mb-6 rounded-xl overflow-hidden"
            style={{
              backgroundImage: "url('/home/doctoPdfBg.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="flex justify-center items-center h-full">
              <img
                src="/pdfIcon/pptToPdfIcon.svg"
                alt="Upload Icon"
                className="h-20 w-22"
              />
            </div>
          </div>

          <div className="relative group">
            <input
              type="file"
              accept=".ppt,.pptx"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleFileUpload}
              aria-label="File Upload"
            />
            <button className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2 hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg"
                alt="addFile Icon"
                className="h-5 w-5"
              />
              <span>
                {selectedFile ? selectedFile.name : "Choose a PowerPoint File"}
              </span>
            </button>
          </div>
        </div>

        {selectedFile && !pdfUrl && (
          <button
            onClick={convertPptToPdf}
            disabled={isConverting}
            className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isConverting ? "Converting..." : "Convert to PDF"}
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

        {pdfUrl && (
          <div className="mt-12">
            <a
              href={pdfUrl}
              download="converted.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white font-bold px-10 py-4 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Download PDF
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Your PDF is ready for download!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PptToPdf;
