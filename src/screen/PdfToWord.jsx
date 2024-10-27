import React from "react";
import DocToPdf from "../component/DocToPdf";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import ExcelToPdf from "../component/ExelToPdf";
import PdfToWordConverter from "../component/PdfToWord";

function PdfToWordScreen() {
  return (
    <div>
      <PdfToWordConverter />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfToWordScreen;
