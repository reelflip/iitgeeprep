import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
const PageHeader = ({ title, subtitle, action }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mt-1", children: subtitle })
  ] }),
  action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: action })
] });
export {
  PageHeader
};
