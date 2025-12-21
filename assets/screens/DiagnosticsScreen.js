import { r as reactExports, j as jsxRuntimeExports, aB as ShieldCheck, a7 as RefreshCw, Z as Zap, b3 as Download, B as Bot, a6 as CircleCheck, aD as CircleX, b5 as ClipboardCheck, ax as Database, b0 as Sparkles, b6 as Share2, b7 as ShieldAlert } from "../vendor.js";
import { c as CATEGORY_MAP, E as E2ETestRunner } from "../shared-core.js";
import { GoogleGenAI } from "@google/genai";
var define_process_env_default = {};
const DiagnosticsScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("INFRA");
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [dbTables, setDbTables] = reactExports.useState([]);
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
  const runMasterAudit = async () => {
    if (!confirm("This will execute all 121 real-time server tests (A.01 to J.10). Continue?")) return;
    setIsRunning(true);
    const runner = initRunner();
    await runner.runFullAudit();
    setIsRunning(false);
    fetchDbStatus();
  };
  const exportAuditReport = () => {
    const runner = initRunner();
    runner.exportReport();
  };
  const generateAIReport = async () => {
    if (isAnalyzing || results.length === 0) return;
    setIsAnalyzing(true);
    const apiKey = define_process_env_default.API_KEY;
    if (!apiKey || apiKey === "undefined") {
      setAnalysisReport("### API KEY MISSING\nPlease configure an API key in system settings to use live AI diagnostics.");
      setIsAnalyzing(false);
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey });
      const failures = results.filter((r) => r.status === "FAIL").map((r) => `[${r.id}] ${r.description}: ${r.details}`).join("\n");
      const prompt = `Act as a Systems Reliability Engineer. Analyze these diagnostic results from an IIT preparation platform. 
            TOTAL TESTS: 121. FAILURES DETECTED:
${failures || "No failures in executed tests."}
            Examine potential cascading risks between Infrastructure (A) and Student Core (D). Provide a specific technical resolution plan.`;
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: { systemInstruction: "You are a World-Class Systems Architect and Cybersecurity Lead." }
      });
      setAnalysisReport(response.text || "Status optimal.");
    } catch (error) {
      setAnalysisReport(`### ANALYSIS ERROR

${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const currentResults = results.filter((r) => r.category === activeTab);
  const totalExecuted = results.length;
  const totalPassed = results.filter((r) => r.status === "PASS").length;
  const progressPercent = Math.round(totalExecuted / 121 * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-24 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-900/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase tracking-tight", children: "121-Point Master Audit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm font-bold uppercase tracking-widest", children: "v13.5 • E2E • Role-Based • Data-Persistent • Live SQL" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: runMasterAudit,
              disabled: isRunning,
              className: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center gap-2 active:scale-95 disabled:opacity-50 transition-all",
              children: [
                isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
                "Execute Full Suite"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: exportAuditReport,
              disabled: results.length === 0,
              className: "bg-slate-800 hover:bg-slate-700 text-white px-6 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest border border-slate-700 flex items-center gap-2 active:scale-95 disabled:opacity-50 transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" }),
                "Export for AI Studio"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 relative h-2 w-full bg-slate-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-700",
          style: { width: `${progressPercent}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-black uppercase text-slate-500 tracking-[0.2em]", children: [
          "Platform Coverage: ",
          progressPercent,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-[11px] font-black uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-500", children: [
            totalPassed,
            " PASSED"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-rose-500", children: [
            results.filter((r) => r.status === "FAIL").length,
            " FAILED"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50 border border-indigo-200 p-5 rounded-3xl flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-indigo-600 rounded-xl text-white mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase text-indigo-900 tracking-tight mb-1", children: "Deep AI Analysis Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-indigo-700 leading-relaxed font-medium", children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"Export for AI Studio"' }),
          " to download the full 121-point JSON report. Upload this file to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://aistudio.google.com", target: "_blank", className: "underline font-black", children: "Google AI Studio" }),
          " with a prompt like",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: ' "Examine this diagnostic report for the IIT JEE Prep system and suggest code fixes for the failing logic gates."' })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar", children: Object.entries(CATEGORY_MAP).map(([key, config]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setActiveTab(key),
        className: `px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${activeTab === key ? "bg-white text-blue-600 border-blue-200 shadow-lg" : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-white hover:text-slate-600"}`,
        children: [
          config.prefix,
          ". ",
          config.label
        ]
      },
      key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[700px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-slate-800 text-xs uppercase tracking-[0.2em]", children: CATEGORY_MAP[activeTab].label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase mt-1", children: "Stricty logic verification • No mocking" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-slate-400 uppercase", children: [
            results.filter((r) => r.category === activeTab).length,
            " / ",
            CATEGORY_MAP[activeTab].count,
            " DONE"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50", children: currentResults.length > 0 ? currentResults.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 px-10 flex items-start gap-8 transition-all ${r.status === "FAIL" ? "bg-rose-50/50" : "hover:bg-slate-50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1.5 shrink-0 ${r.status === "PASS" ? "text-emerald-500" : r.status === "RUNNING" ? "text-blue-500 animate-spin" : "text-rose-500"}`, children: r.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 24 }) : r.status === "RUNNING" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]", children: r.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-slate-300", children: r.latency ? `${r.latency}ms` : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-800 text-base mb-1", children: r.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 font-medium leading-relaxed italic", children: r.details || "Awaiting execution thread..." })
          ] })
        ] }, r.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-slate-300 p-20 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { size: 64, className: "mb-6 opacity-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase text-xs tracking-[0.2em] mb-2", children: "Category Not Yet Scanned" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 max-w-xs mx-auto", children: "Trigger the Master Audit or run this specific category to verify real-time SQL state." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-slate-900 border-t border-slate-800 text-white flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest", children: "Logic Tier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-600 px-3 py-1 rounded-lg text-[9px] font-black", children: "PLATINUM_SYNC" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-blue-400 font-bold uppercase", children: "PROD_MODE: STRICT_SQL_ROUNDTRIP" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8 border-b border-slate-50 pb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 20, className: "text-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase text-slate-800 tracking-tighter", children: "Live SQL Telemetry" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-blue-200 shadow-sm group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-black text-slate-600 uppercase tracking-tight", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white px-3 py-1 rounded-xl border border-blue-50 text-[10px] font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors", children: [
                t.rows,
                " Rows"
              ] })
            ] }, t.name)),
            dbTables.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 italic text-center py-6", children: "Handshake needed with SQL server." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "absolute -right-8 -top-8 w-40 h-40 opacity-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 18, className: "text-blue-400" }),
            " Advanced AI Scan"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-indigo-100 leading-relaxed font-medium mb-10 opacity-80", children: "Perform a real-time pattern analysis on your 121-point audit results using the Gemini 3 Pro reasoning engine." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: generateAIReport,
              disabled: results.length === 0 || isAnalyzing,
              className: "w-full bg-white text-indigo-900 border border-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl hover:bg-indigo-50 active:scale-95 disabled:opacity-50",
              children: [
                isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5" }),
                "Run Failure Analysis"
              ]
            }
          ),
          analysisReport && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 p-6 bg-black/40 rounded-2xl text-[11px] leading-relaxed text-indigo-50 border border-white/10 max-h-[400px] overflow-y-auto custom-scrollbar font-medium backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-invert prose-sm", dangerouslySetInnerHTML: { __html: analysisReport.replace(/\n/g, "<br/>").replace(/###/g, '<h4 class="font-black text-blue-400 mt-6 mb-3 uppercase tracking-widest">') } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-amber-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 22 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase tracking-tighter", children: "Production Warning" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-amber-700 leading-relaxed font-bold", children: [
            "Diagnostic suite is currently in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ACTIVE_WRITE" }),
            " mode. Tests involving registration or test submissions will modify real database records. Use for system validation only."
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  DiagnosticsScreen
};
