import React from "react";

const tools = [
  {
    name: "Word to PDF",
    description: "Transform DOC and DOCX files into PDFs.",
  },
  { name: "Excel to PDF", description: "Convert Excel files into PDF format." },
  { name: "PPT to PDF", description: "Convert PowerPoint files into PDF." },
  { name: "IMAGE to PDF", description: "Convert images into PDF format." },
  { name: "HTML to PDF", description: "Convert HTML files into PDFs." },
  { name: "PDF OCR", description: "Convert scanned PDFs to editable text." },
  { name: "PDF to Word", description: "Convert PDF files into DOC or DOCX." },
  { name: "PDF to Excel", description: "Convert PDF files into Excel sheets." },
  {
    name: "PDF to PPT",
    description: "Convert PDF files into PowerPoint slides.",
  },
  { name: "PDF to TEXT", description: "Extract text from PDF files." },
  { name: "PDF to IMAGE", description: "Convert PDF pages into image files." },
  { name: "Merge PDF", description: "Merge multiple PDFs into one file." },
  { name: "Split PDF", description: "Split a PDF into multiple parts." },
  { name: "Compress PDF", description: "Compress the size of your PDFs." },
  {
    name: "Flip PDF Pages",
    description: "Flip through PDF pages interactively.",
  },
  {
    name: "Remove PDF Pages",
    description: "Delete specific pages from a PDF.",
  },
  { name: "PDF Scanner", description: "Scan documents and save them as PDFs." },
  {
    name: "Extract PDF Content",
    description: "Extract text and images from PDFs.",
  },
  { name: "Rotate PDF", description: "Rotate PDF pages." },
  { name: "Crop PDF", description: "Crop the margins of PDF files." },
  { name: "Edit PDF", description: "Edit text and images in PDFs." },
  { name: "Rearrange PDF", description: "Reorder the pages in a PDF file." },
  { name: "PDF Creator", description: "Create a new PDF from scratch." },
  { name: "Add Page Number", description: "Add page numbers to a PDF." },
  { name: "Add Watermark", description: "Add a watermark to your PDF." },
  { name: "Unlock PDF", description: "Unlock password-protected PDFs." },
  { name: "Protect PDF", description: "Encrypt your PDF files." },
  { name: "eSign PDF", description: "Electronically sign PDF documents." },
];

const ToolsGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Free Online Document Conversion Made Easy
        </h2>
        <p className="text-lg text-gray-600">
          Effortlessly convert your documents with our free online tools.
          Whether you need to change formats or compress files, our service
          makes it quick and easy—all without any cost.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                {tool.name}
              </h3>
              <p className="text-gray-500">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
