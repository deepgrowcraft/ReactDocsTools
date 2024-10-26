import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import HtmlToPdf from "../component/HtmlToPdf";

function HtmlToPdfScreen() {
  return (
    <div>
      <HtmlToPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default HtmlToPdfScreen;
