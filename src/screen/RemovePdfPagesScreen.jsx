import React from "react";
import DocToPdfGuide from "../component/DocToPdfGuide";
import ToolsScreen from "../component/ToolComponent";
import RemovePdfPages from "../component/RemovePdfPages";

function RemovePdfPagesScreen() {
  return (
    <div>
      <RemovePdfPages />
      <DocToPdfGuide />
      <ToolsScreen />
    </div>
  );
}

export default RemovePdfPagesScreen;
