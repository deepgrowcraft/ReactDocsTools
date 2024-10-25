import React from "react";
import DocToPdf from "../component/DocToPdf";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";

function DocToPdfScreen() {
  return (
    <div>
      <DocToPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default DocToPdfScreen;
