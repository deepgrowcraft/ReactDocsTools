import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfWithPageNumbers from "../component/PdfWithPageNumbers";

function PdfWithPageNumberScreen() {
  return (
    <div>
      <PdfWithPageNumbers />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfWithPageNumberScreen;
