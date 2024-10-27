import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfToTxtConverter from "../component/PdfToTxt";
import PdfToImageConverter from "../component/PdfToImage";

function PdfToImageScreen() {
  return (
    <div>
      <PdfToImageConverter />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfToImageScreen;
