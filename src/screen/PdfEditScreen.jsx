import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfEditor from "../component/PdfEditor/PdfEditor";

function PdfEditScreen() {
  return (
    <div>
      <PdfEditor />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PdfEditScreen;
