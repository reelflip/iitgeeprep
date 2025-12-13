import { j as jsxRuntimeExports } from "./node_modules/react/jsx-runtime.js";
import React from "./node_modules/react/index.js";
import { createRoot } from "./node_modules/react-dom/client.js";
import App from "./App.js";
/* empty css          */
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
