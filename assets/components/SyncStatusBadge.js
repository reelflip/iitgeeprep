import { j as jsxRuntimeExports, a5 as AlertTriangle, a6 as CheckCircle2, a7 as RefreshCw } from "../vendor.js";
const SyncStatusBadge = ({ status, show = true }) => {
  if (!show || status === "IDLE") return null;
  const styles = {
    SYNCING: "bg-blue-50 text-blue-600 border-blue-200",
    SYNCED: "bg-green-50 text-green-700 border-green-200",
    ERROR: "bg-red-50 text-red-700 border-red-200"
  };
  const labels = {
    SYNCING: "Syncing...",
    SYNCED: "Synced",
    ERROR: "Not Synced"
  };
  const icons = {
    SYNCING: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12, className: "animate-spin" }),
    SYNCED: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { size: 12 }),
    ERROR: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { size: 12 })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-300 animate-in fade-in zoom-in-95 ${styles[status]}`, children: [
    icons[status],
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels[status] })
  ] });
};
export {
  SyncStatusBadge as S
};
