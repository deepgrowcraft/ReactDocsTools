import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import ESignPdfScreen from "../component/ESignPdf";

function ESignatureScreen() {
  return (
    <div>
      <ESignPdfScreen />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default ESignatureScreen;
