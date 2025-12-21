import { r as reactExports, j as jsxRuntimeExports, aB as ShieldCheck, b5 as LayoutGrid, ax as Database, ac as Globe, a5 as TriangleAlert, a7 as RefreshCw, b6 as Play, a6 as CircleCheck, aD as CircleX, b7 as ClipboardList, b3 as Download, A as Activity, b8 as Circle, Z as Zap, b2 as FileJson, l as Layers, b9 as ShieldAlert, ay as FileCode, b0 as Sparkles, B as Bot, L as LoaderCircle, ba as Share2 } from "../vendor.js";
import { c as CATEGORY_MAP, E as E2ETestRunner } from "../shared-core.js";
import { GoogleGenAI } from "@google/genai";
var define_process_env_default = {};
const DiagnosticsScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("MASTER");
  const [activeCategory, setActiveCategory] = reactExports.useState("INFRA");
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [isGating, setIsGating] = reactExports.useState(false);
  const [dbTables, setDbTables] = reactExports.useState([]);
  const [gateChecks, setGateChecks] = reactExports.useState({
    connectivity: { id: "connectivity", label: "Connectivity", status: "PENDING", msg: "Awaiting start" },
    schema: { id: "schema", label: "Schema Existence", status: "PENDING", msg: "Awaiting start" },
    columns: { id: "columns", label: "Column Integrity", status: "PENDING", msg: "Awaiting start" },
    integrity: { id: "integrity", label: "Key & Relations", status: "PENDING", msg: "Awaiting start" },
    write_safety: { id: "write_safety", label: "Write-Safety", status: "PENDING", msg: "Awaiting start" }
  });
  const [isScanningEndpoints, setIsScanningEndpoints] = reactExports.useState(false);
  const [endpointResults, setEndpointResults] = reactExports.useState([]);
  const [analysisReport, setAnalysisReport] = reactExports.useState(null);
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
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
  reactExports.useEffect(() => {
    fetchDbStatus();
  }, []);
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
    if (!confirm("This will execute all 121 real-time server tests (A.01 to J.10). Continue?")) return;
    setIsRunning(true);
    const runner = initRunner();
    await runner.runFullAudit();
    setIsRunning(false);
    fetchDbStatus();
  };
  const generateAIReport = async () => {
    if (isAnalyzing || results.length === 0) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: define_process_env_default.API_KEY });
      const failures = results.filter((r) => r.status === "FAIL").map((r) => `[${r.id}] ${r.description}: ${r.details}`).join("\n");
      const prompt = `Act as a Senior SRE. Analyze these diagnostic results: ${results.length} executed, ${results.filter((r) => r.status === "FAIL").length} failures.
            Identify cascading patterns and specific PHP/MySQL misconfigurations.`;
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: { systemInstruction: "Expert System Reliability Engineer." }
      });
      setAnalysisReport(response.text || "Report empty.");
    } catch (error) {
      setAnalysisReport(`### ERROR

${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const currentResults = results.filter((r) => r.category === activeCategory);
  const progressPercent = Math.round(results.length / 121 * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-24 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-900/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase tracking-tight", children: "System Integrity Hub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm font-bold uppercase tracking-widest", children: "Diagnostic & Connection Analysis • v13.5" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-800 p-1 rounded-2xl border border-slate-700 shadow-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveTab("MASTER"),
            className: `px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "MASTER" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4 mb-1 mx-auto" }),
              " Master Suite"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveTab("DATABASE"),
            className: `px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "DATABASE" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4 mb-1 mx-auto" }),
              " DB Integrity"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveTab("ENDPOINTS"),
            className: `px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "ENDPOINTS" ? "bg-orange-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 mb-1 mx-auto" }),
              " Endpoints"
            ]
          }
        )
      ] })
    ] }) }),
    activeTab === "MASTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4", children: "Suite Navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: Object.entries(CATEGORY_MAP).map(([key, config]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveCategory(key),
              className: `w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between group ${activeCategory === key ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-500 hover:bg-slate-50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  config.prefix,
                  ". ",
                  config.label
                ] }),
                results.some((r) => r.category === key && r.status === "FAIL") && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-white" })
              ]
            },
            key
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: runMasterAudit,
            disabled: isRunning,
            className: "w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95",
            children: [
              isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
              "Run All 121 Tests"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-9 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-slate-800 text-xs uppercase tracking-[0.2em]", children: CATEGORY_MAP[activeCategory].label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-bold text-slate-400 uppercase mt-0.5", children: [
              results.filter((r) => r.category === activeCategory).length,
              " items scanned"
            ] })
          ] }),
          results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: [
            "Overall Progress: ",
            progressPercent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50", children: currentResults.length > 0 ? currentResults.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 px-10 flex items-start gap-8 transition-all ${r.status === "FAIL" ? "bg-rose-50/50" : "hover:bg-slate-50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1.5 shrink-0 ${r.status === "PASS" ? "text-emerald-500" : r.status === "RUNNING" ? "text-blue-500 animate-spin" : "text-rose-500"}`, children: r.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 24 }) : r.status === "RUNNING" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]", children: r.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-slate-300", children: r.latency ? `${r.latency}ms` : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-800 text-base mb-1", children: r.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 font-medium leading-relaxed italic", children: r.details || "Awaiting thread..." })
          ] })
        ] }, r.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-slate-300 p-20 text-center opacity-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 64, className: "mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase text-xs tracking-[0.2em]", children: "Diagnostic Suite Ready" })
        ] }) }),
        results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-slate-50 border-t border-slate-100 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => initRunner().exportReport(), className: "bg-white text-slate-700 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 shadow-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " Export Suite JSON"
        ] }) })
      ] }) })
    ] }),
    activeTab === "DATABASE" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-right-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-indigo-600", size: 16 }),
          " Deep Link Validation"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Object.values(gateChecks).map((check) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          check.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" }) : check.status === "FAIL" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-rose-500" }) : check.status === "RUNNING" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-indigo-500 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4 text-slate-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-black text-slate-700 uppercase tracking-tight", children: check.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase", children: check.msg })
          ] })
        ] }) }, check.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runGateCheck, disabled: isGating, className: "w-full bg-indigo-600 text-white py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95", children: [
            isGating ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
            " Run Integrity Scan"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => initRunner().exportJson("DB_Gate_Report", gateChecks), disabled: isGating, className: "w-full bg-slate-50 text-slate-500 border border-slate-200 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-4 h-4" }),
            " Export Errors (JSON)"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10 border-b border-slate-100 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-indigo-50 text-indigo-600 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 24 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase text-slate-800 tracking-tighter", children: "SQL Explorer (v13.5)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest", children: "Active Table Registry" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase", children: [
            dbTables.length,
            " Tables Sync'd"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: dbTables.length > 0 ? dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all shadow-sm group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-white border border-slate-200 text-slate-400 group-hover:text-indigo-600 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-black text-slate-700 uppercase tracking-tight", children: t.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white px-4 py-1.5 rounded-xl border border-indigo-100 text-[11px] font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors", children: [
            t.rows,
            " Entries"
          ] })
        ] }, t.name)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full py-20 text-center flex flex-col items-center justify-center grayscale opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 48, className: "text-slate-300 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]", children: "Run integrity scan to load tables" })
        ] }) })
      ] })
    ] }),
    activeTab === "ENDPOINTS" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in slide-in-from-left-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-8 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-black uppercase text-slate-800 tracking-tighter flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "text-orange-600", size: 24 }),
            " Endpoint Logic Map"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest mt-1", children: "Verifying 38 Synchronized PHP Handlers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => initRunner().exportJson("API_Endpoint_Report", endpointResults), disabled: endpointResults.length === 0, className: "bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-4 h-4" }),
            " Export Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runEndpointAudit, disabled: isScanningEndpoints, className: "bg-orange-600 text-white px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all flex items-center gap-2 active:scale-95", children: [
            isScanningEndpoints ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
            " Probe Endpoints"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: endpointResults.length > 0 ? endpointResults.map((res) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-[1.5rem] border flex flex-col justify-between transition-all hover:shadow-md ${res.status === "OK" ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-slate-800 text-xs truncate mb-1 uppercase tracking-tight", children: res.file }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `px-2 py-0.5 rounded-lg font-mono text-[9px] font-bold ${res.code === 200 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`, children: [
              "HTTP ",
              res.code
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border bg-white ${res.status === "OK" ? "border-emerald-200 text-emerald-600" : "border-rose-200 text-rose-600"}`, children: res.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 10, className: res.status === "RUNNING" ? "animate-spin" : "" }),
            " ",
            res.time,
            "ms"
          ] }),
          res.status === "CRASH" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500 font-black", children: "Requires Repair" })
        ] })
      ] }, res.file)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full py-32 text-center flex flex-col items-center justify-center opacity-30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { size: 64, className: "text-slate-300 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase text-sm tracking-[0.3em]", children: "Initialize probe to verify handler logic" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "absolute -right-8 -top-8 w-40 h-40 opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 18, className: "text-blue-400" }),
            " Root-Cause Reasoning (Gemini 3 Pro)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-indigo-100 leading-relaxed font-medium opacity-80 max-w-xl", children: 'Our reasoning engine parses the 121-point suite, SQL registries, and endpoint response headers to identify hidden systemic risks. Use this for resolving "Server Unreachable" loops.' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: generateAIReport,
              disabled: results.length === 0 || isAnalyzing,
              className: "mt-6 bg-white text-indigo-900 px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl hover:bg-indigo-50 active:scale-95 disabled:opacity-50",
              children: [
                isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5" }),
                "Execute Deep Reasoning Scan"
              ]
            }
          )
        ] }),
        analysisReport && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-black/40 rounded-2xl p-6 text-[11px] leading-relaxed text-indigo-50 border border-white/10 max-h-[300px] overflow-y-auto custom-scrollbar font-medium backdrop-blur-md font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-invert prose-sm", dangerouslySetInnerHTML: { __html: analysisReport.replace(/\n/g, "<br/>").replace(/###/g, '<h4 class="font-black text-blue-400 mt-6 mb-3 uppercase tracking-widest">') } }) })
      ] })
    ] })
  ] });
};
export {
  DiagnosticsScreen
};
