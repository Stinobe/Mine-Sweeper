import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import AppRoutes from "./routes";

window.addEventListener("contextmenu", e => {
  e.preventDefault();
});

const container = document.getElementById("app");
const root = container ? createRoot(container) : null;
if (root) root.render(<AppRoutes />);
