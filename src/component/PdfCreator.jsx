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
  const [fontSize, setFontSize] = useState(14); // Default font size

  const handlePageTextChange = (index, value) => {
    const updatedPages = [...pages];

    // Dynamically calculate the maximum characters per line based on font size
    const maxCharsPerLine = Math.floor(600 / fontSize); // Adjust 600 to match textarea width

    const formattedText = value
      .split("\n")
      .map((line) => {
        const chunks = [];
        while (line.length > maxCharsPerLine) {
          chunks.push(line.slice(0, maxCharsPerLine));
          line = line.slice(maxCharsPerLine);
        }
        chunks.push(line); // Add the remaining text
        return chunks.join("\n");
      })
      .join("\n"); // Recombine the formatted lines

    updatedPages[index] = formattedText;
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
        let y = height - 30; // Starting position for text

        // Split text into lines
        const lines = text.split("\n");
        lines.forEach((line) => {
          const lineWidth = font.widthOfTextAtSize(line, fontSize);
          const x = getXPosition(alignment, lineWidth, width);

          page.drawText(line, {
            x,
            y,
            size: fontSize, // Use the selected font size
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
    <div className="min-h-screen p-8 mt-20 bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          PDF Creator
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
            className="w-12 h-12 border rounded-lg cursor-pointer"
          />

          <select
            value={alignment}
            onChange={(e) => setAlignment(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="A4">A4</option>
            <option value="Letter">Letter</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          />

          <button
            onClick={addPage}
            className="px-4 py-2 font-bold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:ring focus:ring-green-200"
          >
            + Add Page
          </button>
        </div>

        {/* Page Text Area */}
        <div className="flex flex-wrap items-center justify-center">
          {pages.map((page, index) => (
            <textarea
              key={index}
              value={page}
              onChange={(e) => handlePageTextChange(index, e.target.value)}
              rows="4"
              className="flex flex-wrap items-center justify-center w-3/4 p-4 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder={`Enter text for Page ${index + 1}`}
              style={{ fontSize: `${fontSize}px` }} // Dynamically set textarea font size
            ></textarea>
          ))}

          {/* Create PDF Button */}
          <button
            onClick={createPdf}
            disabled={isCreating || pages.every((p) => p === "")}
            className={`w-3/4 py-3 text-white font-bold bg-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
              isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-green-600"
            }`}
          >
            {isCreating ? "Creating PDF..." : "Create PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCreator;
