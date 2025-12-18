import { r as reactExports, j as jsxRuntimeExports, b6 as Beaker, b4 as Download, av as RefreshCw, b7 as Play, o as Activity, aC as Terminal, b8 as React, a8 as CheckCircle2, aM as XCircle } from "../vendor.js";
import { E as E2ETestRunner } from "../shared-core.js";
const DiagnosticsScreen = () => {
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const runnerRef = reactExports.useRef(null);
  const initRunner = () => {
    if (!runnerRef.current) {
      runnerRef.current = new E2ETestRunner((newResults) => setResults(newResults));
    }
    return runnerRef.current;
  };
  const runFullAudit = async () => {
    setResults([]);
    setIsRunning(true);
    const runner = initRunner();
    await runner.runFullAudit();
    setIsRunning(false);
  };
  const downloadReport = () => {
    const runner = initRunner();
    runner.downloadJSONReport();
  };
  const stats = reactExports.useMemo(() => ({
    total: results.length,
    passed: results.filter((r) => r.status === "PASS").length,
    failed: results.filter((r) => r.status === "FAIL").length,
    skipped: results.filter((r) => r.status === "SKIPPED").length,
    running: results.filter((r) => r.status === "RUNNING").length
  }), [results]);
  const groupedResults = reactExports.useMemo(() => {
    const groups = {
      "System Health": [],
      "Functional E2E": [],
      "Advanced Prep Tools": [],
      "Accessibility": []
    };
    results.forEach((r) => {
      const stepNum = parseInt(r.step.split(".")[1]);
      if (r.step.startsWith("H.")) groups["System Health"].push(r);
      else if (r.step.startsWith("E.")) {
        if (stepNum >= 40 && stepNum <= 43) groups["Advanced Prep Tools"].push(r);
        else if (stepNum === 44) groups["Accessibility"].push(r);
        else groups["Functional E2E"].push(r);
      }
    });
    return groups;
  }, [results]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "w-8 h-8 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight uppercase", children: "Integrity Audit v12.23" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm max-w-xl", children: "Comprehensive 43-point scan verifying server reliability, database schema compliance, advanced tool persistence, and cross-role screen accessibility." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 shrink-0", children: [
          results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadReport, className: "bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border border-slate-700 active:scale-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
            " Export JSON"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runFullAudit, disabled: isRunning, className: "bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 active:scale-95", children: [
            isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18 }),
            isRunning ? "Auditing Platform..." : "Execute Full Audit"
          ] })
        ] })
      ] }),
      results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 animate-in slide-in-from-top-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-[10px] font-black uppercase tracking-widest block", children: "Total Scan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-white", children: [
            stats.total,
            " / 43"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 text-[10px] font-black uppercase tracking-widest block", children: "Passed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-emerald-400", children: stats.passed })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400 text-[10px] font-black uppercase tracking-widest block", children: "Failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-red-400", children: stats.failed })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 text-[10px] font-black uppercase tracking-widest block", children: "Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-blue-400", children: [
            stats.total > 0 ? Math.round(stats.passed / stats.total * 100) : 0,
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl border border-slate-200 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-blue-600" }),
          " Platform Status"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 bg-slate-50 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-600", children: "Runtime Version" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase", children: "12.23" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 bg-slate-50 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-600", children: "Database" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase", children: "Live" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-4 h-4 text-slate-400" }),
          " Execution Trace"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar", children: results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center p-20 text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-16 h-16 mb-4 opacity-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-500", children: "System idle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-2", children: "Initialize the audit sequence to verify platform integrity." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-50 pb-8", children: Object.entries(groupedResults).map(([group, groupLogs]) => groupLogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100/50 px-4 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest", children: group }),
          groupLogs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 p-1 rounded-full ${r.status === "PASS" ? "bg-emerald-50 text-emerald-600" : r.status === "FAIL" ? "bg-red-50 text-red-600" : r.status === "RUNNING" ? "bg-blue-50 text-blue-600 animate-pulse" : "bg-slate-50 text-slate-300"}`, children: r.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { size: 16 }) : r.status === "FAIL" ? /* @__PURE__ */ jsxRuntimeExports.jsx(XCircle, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest", children: r.step }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-800 text-sm", children: r.description }),
                r.details && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] mt-0.5 text-slate-500", children: r.details })
              ] })
            ] }),
            r.latency && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] font-mono text-slate-300", children: [
              r.latency,
              "ms"
            ] })
          ] }, r.step))
        ] }, group)) }) })
      ] })
    ] })
  ] });
};
export {
  DiagnosticsScreen
};
