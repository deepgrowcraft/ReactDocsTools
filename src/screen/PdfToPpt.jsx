import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfToPptConverter from "../component/PdfToPpt";

function PdfToPPTScreen() {
  return (
    <div>
      <PdfToPptConverter />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfToPPTScreen;
