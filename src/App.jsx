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
import PdfToWordScreen from "./screen/PdfToWord";
import PdfToExelScreen from "./screen/PdfToExel";
import PdfToPPTScreen from "./screen/PdfToPpt";
import PdfToTxtScreen from "./screen/PdfToTxt";
import PdfToImageScreen from "./screen/PdfToImage";
import MergePdfScreen from "./screen/MergePdfScreen";
import SplitPdfScreen from "./screen/SplitPdfScreen";
import CompressPdfScreen from "./screen/CompressPdfScreen";
import FlipPdfScreen from "./screen/FlipPdfScreen";
import RemovePdfPagesScreen from "./screen/RemovePdfPagesScreen";
import RotatePdfPagesScreen from "./screen/RotatePdfPageScreen";
import CropPdfScreen from "./screen/CropPdfPagesScreen";
import ExtractPdfContentScreen from "./screen/ExtractPdfContentScreen";
import PdfEditScreen from "./screen/PdfEditScreen";
import ReArrengeScreen from "./screen/ReArrengePdfScreen";
import PdfCreatorScreen from "./screen/PdfCreatorScreen";
import PdfWithPageNumberScreen from "./screen/AddPageNumberPdfScreen";
import AddWaterMarkScreen from "./screen/WatermarkScreen";
import UnlockPdfScreen from "./screen/UnlockPdfScreen";
import SecurePdfScreen from "./screen/ProtectPdfScreen";
import ESignatureScreen from "./screen/ESignPdfScreen";
import AllTools from "./component/AllTools";
import PrivacyPolicy from "./screen/PrivacyPolicy";
import TermsAndConditions from "./screen/TermsAndCondition";
import Signup from "./screen/SignUpScreen";
import Login from "./screen/LoginScreen";
import ForgotPassword from "./screen/ForgetPassScreen";
import ResetPassword from "./screen/ResetPassword";
import Profile from "./screen/ProfileScreen";
import RefundPolicy from "./screen/RefundPolicy";
import PricingScreen from "./component/PricingScreen";
import ToolsGridScreen from "./component/ToolsScreen";

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
          <Route path="/doc-to-pdf" element={<DocToPdfScreen />} />
          <Route path="/exel-to-pdf" element={<ExelToPdfScreen />} />
          <Route path="/ppt-to-pdf" element={<PptToPdfScreen />} />
          <Route path="/image-to-pdf" element={<ImageToPdfScreen />} />
          <Route path="/html-to-pdf" element={<HtmlToPdfScreen />} />
          <Route path="/pdf-ocr" element={<PdfOCRScreen />} />
          <Route path="/pdf-to-word" element={<PdfToWordScreen />} />
          <Route path="/pdf-to-exel" element={<PdfToExelScreen />} />
          <Route path="/pdf-to-ppt" element={<PdfToPPTScreen />} />
          <Route path="/pdf-to-text" element={<PdfToTxtScreen />} />
          <Route path="/pdf-to-image" element={<PdfToImageScreen />} />
          <Route path="/merge-pdf" element={<MergePdfScreen />} />
          <Route path="/split-pdf" element={<SplitPdfScreen />} />
          <Route path="/compress-pdf" element={<CompressPdfScreen />} />
          <Route path="/flip-pdf" element={<FlipPdfScreen />} />
          <Route
            path="/remove-page"
            element={<RemovePdfPagesScreen />}
          />
          <Route
            path="/rotate-page"
            element={<RotatePdfPagesScreen />}
          />
          <Route path="/crop-pdf" element={<CropPdfScreen />} />
          <Route
            path="/extract-content"
            element={<ExtractPdfContentScreen />}
          />
          <Route path="/rearrenge-pdf-page" element={<ReArrengeScreen />} />
          <Route path="/pdf-editor" element={<PdfEditScreen />} />
          <Route path="/pdf-create" element={<PdfCreatorScreen />} />
          <Route
            path="/add-page-number"
            element={<PdfWithPageNumberScreen />}
          />
          <Route path="/Watermark" element={<AddWaterMarkScreen />} />
          <Route path="/UnlockPdf" element={<UnlockPdfScreen />} />
          <Route path="/ProtectPdf" element={<SecurePdfScreen />} />
          <Route path="/eSignPdf" element={<ESignatureScreen />} />
          <Route path="/all-tools" element={<AllTools />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<ResetPassword />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/pricing" element={<PricingScreen />} />
          <Route path="/tools" element={<ToolsGridScreen />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
