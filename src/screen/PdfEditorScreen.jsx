import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfEditor from "../component/PdfEditor";

function PdfEditorScreen() {
  return (
    <div>
      <PdfEditor />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfEditorScreen;
