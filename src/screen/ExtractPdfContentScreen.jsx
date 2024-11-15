import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import ExtractPdfContent from "../component/ExtractPdfContent";

function ExtractPdfContentScreen() {
  return (
    <div>
      <ExtractPdfContent />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default ExtractPdfContentScreen;
