import React from "react";
import ToolsScreen from "../component/ToolComponent";
import DocToPdfGuide from "../component/DocToPdfGuide";
import UnlockPdf from "../component/UnlockPdf";

function UnlockPdfScreen() {
  return (
    <div>
      <UnlockPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default UnlockPdfScreen;
