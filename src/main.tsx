import gsap from "gsap";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./index.css";
import App from "./App";
import { useGSAP } from "@gsap/react";
import { GSDevTools } from "gsap/GSDevTools";
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
