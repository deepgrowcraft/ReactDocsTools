import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import MergePdf from "../component/MergePdf";

function MergePdfScreen() {
  return (
    <div>
      <MergePdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default MergePdfScreen;
