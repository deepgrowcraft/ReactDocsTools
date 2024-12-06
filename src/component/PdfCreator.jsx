import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const PdfCreator = () => {
  const [text, setText] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Handle text input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const createPdf = async () => {
    setIsCreating(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      // Add text to the page
      page.drawText(text, {
        x: 50,
        y: height - 100,
        size: 24,
        color: rgb(0, 0, 0), // Black color for the text
      });

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(pdfBlob, "created_pdf.pdf");

      setIsCreating(false);
    } catch (error) {
      console.error("PDF creation failed:", error);
      setIsCreating(false);
    }
  };

  return (
    <section className="px-4 py-16 mt-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Create Your PDF
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700 md:text-xl">
          Create a new PDF document by adding text.
        </p>

        <div className="max-w-xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
          {/* Text input for PDF content */}
          <div className="mb-4">
            <textarea
              value={text}
              onChange={handleTextChange}
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Enter text for your PDF..."
            />
          </div>

          {/* Create PDF button */}
          <button
            onClick={createPdf}
            disabled={isCreating || !text}
            className={`mt-4 w-full bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isCreating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCreating ? "Creating PDF..." : "Create PDF"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PdfCreator;
