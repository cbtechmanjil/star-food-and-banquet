import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import App from "./App.tsx";
import "./index.css";

// Initialize Lenis smooth scrolling globally
const lenis = new Lenis();

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(<App />);
