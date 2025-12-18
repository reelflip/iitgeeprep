import { j as jsxRuntimeExports } from "../vendor.js";
const StatCard = ({
  label,
  value,
  subValue,
  icon,
  color = "blue",
  onClick,
  className = ""
}) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
    slate: "bg-slate-50 text-slate-600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick,
      className: `bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between transition-all h-full ${onClick ? "cursor-pointer hover:border-blue-300 hover:shadow-md" : ""} ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-lg ${colorStyles[color]}`, children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-slate-800 tracking-tight", children: value }),
          subValue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1 font-medium", children: subValue })
        ] })
      ]
    }
  );
};
export {
  StatCard as S
};
