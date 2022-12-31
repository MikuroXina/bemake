import { createRoot } from "react-dom/client";
import { index } from "./index.jsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("#root element not found");
}
createRoot(rootElement).render(index());
