import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import CompressPdf from "../component/CompressPdf";

function CompressPdfScreen() {
  return (
    <div>
      <CompressPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default CompressPdfScreen;
