import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfCreator from "../component/PdfCreator";

function PdfCreatorScreen() {
  return (
    <div>
      <PdfCreator />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfCreatorScreen;
