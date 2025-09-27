import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DarkmodeProvider } from "./context/Darkmode.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkmodeProvider>
      <App />
    </DarkmodeProvider>
  </StrictMode>
);
