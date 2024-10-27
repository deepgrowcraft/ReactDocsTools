import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PdfToImageConverter = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);
    setImageUrls([]);
    setSuccessMessage("");
    setProgress(0);
    console.log("PDF selected:", file);
  };

  const convertPdfToImages = async () => {
    if (!selectedPdf) return;

    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("pdf", selectedPdf);

    try {
      const endpoint = "http://192.168.1.12:8000/convert/pdf-to-images/";

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      const base64ImageUrls = response.data.images.map(
        (imgBase64) => `data:image/png;base64,${imgBase64}`
      );
      setImageUrls(base64ImageUrls);
      setSuccessMessage("Conversion Complete! Your images are ready.");
    } catch (error) {
      console.error("PDF-to-Image conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-16 px-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          PDF to Image Converter
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          Convert each page of your PDF files into individual images.
        </p>

        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div
            className="relative bg-cover bg-center mb-6 rounded-xl overflow-hidden"
            style={{
              backgroundImage: "url('/pdfIcon/PdfBg.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="flex justify-center items-center h-full">
              <img
                src="/pdfIcon/pdfToImage.svg" // Icon for PDF to Image
                alt="Upload Icon"
                className="h-20 w-22"
              />
            </div>
          </div>

          <div className="relative group mb-4">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handlePdfUpload}
              aria-label="File Upload"
            />
            <button className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2 hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg"
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

          {selectedPdf && (
            <button
              onClick={convertPdfToImages}
              disabled={isConverting}
              className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isConverting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isConverting ? "Converting..." : "Convert to Images"}
            </button>
          )}
        </div>

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

        {successMessage && (
          <p className="mt-6 text-green-600 text-xl font-bold animate-bounce">
            {successMessage}
          </p>
        )}

        {imageUrls.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={url}
                  alt={`Page ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <p className="text-center text-sm text-gray-600 p-2">
                  Page {index + 1}
                </p>
                <a
                  href={url}
                  download={`page-${index + 1}.png`}
                  className="block text-center bg-blue-500 text-white font-bold px-4 py-2 rounded-b-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Download Page {index + 1}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PdfToImageConverter;
