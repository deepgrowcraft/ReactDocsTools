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
        "/doc-to-pdf",
        "/exel-to-pdf",
        "/ppt-to-pdf",
        "/image-to-pdf",
        "/html-to-pdf",
        "/pdf-ocr",
        "/pdf-to-word",
        "/pdf-to-exel",
        "/pdf-to-ppt",
        "/pdf-to-text",
        "/pdf-to-image",
        "/merge-pdf",
        "/split-pdf",
        "/compress-pdf",
        "/flip-pdf",
        "/remove-page",
        "/rotate-page",
        "/CropPdfScreen",
        "/extract-content",
        "/rearrenge-pdf-page",
        "/pdf-editor",
        "/pdf-create",
        "/add-page-number",
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
