// import React, { useState } from "react";
// import { PDFDocument, rgb } from "pdf-lib";
// import { saveAs } from "file-saver";

// const PdfCreator = () => {
//   const [text, setText] = useState("");
//   const [isCreating, setIsCreating] = useState(false);

//   // Handle text input
//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const createPdf = async () => {
//     setIsCreating(true);

//     try {
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage();
//       const { width, height } = page.getSize();

//       // Add text to the page
//       page.drawText(text, {
//         x: 50,
//         y: height - 100,
//         size: 24,
//         color: rgb(0, 0, 0), // Black color for the text
//       });

//       // Save the PDF
//       const pdfBytes = await pdfDoc.save();
//       const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
//       saveAs(pdfBlob, "created_pdf.pdf");

//       setIsCreating(false);
//     } catch (error) {
//       console.error("PDF creation failed:", error);
//       setIsCreating(false);
//     }
//   };

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Create Your PDF
//         </h1>
//         <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
//           Create a new PDF document by adding text.
//         </p>

//         <div className="max-w-xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
//           {/* Text input for PDF content */}
//           <div className="mb-4">
//             <textarea
//               value={text}
//               onChange={handleTextChange}
//               rows="4"
//               className="w-full p-4 border border-gray-300 rounded-md"
//               placeholder="Enter text for your PDF..."
//             />
//           </div>

//           {/* Create PDF button */}
//           <button
//             onClick={createPdf}
//             disabled={isCreating || !text}
//             className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
//               isCreating ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isCreating ? "Creating PDF..." : "Create PDF"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PdfCreator;

// import React, { useState } from "react";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import { saveAs } from "file-saver";

// const PdfCreator = () => {
//   const [pages, setPages] = useState([""]); // Multiple pages with text
//   const [selectedFont, setSelectedFont] = useState("Helvetica");
//   const [textColor, setTextColor] = useState("#000000");
//   const [alignment, setAlignment] = useState("left");
//   const [imageFile, setImageFile] = useState(null);
//   const [pageSize, setPageSize] = useState("A4");
//   const [isCreating, setIsCreating] = useState(false);

//   // Handle text for individual pages
//   const handlePageTextChange = (index, value) => {
//     const updatedPages = [...pages];
//     updatedPages[index] = value;
//     setPages(updatedPages);
//   };

//   // Add a new blank page
//   const addPage = () => setPages([...pages, ""]);

//   // Handle image upload
//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   // Clamp function for alignment
//   const getXPosition = (alignment, text, pageWidth) => {
//     if (alignment === "center") return (pageWidth - text.length * 12) / 2;
//     if (alignment === "right") return pageWidth - 50 - text.length * 12;
//     return 50; // Default to left
//   };

//   // Create PDF with all features
//   const createPdf = async () => {
//     setIsCreating(true);
//     try {
//       const pdfDoc = await PDFDocument.create();

//       // Embed fonts
//       const font =
//         selectedFont === "Helvetica"
//           ? await pdfDoc.embedFont(StandardFonts.Helvetica)
//           : await pdfDoc.embedFont(StandardFonts.TimesRoman);

//       // Page dimensions
//       const pageDimensions = pageSize === "A4" ? [595, 842] : [612, 792];

//       for (let i = 0; i < pages.length; i++) {
//         const page = pdfDoc.addPage(pageDimensions);
//         const { width, height } = page.getSize();

//         // Add text
//         const text = pages[i];
//         const x = getXPosition(alignment, text, width);
//         page.drawText(text, {
//           x,
//           y: height - 100,
//           size: 24,
//           font,
//           color: rgb(
//             parseInt(textColor.slice(1, 3), 16) / 255,
//             parseInt(textColor.slice(3, 5), 16) / 255,
//             parseInt(textColor.slice(5, 7), 16) / 255
//           ),
//         });

//         // Add image if available on the first page
//         if (i === 0 && imageFile) {
//           const reader = new FileReader();
//           reader.onload = async () => {
//             const imageBytes = new Uint8Array(reader.result);
//             let image;
//             if (imageFile.type === "image/jpeg") {
//               image = await pdfDoc.embedJpg(imageBytes);
//             } else if (imageFile.type === "image/png") {
//               image = await pdfDoc.embedPng(imageBytes);
//             } else {
//               console.error("Unsupported image format");
//               return;
//             }
//             page.drawImage(image, {
//               x: 50,
//               y: height - 300,
//               width: 200,
//               height: 200,
//             });

//             // Save the PDF after image embedding
//             finalizePdf(pdfDoc);
//           };
//           reader.readAsArrayBuffer(imageFile);
//           return;
//         }
//       }

//       // Save the PDF if no image is uploaded
//       finalizePdf(pdfDoc);
//     } catch (error) {
//       console.error("PDF creation failed:", error);
//       setIsCreating(false);
//     }
//   };

//   const finalizePdf = async (pdfDoc) => {
//     const pdfBytes = await pdfDoc.save();
//     const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
//     saveAs(pdfBlob, "enhanced_pdf.pdf");
//     setIsCreating(false);
//   };

//   return (
//     <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//       <div className="container mx-auto text-center">
//         <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//           Enhanced PDF Creator
//         </h1>

//         {/* Page Text Input */}
//         {pages.map((page, index) => (
//           <div key={index} className="mb-4">
//             <textarea
//               value={page}
//               onChange={(e) => handlePageTextChange(index, e.target.value)}
//               rows="4"
//               className="w-full p-4 border border-gray-300 rounded-md"
//               placeholder={`Enter text for page ${index + 1}...`}
//             />
//           </div>
//         ))}

//         {/* Add Page Button */}
//         <button
//           onClick={addPage}
//           className="px-6 py-2 mb-4 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
//         >
//           Add Page
//         </button>

//         {/* Image Upload */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">
//             Upload Image (optional):
//           </label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         {/* Font Selection */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Select Font:</label>
//           <select
//             value={selectedFont}
//             onChange={(e) => setSelectedFont(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             <option value="Helvetica">Helvetica</option>
//             <option value="TimesRoman">Times Roman</option>
//           </select>
//         </div>

//         {/* Text Color */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Text Color:</label>
//           <input
//             type="color"
//             value={textColor}
//             onChange={(e) => setTextColor(e.target.value)}
//           />
//         </div>

//         {/* Alignment */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Text Alignment:</label>
//           <select
//             value={alignment}
//             onChange={(e) => setAlignment(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             <option value="left">Left</option>
//             <option value="center">Center</option>
//             <option value="right">Right</option>
//           </select>
//         </div>

//         {/* Page Size */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Page Size:</label>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             <option value="A4">A4</option>
//             <option value="Letter">Letter</option>
//           </select>
//         </div>

//         {/* Create PDF Button */}
//         <button
//           onClick={createPdf}
//           disabled={isCreating || pages.every((p) => p === "")}
//           className={`w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
//             isCreating ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {isCreating ? "Creating PDF..." : "Create PDF"}
//         </button>
//       </div>
//     </section>
//   );
// };

// export default PdfCreator;

import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

const PdfCreator = () => {
  const [pages, setPages] = useState([""]);
  const [selectedFont, setSelectedFont] = useState("Helvetica");
  const [textColor, setTextColor] = useState("#000000");
  const [alignment, setAlignment] = useState("left");
  const [imageFile, setImageFile] = useState(null);
  const [pageSize, setPageSize] = useState("A4");
  const [isCreating, setIsCreating] = useState(false);

  const handlePageTextChange = (index, value) => {
    const updatedPages = [...pages];
    updatedPages[index] = value;
    setPages(updatedPages);
  };

  const addPage = () => setPages([...pages, ""]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const getXPosition = (alignment, lineWidth, pageWidth) => {
    if (alignment === "center") return (pageWidth - lineWidth) / 2;
    if (alignment === "right") return pageWidth - lineWidth - 50;
    return 50; // Default to left
  };

  const createPdf = async () => {
    setIsCreating(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const font =
        selectedFont === "Helvetica"
          ? await pdfDoc.embedFont(StandardFonts.Helvetica)
          : await pdfDoc.embedFont(StandardFonts.TimesRoman);

      const pageDimensions = pageSize === "A4" ? [595, 842] : [612, 792];

      for (let i = 0; i < pages.length; i++) {
        const page = pdfDoc.addPage(pageDimensions);
        const { width, height } = page.getSize();
        const text = pages[i];
        const fontSize = 14;
        let y = height - 30; // Starting position for text

        // Split text into lines
        const lines = text.split("\n");
        lines.forEach((line) => {
          const lineWidth = font.widthOfTextAtSize(line, fontSize);
          const x = getXPosition(alignment, lineWidth, width);

          page.drawText(line, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(
              parseInt(textColor.slice(1, 3), 16) / 255,
              parseInt(textColor.slice(3, 5), 16) / 255,
              parseInt(textColor.slice(5, 7), 16) / 255
            ),
          });
          y -= fontSize + 10; // Move down for next line
        });

        // Add image if available on the first page
        if (i === 0 && imageFile) {
          const imageBytes = await imageFile.arrayBuffer();
          let image;
          if (imageFile.type === "image/jpeg") {
            image = await pdfDoc.embedJpg(imageBytes);
          } else if (imageFile.type === "image/png") {
            image = await pdfDoc.embedPng(imageBytes);
          }
          page.drawImage(image, {
            x: 50,
            y: y - 200, // Place image below the text
            width: 200,
            height: 200,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(pdfBlob, "enhanced_pdf.pdf");
    } catch (error) {
      console.error("PDF creation failed:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Interactive PDF Creator
        </h1>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="Helvetica">Helvetica</option>
            <option value="TimesRoman">Times Roman</option>
          </select>

          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-12 h-12 border rounded cursor-pointer"
          />

          <select
            value={alignment}
            onChange={(e) => setAlignment(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="A4">A4</option>
            <option value="Letter">Letter</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="px-4 py-2 border rounded"
          />

          <button
            onClick={addPage}
            className="px-4 py-2 font-bold text-white transition-transform bg-blue-500 rounded shadow-md hover:bg-blue-600 hover:scale-105"
          >
            + Add Page
          </button>
        </div>

        {/* Page Text Area */}
        {pages.map((page, index) => (
          <textarea
            key={index}
            value={page}
            onChange={(e) => handlePageTextChange(index, e.target.value)}
            rows="4"
            className="w-full p-4 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder={`Enter text for Page ${index + 1}`}
          ></textarea>
        ))}

        {/* Create PDF Button */}
        <button
          onClick={createPdf}
          disabled={isCreating || pages.every((p) => p === "")}
          className={`w-full py-3 text-white font-bold bg-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
            isCreating ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {isCreating ? "Creating PDF..." : "Create PDF"}
        </button>
      </div>
    </div>
  );
};

export default PdfCreator;
