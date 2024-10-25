import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import PptToPdf from "../component/PptToPdf";

function PptToPdfScreen() {
  return (
    <div>
      <PptToPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default PptToPdfScreen;
