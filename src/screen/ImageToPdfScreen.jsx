import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import ImageToPdf from "../component/ImageToPdf";

function ImageToPdfScreen() {
  return (
    <div>
      <ImageToPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default ImageToPdfScreen;
