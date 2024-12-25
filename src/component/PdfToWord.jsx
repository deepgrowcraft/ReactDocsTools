// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// const API_URL = import.meta.env.VITE_API_URL;

// const PdfToWordConverter = () => {
//   const [selectedPdf, setSelectedPdf] = useState(null); // For PDF-to-Word
//   const [isConverting, setIsConverting] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [wordUrl, setWordUrl] = useState(null); // For PDF-to-Word

//   useEffect(() => {
//     return () => {
//       if (wordUrl) URL.revokeObjectURL(wordUrl);
//     };
//   }, [wordUrl]);

//   const handlePdfUpload = (event) => {
//     const file = event.target.files[0];
//     setSelectedPdf(file);
//     setWordUrl(null);
//     setProgress(0);
//     console.log("PDF selected:", file);
//   };

//   const convertPdfToWord = async () => {
//     if (!selectedPdf) return;

//     setIsConverting(true);
//     setProgress(0);

//     const formData = new FormData();
//     formData.append("pdf", selectedPdf);

//     try {
//       const response = await axios.post(
//         `${API_URL}/convert/pdf-to-word/`, // Endpoint for PDF-to-Word
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           responseType: "blob",
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setProgress(percentCompleted);
//           },
//         }
//       );

//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       });
//       const url = URL.createObjectURL(blob);
//       setWordUrl(url);
//     } catch (error) {
//       console.error("PDF-to-Word conversion failed:", error);
//     } finally {
//       setIsConverting(false);
//     }
//   };

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           PDF to Word Converter
//         </h1>
//         <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//           Quickly convert your PDF files to editable Word documents in a single
//           click.
//         </p>

//         <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
//           <div
//             className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl"
//             style={{
//               backgroundImage: "url('/pdfIcon/PdfBg.svg')", // Background image for visual effect
//               backgroundSize: "contain",
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//               height: "200px",
//             }}
//           >
//             <div className="flex items-center justify-center h-full">
//               <img
//                 src="/pdfIcon/PdfToWord.svg" // Icon for PDF to Word
//                 alt="Upload Icon"
//                 className="h-20 w-22"
//               />
//             </div>
//           </div>

//           <div className="relative group">
//             <input
//               type="file"
//               accept="application/pdf"
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               onChange={handlePdfUpload}
//               aria-label="File Upload"
//             />
//             <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105">
//               <img
//                 src="/home/addFile.svg" // Icon for add file button
//                 alt="Add File Icon"
//                 className="w-5 h-5"
//               />
//               <span>
//                 {selectedPdf
//                   ? `File selected: ${selectedPdf.name}`
//                   : "Choose PDF File"}
//               </span>
//             </button>
//           </div>
//         </div>

//         {selectedPdf && !wordUrl && (
//           <button
//             onClick={convertPdfToWord}
//             disabled={isConverting}
//             className="px-8 py-3 mt-6 font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
//           >
//             {isConverting ? "Converting..." : "Convert to Word"}
//           </button>
//         )}

//         {isConverting && (
//           <div className="w-20 mx-auto my-8">
//             <CircularProgressbar
//               value={progress}
//               text={`${progress}%`}
//               styles={buildStyles({
//                 textSize: "16px",
//                 pathColor: `rgba(62, 152, 199, ${progress / 100})`,
//                 textColor: "#3e98c7",
//                 trailColor: "#d6d6d6",
//               })}
//             />
//           </div>
//         )}

//         {wordUrl && (
//           <div className="mt-12">
//             <a
//               href={wordUrl}
//               download="converted.docx"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-green-500 rounded-full shadow-xl hover:bg-green-600 hover:scale-105"
//             >
//               Download Word Document
//             </a>
//             <p className="mt-4 text-sm text-gray-600">
//               Your Word document is ready for download!
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PdfToWordConverter;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_URL = import.meta.env.VITE_API_URL;

const PdfToWordConverter = () => {
  const [selectedPdf, setSelectedPdf] = useState(null); // For PDF-to-Word
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wordUrl, setWordUrl] = useState(null); // For PDF-to-Word
  const [error, setError] = useState(null); // To store error messages

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
    setError(null); // Clear any previous errors
    console.log("PDF selected:", file);
  };

  const convertPdfToWord = async () => {
    if (!selectedPdf) return;

    setIsConverting(true); // Show loader
    setProgress(0);
    setError(null); // Clear any previous errors

    const formData = new FormData();
    formData.append("pdf", selectedPdf);

    try {
      const response = await axios.post(
        `${API_URL}/convert/pdf-to-word/`, // Endpoint for PDF-to-Word
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted); // Update progress
          },
        }
      );

      // Process API response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      setWordUrl(url); // Set the Word document URL
    } catch (error) {
      console.error("PDF-to-Word conversion failed:", error);
      setError(
        error.response?.data?.error ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsConverting(false); // Stop loader
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          PDF to Word Converter
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Quickly convert your PDF files to editable Word documents in a single
          click.
        </p>

        <div className="max-w-xl p-8 mx-auto transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl">
          <div
            className="relative mb-6 overflow-hidden bg-center bg-cover rounded-xl"
            style={{
              backgroundImage: "url('/pdfIcon/PdfBg.svg')", // Background image for visual effect
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="flex items-center justify-center h-full">
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
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handlePdfUpload}
              aria-label="File Upload"
            />
            <button className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105">
              <img
                src="/home/addFile.svg" // Icon for add file button
                alt="Add File Icon"
                className="w-5 h-5"
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
            className="px-8 py-3 mt-6 font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
          >
            {isConverting ? "Converting..." : "Convert to Word"}
          </button>
        )}

        {isConverting && (
          <div className="mt-8">
            <div className="w-20 mx-auto my-4">
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
            <p className="text-sm text-gray-600">Processing... Please wait.</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {wordUrl && (
          <div className="mt-12">
            <a
              href={wordUrl}
              download="converted.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 font-bold text-white transition-all duration-300 transform bg-green-500 rounded-full shadow-xl hover:bg-green-600 hover:scale-105"
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
