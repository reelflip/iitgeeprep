import { r as reactExports, j as jsxRuntimeExports, aq as ShieldCheck, aV as Wrench, Y as CircleCheck, W as TriangleAlert, _ as RefreshCw, aW as Play, as as CircleX, aX as ClipboardList, ak as Globe, e as ChevronRight, A as Activity, Z as Zap, al as Database, l as Layers } from "../vendor.js";
import { d as CATEGORY_MAP, E as E2ETestRunner } from "../shared-core.js";
const DiagnosticsScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("MASTER");
  const [activeCategory, setActiveCategory] = reactExports.useState("INFRA");
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [isGating, setIsGating] = reactExports.useState(false);
  const [dbTables, setDbTables] = reactExports.useState([]);
  const [gateChecks, setGateChecks] = reactExports.useState({});
  const [isScanningEndpoints, setIsScanningEndpoints] = reactExports.useState(false);
  const [endpointResults, setEndpointResults] = reactExports.useState([]);
  const runnerRef = reactExports.useRef(null);
  const initRunner = () => {
    if (!runnerRef.current) {
      runnerRef.current = new E2ETestRunner((newResults) => setResults(newResults));
    }
    return runnerRef.current;
  };
  const fetchDbStatus = async () => {
    try {
      const res = await fetch("/api/test_db.php");
      const data = await res.json();
      if (data.tables) setDbTables(data.tables);
    } catch (e) {
    }
  };
  const runGateCheck = async () => {
    setIsGating(true);
    const runner = initRunner();
    const checks = await runner.runDbGate();
    setGateChecks(checks);
    setIsGating(false);
    fetchDbStatus();
  };
  const runEndpointAudit = async () => {
    setIsScanningEndpoints(true);
    const runner = initRunner();
    await runner.runApiAudit(setEndpointResults);
    setIsScanningEndpoints(false);
  };
  const runMasterAudit = async () => {
    setIsRunning(true);
    const runner = initRunner();
    await runner.runFullAudit();
    setIsRunning(false);
    fetchDbStatus();
  };
  const getResolutionSteps = () => {
    var _a;
    const issues = [];
    const has404 = endpointResults.some((r) => r.code === 404);
    endpointResults.some((r) => r.code === 500);
    const has400 = endpointResults.some((r) => r.code === 400);
    const dbFail = ((_a = gateChecks.connectivity) == null ? void 0 : _a.status) === "FAIL";
    if (has404) {
      issues.push({
        title: "API Routing Disconnect (404)",
        cause: "The server is looking for files in /api/ but the request is being intercepted by the frontend router.",
        fix: "Create a .htaccess file in your public_html folder with: \n\nRewriteEngine On\nRewriteCond %{REQUEST_URI} ^/api/ [NC]\nRewriteRule ^api/(.*)$ api/$1 [L]"
      });
    }
    if (dbFail) {
      issues.push({
        title: "MySQL Handshake Refused",
        cause: "PHP config.php exists but the database user/pass/host is rejected by the server.",
        fix: "Login to Hostinger CPanel > Databases > MySQL. Verify that your DB User has 'All Privileges' assigned to the DB Name. Ensure '$host' is 'localhost'."
      });
    }
    if (has400) {
      issues.push({
        title: "JSON Payload Blocked (400)",
        cause: "Hostinger ModSecurity is blocking the application/json header or the PHP input stream is not being read correctly.",
        fix: "In your PHP files, use: \n$data = json_decode(file_get_contents('php://input'));\nInstead of $_POST."
      });
    }
    return issues;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-24 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-900/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase tracking-tight", children: "System Integrity Hub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm font-bold uppercase tracking-widest", children: "Diagnostic & Deployment Analyzer • v17.0" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-800 p-1 rounded-2xl border border-slate-700 shadow-inner flex-wrap justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("MASTER"), className: `px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "MASTER" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400"}`, children: "Master Suite" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("DATABASE"), className: `px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "DATABASE" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400"}`, children: "DB Integrity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("ENDPOINTS"), className: `px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "ENDPOINTS" ? "bg-orange-600 text-white shadow-lg" : "text-slate-400"}`, children: "Endpoints" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("RESOLUTION"), className: `px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "RESOLUTION" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400"}`, children: "Resolution Hub" })
      ] })
    ] }) }),
    activeTab === "RESOLUTION" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in slide-in-from-bottom-4 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-emerald-100 text-emerald-600 rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 32 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black text-slate-800 uppercase tracking-tight", children: "Deployment Resolution Center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 font-bold", children: "Step-by-step technical fixes for your specific server environment." })
        ] })
      ] }),
      getResolutionSteps().length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: getResolutionSteps().map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-50 border border-slate-200 rounded-[2rem] p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-emerald-600 shadow-sm border border-slate-100 shrink-0", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-black text-slate-800 uppercase mb-2", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 text-sm mb-4 leading-relaxed font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500 font-bold uppercase text-xs", children: "Root Cause:" }),
            " ",
            step.cause
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 rounded-2xl p-6 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 text-[10px] font-black text-slate-500 uppercase tracking-widest", children: "Concrete Solution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto", children: step.fix })
          ] })
        ] })
      ] }) }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 64, className: "text-emerald-500 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-black text-slate-800 uppercase", children: "No System Blockers Detected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mt-2", children: "Run the 'Master Suite' or 'Endpoints' probe to trigger the resolution analyzer." })
      ] })
    ] }) }),
    activeTab === "MASTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4", children: "Suite Navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: Object.entries(CATEGORY_MAP).map(([key, config]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveCategory(key), className: `w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between group ${activeCategory === key ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              config.prefix,
              ". ",
              config.label
            ] }),
            results.some((r) => r.category === key && r.status === "FAIL") && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-white" })
          ] }, key)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runMasterAudit, disabled: isRunning, className: "w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95", children: [
          isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
          "Run Live Server Audit"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-9 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-slate-800 text-xs uppercase tracking-[0.2em]", children: CATEGORY_MAP[activeCategory].label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-bold text-slate-400 uppercase mt-0.5", children: [
            results.filter((r) => r.category === activeCategory).length,
            " items scanned"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto divide-y divide-slate-50", children: results.filter((r) => r.category === activeCategory).length > 0 ? results.filter((r) => r.category === activeCategory).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 px-10 flex items-start gap-8 transition-all ${r.status === "FAIL" ? "bg-rose-50/50" : "hover:bg-slate-50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1.5 shrink-0 ${r.status === "PASS" ? "text-emerald-500" : r.status === "RUNNING" ? "text-blue-500 animate-spin" : "text-rose-500"}`, children: r.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 24 }) : r.status === "RUNNING" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]", children: r.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-slate-300", children: r.latency ? `${r.latency}ms` : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-800 text-base mb-1", children: r.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 font-medium leading-relaxed italic", children: r.details || "Awaiting live probe..." })
          ] })
        ] }, r.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-slate-300 p-20 text-center opacity-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 64, className: "mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase text-xs tracking-[0.2em]", children: "Diagnostic Suite Ready" })
        ] }) })
      ] }) })
    ] }),
    activeTab === "ENDPOINTS" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in slide-in-from-left-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-8 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-black uppercase text-slate-800 tracking-tighter flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "text-orange-600", size: 24 }),
          " Endpoint Logic Map"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runEndpointAudit, disabled: isScanningEndpoints, className: "bg-orange-600 text-white px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all flex items-center gap-2 active:scale-95", children: [
          isScanningEndpoints ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
          " Probe Live Endpoints"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: endpointResults.map((res) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-[1.5rem] border flex flex-col justify-between transition-all hover:shadow-md ${res.status === "OK" ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-slate-800 text-xs truncate mb-1 uppercase tracking-tight", children: res.file }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `px-2 py-0.5 rounded-lg font-mono text-[9px] font-bold ${res.code === 200 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`, children: [
            "HTTP ",
            res.code
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 10, className: res.status === "RUNNING" ? "animate-spin" : "" }),
            " ",
            res.time,
            "ms"
          ] }),
          res.status !== "OK" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("RESOLUTION"), className: "text-blue-600 font-black flex items-center gap-1", children: [
            "Fix ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 10 })
          ] })
        ] })
      ] }, res.file)) })
    ] }) }),
    activeTab === "DATABASE" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-right-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-indigo-600", size: 16 }),
          " Link Validation"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Object.values(gateChecks).map((check) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          check.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-rose-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-black text-slate-700 uppercase tracking-tight", children: check.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase", children: check.msg })
          ] })
        ] }) }, check.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runGateCheck, disabled: isGating, className: "w-full bg-indigo-600 text-white py-4 rounded-[1.5rem] mt-8 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95", children: [
          isGating ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
          " Run Integrity Scan"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-black uppercase text-slate-800 tracking-tighter mb-10 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "text-indigo-600", size: 24 }),
          " SQL Registry (v17.0)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-white border border-slate-200 text-slate-400 group-hover:text-indigo-600 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-black text-slate-700 uppercase tracking-tight", children: t.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white px-4 py-1.5 rounded-xl border border-indigo-100 text-[11px] font-black text-indigo-600", children: [
            t.rows,
            " Entries"
          ] })
        ] }, t.name)) })
      ] })
    ] })
  ] });
};
export {
  DiagnosticsScreen
};
