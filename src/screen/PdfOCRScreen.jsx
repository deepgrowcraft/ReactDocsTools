import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfOcr from "../component/PdfOCR";

function PdfOCRScreen() {
  return (
    <div>
      <PdfOcr />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfOCRScreen;
