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
          <Route path="/PdfToWordScreen" element={<PdfToWordScreen />} />
          <Route path="/PdfToExelScreen" element={<PdfToExelScreen />} />
          <Route path="/PdfToPPTScreen" element={<PdfToPPTScreen />} />
          <Route path="/PdfToTxtScreen" element={<PdfToTxtScreen />} />
          <Route path="/PdfToImageScreen" element={<PdfToImageScreen />} />
          <Route path="/MergePdfScreen" element={<MergePdfScreen />} />
          <Route path="/SplitPdfScreen" element={<SplitPdfScreen />} />
          <Route path="/CompressPdfScreen" element={<CompressPdfScreen />} />
          <Route path="/FlipPdfScreen" element={<FlipPdfScreen />} />
          <Route
            path="/RemovePdfPagesScreen"
            element={<RemovePdfPagesScreen />}
          />
          <Route
            path="/RotatePdfPagesScreen"
            element={<RotatePdfPagesScreen />}
          />
          <Route path="/CropPdfScreen" element={<CropPdfScreen />} />
          <Route
            path="/ExtractPdfContent"
            element={<ExtractPdfContentScreen />}
          />
          <Route path="/PdfReArrenge" element={<ReArrengeScreen />} />
          <Route path="/PdfEditor" element={<PdfEditScreen />} />
          <Route path="/PdfCreator" element={<PdfCreatorScreen />} />
          <Route
            path="/PdfWithPageNumber"
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
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
