import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SwiggyProvider } from "./context/SwiggyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SwiggyProvider>
      {" "}
      <App />{" "}
    </SwiggyProvider>
  </StrictMode>,
);
