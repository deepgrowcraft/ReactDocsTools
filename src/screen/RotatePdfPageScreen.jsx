import React from "react";
import ToolsScreen from "../component/ToolComponent";
import DocToPdfGuide from "../component/DocToPdfGuide";
import RotatePdfPages from "../component/RotatePdfPages";

function RotatePdfPagesScreen() {
  return (
    <div>
      <RotatePdfPages />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default RotatePdfPagesScreen;
