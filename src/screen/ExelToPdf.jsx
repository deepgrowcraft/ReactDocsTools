import React from "react";
import DocToPdf from "../component/DocToPdf";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import ExcelToPdf from "../component/ExelToPdf";

function ExelToPdfScreen() {
  return (
    <div>
      <ExcelToPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default ExelToPdfScreen;
