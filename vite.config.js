// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/",
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://pdfsmalltools.com",
      // hostname: "http://localhost:5173",
      routes: [
        "/", // Home
        "/about",
        "/contact",
        "/docToPdf",
        "/ExelToPdfScreen",
        "/PptToPdfScreen",
        "/ImageToPdfScreen",
        "/HtmlToPdfScreen",
        "/PdfOCRScreen",
        "/PdfToWordScreen",
        "/PdfToExelScreen",
        "/PdfToPPTScreen",
        "/PdfToTxtScreen",
        "/PdfToImageScreen",
        "/MergePdfScreen",
        "/SplitPdfScreen",
        "/CompressPdfScreen",
        "/FlipPdfScreen",
        "/RemovePdfPagesScreen",
        "/RotatePdfPagesScreen",
        "/CropPdfScreen",
        "/ExtractPdfContent",
        "/PdfReArrenge",
        "/PdfEditor",
        "/PdfCreator",
        "/PdfWithPageNumber",
        "/Watermark",
        "/UnlockPdf",
        "/ProtectPdf",
        "/eSignPdf",
        "/all-tools",
        "/PrivacyPolicy",
        "/TermsAndConditions",
        "/Signup",
        "/Login",
        "/forgot-password",
        "/reset-password/:uidb64/:token", // Dynamic route
        "/profile",
        "/refund-policy",
        "/pricing",
      ],
    }),
  ],
  base: "/",
});
