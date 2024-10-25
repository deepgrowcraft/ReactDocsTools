import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/header";
import Home from "./screen/Home";
import About from "./screen/Aboutus";
import Contact from "./screen/Contactus";
import Footer from "./component/Footer";
import DocToPdfScreen from "./screen/DocToPdfScreen";
import ExelToPdfScreen from "./screen/ExelToPdf";
import PptToPdfScreen from "./screen/PptToPdfScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<PptToPdfScreen />} />
          <Route path="/contact" element={<DocToPdfScreen />} />
          <Route path="/docToPdf" element={<DocToPdfScreen />} />
          <Route path="/ExelToPdfScreen" element={<ExelToPdfScreen />} />
          <Route path="/PptToPdfScreen" element={<PptToPdfScreen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
