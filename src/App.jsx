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
import ImageToPdfScreen from "./screen/ImageToPdfScreen";
import ScrollToTop from "./component/ScrollToTop";
import HtmlToPdfScreen from "./screen/HtmlToPdfScreen";
import PdfOCRScreen from "./screen/PdfOCRScreen";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docToPdf" element={<DocToPdfScreen />} />
          <Route path="/ExelToPdfScreen" element={<ExelToPdfScreen />} />
          <Route path="/PptToPdfScreen" element={<PptToPdfScreen />} />
          <Route path="/ImageToPdfScreen" element={<ImageToPdfScreen />} />
          <Route path="/HtmlToPdfScreen" element={<HtmlToPdfScreen />} />
          <Route path="/PdfOCRScreen" element={<PdfOCRScreen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
