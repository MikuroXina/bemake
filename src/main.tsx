import { Index } from "./index.jsx";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("#root element not found");
}
createRoot(rootElement).render(<Index />);
