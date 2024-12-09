import React from "react";
import ToolsScreen from "../component/ToolComponent";
import DocToPdfGuide from "../component/DocToPdfGuide";
import WatermarkPdf from "../component/AddWaterMark";

function AddWaterMarkScreen() {
  return (
    <div>
      <WatermarkPdf />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default AddWaterMarkScreen;
