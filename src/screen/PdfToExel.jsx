import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfToExcelConverter from "../component/PdfToExel";

function PdfToExelScreen() {
  return (
    <div>
      <PdfToExcelConverter />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfToExelScreen;
