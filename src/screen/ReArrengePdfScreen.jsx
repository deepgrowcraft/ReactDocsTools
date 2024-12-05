import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PdfEditor from "../component/PdfEditor/PdfEditor";
import RearrangePdf from "../component/ReArrengePdf";

function ReArrengeScreen() {
  return (
    <div>
      <RearrangePdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default ReArrengeScreen;
