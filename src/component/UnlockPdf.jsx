// import React, { useState } from "react";
// import { pdfjs } from "react-pdf";
// import { saveAs } from "file-saver";

// const UnlockPdf = () => {
//   const [file, setFile] = useState(null); // To store uploaded file
//   const [password, setPassword] = useState(""); // To store the entered password
//   const [pdfUrl, setPdfUrl] = useState(null); // URL for displaying PDF preview
//   const [error, setError] = useState(null); // To handle error messages
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       const fileUrl = URL.createObjectURL(selectedFile);
//       setPdfUrl(fileUrl);
//     }
//   };

//   // Handle password change
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   // Unlock the PDF
//   const unlockPdf = async () => {
//     if (!file || !password) {
//       setError("Please upload a file and enter a password.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Load the PDF document using pdfjs
//       const loadingTask = pdfjs.getDocument({
//         url: URL.createObjectURL(file),
//         password,
//       });
//       const pdf = await loadingTask.promise;

//       // If the PDF is unlocked, render it or download
//       setIsLoading(false);
//       setPdfUrl(URL.createObjectURL(file));

//       // For example, you could download the unlocked PDF
//       const unlockedPdf = await pdf.save(); // Get the unlocked PDF bytes
//       const blob = new Blob([unlockedPdf], { type: "application/pdf" });
//       saveAs(blob, "unlocked_pdf.pdf");
//     } catch (error) {
//       setIsLoading(false);
//       setError("Failed to unlock the PDF. Check your password and try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Unlock Your Password-Protected PDF
//         </h1>
//         <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//           Upload your PDF, enter the password, and unlock it for viewing or
//           downloading.
//         </p>

//         <div className="max-w-xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
//           {/* File upload */}
//           <div className="mb-4">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               className="w-full p-4 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Password input */}
//           <div className="mb-4">
//             <input
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="w-full p-4 border border-gray-300 rounded-md"
//               placeholder="Enter PDF password"
//             />
//           </div>

//           {/* Display error message if any */}
//           {error && <div className="mb-4 text-red-500">{error}</div>}

//           {/* Unlock PDF button */}
//           <button
//             onClick={unlockPdf}
//             disabled={isLoading || !file || !password}
//             className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Unlocking..." : "Unlock PDF"}
//           </button>

//           {/* PDF Preview (Optional) */}
//           {pdfUrl && !error && !isLoading && (
//             <div className="mt-6">
//               <iframe
//                 src={pdfUrl}
//                 width="100%"
//                 height="600px"
//                 title="PDF Preview"
//                 frameBorder="0"
//               ></iframe>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UnlockPdf;

// import React, { useState } from "react";
// import { pdfjs } from "react-pdf";
// import { PDFDocument } from "pdf-lib";
// import { saveAs } from "file-saver";

// const UnlockPdf = () => {
//   const [file, setFile] = useState(null); // To store uploaded file
//   const [password, setPassword] = useState(""); // To store the entered password
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   // Handle password input change
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   // Function to remove password from the PDF
//   const removePassword = async () => {
//     if (!file || !password) {
//       setError("Please upload a file and enter the password.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Step 1: Unlock the PDF using pdfjs
//       const loadingTask = pdfjs.getDocument({
//         url: URL.createObjectURL(file),
//         password: password,
//       });

//       // Wait for the PDF to be loaded
//       const pdf = await loadingTask.promise;

//       // Step 2: Check if the PDF is loaded properly and has pages
//       if (!pdf || pdf.numPages === 0) {
//         throw new Error("Failed to load the PDF document or PDF is empty.");
//       }

//       console.log("PDF loaded successfully!", pdf);

//       // Step 3: Create a new PDF document using pdf-lib
//       const pdfDoc = await PDFDocument.create();

//       // Step 4: Extract each page from the loaded PDF and add it to the new PDF
//       const numPages = pdf.numPages;
//       for (let i = 0; i < numPages; i++) {
//         const page = await pdf.getPage(i + 1);

//         // Ensure the page is valid before copying it
//         if (page) {
//           const [copiedPage] = await pdfDoc.copyPages(pdf, [i]);
//           pdfDoc.addPage(copiedPage);
//         } else {
//           throw new Error(`Page ${i + 1} could not be copied.`);
//         }
//       }

//       // Step 5: Save the new PDF without password protection
//       const pdfBytes = await pdfDoc.save();
//       const blob = new Blob([pdfBytes], { type: "application/pdf" });

//       // Step 6: Trigger file download
//       saveAs(blob, "unlocked_pdf.pdf");

//       setIsLoading(false);
//     } catch (err) {
//       setIsLoading(false);
//       setError(`Failed to unlock the PDF. Error: ${err.message}`);
//       console.error(err);
//     }
//   };

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Unlock and Remove Password from PDF
//         </h1>
//         <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//           Upload your password-protected PDF, enter the password, and download
//           it without password protection.
//         </p>

//         <div className="max-w-xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
//           {/* File upload */}
//           <div className="mb-4">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               className="w-full p-4 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Password input */}
//           <div className="mb-4">
//             <input
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="w-full p-4 border border-gray-300 rounded-md"
//               placeholder="Enter PDF password"
//             />
//           </div>

//           {/* Error message */}
//           {error && <div className="mb-4 text-red-500">{error}</div>}

//           {/* Unlock PDF button */}
//           <button
//             onClick={removePassword}
//             disabled={isLoading || !file || !password}
//             className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Unlocking..." : "Remove Password"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UnlockPdf;

// import React, { useState } from "react";
// import { pdfjs } from "react-pdf";
// import { PDFDocument } from "pdf-lib";
// import { saveAs } from "file-saver";

// const UnlockPdf = () => {
//   const [file, setFile] = useState(null); // To store uploaded file
//   const [password, setPassword] = useState(""); // To store the entered password
//   const [pdfUrl, setPdfUrl] = useState(null); // URL for displaying PDF preview
//   const [error, setError] = useState(null); // To handle error messages
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       const fileUrl = URL.createObjectURL(selectedFile);
//       setPdfUrl(fileUrl);
//     }
//   };

//   // Handle password change
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   // Unlock the PDF and remove password
//   const unlockPdf = async () => {
//     if (!file || !password) {
//       setError("Please upload a file and enter a password.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Step 1: Load the PDF using pdfjs
//       const loadingTask = pdfjs.getDocument({
//         url: URL.createObjectURL(file),
//         password,
//       });

//       const pdf = await loadingTask.promise;

//       // Check if pdf is loaded correctly
//       if (!pdf || !pdf.numPages) {
//         throw new Error("Failed to load PDF.");
//       }

//       // Step 2: Create a new PDFDocument using pdf-lib
//       const pdfDoc = await PDFDocument.create();

//       // Step 3: Extract pages from the loaded PDF and add to the new PDF
//       const numPages = pdf.numPages;
//       for (let i = 0; i < numPages; i++) {
//         const page = await pdf.getPage(i + 1);

//         // Ensure the page is loaded correctly before adding
//         const [copiedPage] = await pdfDoc.copyPages(pdf, [i]);

//         // Add the copied page to the new PDF document
//         pdfDoc.addPage(copiedPage);
//       }

//       // Step 4: Save the new unlocked PDF
//       const unlockedPdfBytes = await pdfDoc.save();
//       const blob = new Blob([unlockedPdfBytes], { type: "application/pdf" });

//       // Step 5: Trigger download of the unlocked PDF
//       saveAs(blob, "unlocked_pdf.pdf");

//       setIsLoading(false);
//       setPdfUrl(URL.createObjectURL(blob)); // Optional: Display the unlocked PDF in the iframe
//     } catch (error) {
//       setIsLoading(false);
//       setError("Failed to unlock the PDF. Check your password and try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Unlock Your Password-Protected PDF
//         </h1>
//         <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//           Upload your PDF, enter the password, and unlock it for viewing or
//           downloading.
//         </p>

//         <div className="max-w-xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
//           {/* File upload */}
//           <div className="mb-4">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               className="w-full p-4 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Password input */}
//           <div className="mb-4">
//             <input
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="w-full p-4 border border-gray-300 rounded-md"
//               placeholder="Enter PDF password"
//             />
//           </div>

//           {/* Display error message if any */}
//           {error && <div className="mb-4 text-red-500">{error}</div>}

//           {/* Unlock PDF button */}
//           <button
//             onClick={unlockPdf}
//             disabled={isLoading || !file || !password}
//             className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Unlocking..." : "Unlock PDF"}
//           </button>

//           {/* PDF Preview (Optional) */}
//           {pdfUrl && !error && !isLoading && (
//             <div className="mt-6">
//               <iframe
//                 src={pdfUrl}
//                 width="100%"
//                 height="600px"
//                 title="PDF Preview"
//                 frameBorder="0"
//               ></iframe>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UnlockPdf;

import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

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
        "http://192.168.1.27:8000/unlock-pdf/", // Django API endpoint
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
