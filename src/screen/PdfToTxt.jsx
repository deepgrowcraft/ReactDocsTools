import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfToTxtConverter from "../component/PdfToTxt";

function PdfToTxtScreen() {
  return (
    <div>
      <PdfToTxtConverter />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfToTxtScreen;
