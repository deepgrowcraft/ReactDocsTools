import React from "react";
import Hero from "../component/Hero";
import ToolsGrid from "../component/ToolsGrid";
import HowItWorks from "../component/HowItWork";
import Pricing from "../component/Pricing";

function Home() {
  return (
    <div>
      <Hero />
      <ToolsGrid />
      <HowItWorks />
      <Pricing />
    </div>
  );
}

export default Home;
