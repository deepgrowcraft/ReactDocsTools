import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import SplitPdf from "../component/splitPdf";

function SplitPdfScreen() {
  return (
    <div>
      <SplitPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default SplitPdfScreen;
