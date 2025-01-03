import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfToTxtConverter from "../component/PdfToTxt";
import { Helmet } from "react-helmet-async";

function PdfToTxtScreen() {
  return (
    <div>
      <Helmet>
        <title>PDF Small Tools - pdf to txt convertor</title>
        <meta
          name="description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta
          property="og:title"
          content="PDF Small Tools - Convert, Edit, Compress & More"
        />
        <meta
          property="og:description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdfsmalltools.com/" />
        <meta
          property="og:image"
          content="https://pdfsmalltools.com/pdfIcon/editPdfs.svg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PDF Small Tools - Convert, Edit, Compress & More"
        />
        <meta
          name="twitter:description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta
          name="twitter:image"
          content="https://pdfsmalltools.com/pdfIcon/editPdfs.svg"
        />
        <link rel="icon" href="https://pdfsmalltools.com/favicon.ico" />
      </Helmet>
      <PdfToTxtConverter />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfToTxtScreen;
