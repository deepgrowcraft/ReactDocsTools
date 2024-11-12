import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import CropPdfPages from "../component/CropPdfPages";

function CropPdfScreen() {
  return (
    <div>
      <CropPdfPages />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default CropPdfScreen;
