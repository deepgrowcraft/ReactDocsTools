import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./component/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </HelmetProvider>
);
