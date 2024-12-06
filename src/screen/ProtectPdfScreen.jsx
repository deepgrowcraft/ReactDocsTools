import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import ProtectPdfScreen from "../component/ProtectPdf";

function SecurePdfScreen() {
  return (
    <div>
      <ProtectPdfScreen />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default SecurePdfScreen;
