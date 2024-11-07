import React from "react";
import ToolsScreen from "../component/ToolComponent";
import FlipPdfScreens from "../component/FlipPdf";
import DocToPdfGuide from "../component/DocToPdfGuide";

function FlipPdfScreen() {
  return (
    <div>
      <FlipPdfScreens />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default FlipPdfScreen;
