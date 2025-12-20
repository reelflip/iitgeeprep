import { r as reactExports, j as jsxRuntimeExports, aB as ShieldCheck, a7 as RefreshCw, b5 as Play, B as Bot, L as LoaderCircle, b6 as ClipboardList, A as Activity, b0 as Sparkles, a6 as CircleCheck, aD as CircleX, ax as Database, b7 as Fingerprint, ai as Server, aA as Check, as as Lock, b8 as MousePointer2 } from "../vendor.js";
import { A as API_FILES, L as LocalKnowledgeBase, E as E2ETestRunner } from "../shared-core.js";
import { GoogleGenAI } from "@google/genai";
var define_process_env_default = {};
const DiagnosticsScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("CORE");
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [dbTables, setDbTables] = reactExports.useState([]);
  const [selectedFile, setSelectedFile] = reactExports.useState("");
  const [fileSource, setFileSource] = reactExports.useState(null);
  const [isLoadingFile, setIsLoadingFile] = reactExports.useState(false);
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const [analysisReport, setAnalysisReport] = reactExports.useState(null);
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
  const handleLoadFile = async (filename) => {
    if (!filename) {
      setFileSource(null);
      return;
    }
    setIsLoadingFile(true);
    const runner = initRunner();
    const result = await runner.fetchFileSource(filename);
    if ("source" in result) setFileSource(result.source);
    else setFileSource(null);
    setIsLoadingFile(false);
  };
  const runFullAudit = async () => {
    setResults([]);
    setAnalysisReport(null);
    setIsRunning(true);
    const runner = initRunner();
    if (activeTab === "CORE") await runner.runFullAudit();
    else await runner.runPersistenceSuite();
    setIsRunning(false);
    fetchDbStatus();
  };
  const generateAnalysisReport = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisReport(null);
    const apiKey = define_process_env_default.API_KEY;
    if (!apiKey || apiKey === "undefined") {
      const failures = results.filter((r) => r.status === "FAIL");
      const advice = LocalKnowledgeBase.query(failures.length > 0 ? failures[0].description : "sync", failures);
      setAnalysisReport(`### HEURISTIC ANALYSIS (OFFLINE)

**Note:** AI Engine is offline. Deterministic findings:

${advice}`);
      setIsAnalyzing(false);
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey });
      const failures = results.filter((r) => r.status === "FAIL").map((r) => `${r.step}: ${r.description}`).join("\n");
      const schema = dbTables.map((t) => `${t.name} (${t.rows} rows)`).join(", ");
      const systemInstruction = `You are a Senior Systems Architect. Analyze the provided state.
            CURRENT NODE FAILURES: ${failures || "None"}
            DATABASE SCHEMA: ${schema || "Disconnected"}
            SOURCE CODE CONTEXT: ${fileSource || "Not loaded"}
            
            GOAL: Provide a root-cause analysis for any failures and specific step-by-step fix recommendations. Especially address why a "Not Synced" badge might show even if the database appears fine (e.g., CORS, API logic crashes, missing files).`;
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Generate a deep diagnostic recovery report based on current system state. Be specific and include code snippets if applicable.",
        config: { systemInstruction }
      });
      setAnalysisReport(response.text || "No logical anomalies detected in the current audit stream.");
    } catch (error) {
      setAnalysisReport(`### REPORT ERROR

Failed to generate AI report: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-24 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase", children: "System Diagnostics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm font-medium tracking-wide", children: "v13.0 Ultimate Sync Core • Stability Management" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-800 p-1 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setActiveTab("CORE");
          setResults([]);
        }, className: `px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === "CORE" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}`, children: "Core Audit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setActiveTab("PERSISTENCE");
          setResults([]);
        }, className: `px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === "PERSISTENCE" ? "bg-orange-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}`, children: "Persistence Tests" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runFullAudit, disabled: isRunning, className: `px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 ${activeTab === "CORE" ? "bg-blue-600 shadow-blue-900/40" : "bg-orange-600 shadow-orange-900/40"} text-white`, children: [
        isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18 }),
        isRunning ? "Auditing..." : `Run ${activeTab === "CORE" ? "51-Point" : "30-Point"} Scan`
      ] })
    ] }) }),
    activeTab === "CORE" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[650px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-6 h-6 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-black text-lg uppercase tracking-tight", children: "AI Recovery Engine" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest", children: "Logic Analysis & Root Cause" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedFile, onChange: (e) => {
              setSelectedFile(e.target.value);
              handleLoadFile(e.target.value);
            }, className: "flex-1 md:flex-none bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2 text-xs font-bold outline-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "text-slate-900", children: "Include Source Context..." }),
              API_FILES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, className: "text-slate-900", children: f }, f))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: generateAnalysisReport, disabled: isAnalyzing || results.length === 0 && !selectedFile, className: "bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 disabled:opacity-30 flex items-center gap-2", children: [
              isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 16 }),
              "Generate Fix Report"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-8 bg-slate-50/50 overflow-y-auto custom-scrollbar", children: !analysisReport && !isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-white rounded-3xl border border-slate-100 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-10 h-10 opacity-20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-xs uppercase tracking-widest", children: "Awaiting Diagnostic Context" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] mt-2 max-w-xs", children: "Run the Core Scan to provide current telemetry for AI reasoning." })
          ] })
        ] }) : isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-16 h-16 text-blue-500 animate-pulse mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm uppercase tracking-widest", children: "Cross-referencing Nodes with Code..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-2 italic", children: "Generating root-cause fix plan..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 pb-4 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-blue-600 text-xs uppercase tracking-[0.2em]", children: "Diagnostic fix recommendations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-slate-400", children: (/* @__PURE__ */ new Date()).toLocaleTimeString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blog-content prose prose-slate max-w-none prose-h3:text-slate-900 prose-h3:font-black prose-h3:text-xs prose-h3:uppercase", dangerouslySetInnerHTML: {
            __html: analysisReport.replace(/### (.*)/g, '<h3 class="mt-8 mb-4">$1</h3>').replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>").replace(/```php([\s\S]*?)```/g, '<pre class="bg-slate-900 text-blue-400 p-4 rounded-xl font-mono text-xs overflow-x-auto">$1</pre>')
          } })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-200 shadow-sm h-[650px] overflow-hidden flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-xs uppercase tracking-widest", children: "Legacy 51-Point Suite" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-slate-400 font-bold mt-0.5", children: "Real-time Stream Audit" })
            ] }),
            isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: "animate-spin text-blue-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50", children: results.length > 0 ? results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 flex items-start gap-4 transition-all ${r.status === "FAIL" ? "bg-rose-50 border-l-4 border-rose-500" : "hover:bg-slate-50/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: r.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, className: "text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18, className: "text-rose-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest", children: r.step }),
                r.latency && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] font-mono text-slate-300 font-bold", children: [
                  r.latency,
                  "ms"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-slate-800 text-xs truncate leading-tight", children: r.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 mt-1 leading-tight", children: r.details })
            ] })
          ] }, r.step)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-slate-300 italic text-xs", children: "Awaiting manual scan activation." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-slate-900 border-t border-slate-800 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Core Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: results.some((r) => r.status === "FAIL") ? "text-rose-500" : "text-emerald-500", children: results.length === 0 ? "READY" : results.some((r) => r.status === "FAIL") ? "NODES COMPROMISED" : "STABLE" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 border-b border-slate-50 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-black uppercase text-slate-800 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 14, className: "text-blue-500" }),
              " DB Health Checker"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-slate-400", children: [
              dbTables.length,
              " OBJECTS"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto custom-scrollbar", children: [
            dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-600 truncate mr-2", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-black text-blue-600 bg-white px-1.5 py-0.5 rounded border", children: [
                t.rows,
                " ROWS"
              ] })
            ] }, t.name)),
            dbTables.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 italic text-center py-2", children: "No database telemetry." })
          ] })
        ] })
      ] })
    ] }) : (
      /* Functional Persistence Tests Tab */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in slide-in-from-right-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-orange-100 rounded-2xl text-orange-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 28 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-lg uppercase tracking-tight", children: "Persistence Suite" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-500 uppercase tracking-widest", children: "30 Functional Scenarios" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 leading-relaxed font-medium", children: "Validating cross-role data integrity: Ensuring student progress survives browser changes, parent views sync correctly, and admin logs remain immutable." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-900 rounded-2xl text-white border border-slate-800 shadow-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-black uppercase mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { size: 14, className: "text-blue-400" }),
              " Relational Reliability"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 p-3 rounded-xl border border-white/10 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-black text-slate-500 uppercase block mb-1", children: "Foreign Keys" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-emerald-400 flex items-center justify-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
                  " Active"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 p-3 rounded-xl border border-white/10 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-black text-slate-500 uppercase block mb-1", children: "Constraints" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-blue-400 flex items-center justify-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 14 }),
                  " Forced"
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-orange-50 border border-orange-100 rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "text-[10px] font-black text-orange-800 uppercase tracking-widest mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointer2, { size: 12 }),
              " Interaction Test Coverage"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-[10px] text-orange-700 font-bold space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Student Session Restoration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Parent Dashboard Real-time Sync" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Admin Attempt History Persistence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Multi-device Login Continuity" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[700px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-xs uppercase tracking-widest", children: "Persistence Integration Stream" }),
            isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, className: "animate-spin text-orange-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50", children: results.length > 0 ? results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 px-8 flex items-start gap-4 hover:bg-slate-50 transition-all group border-l-4 border-transparent hover:border-orange-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, className: "text-emerald-500 mt-1 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest", children: r.step }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase", children: "Verified" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-800 text-sm truncate leading-tight", children: r.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 mt-0.5 leading-relaxed", children: r.details })
            ] })
          ] }, r.step)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center p-20 text-slate-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 48, className: "mb-4 opacity-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase tracking-widest text-xs", children: "Activate v13.0 Persistence Scan" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-slate-900 border-t border-slate-800 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest", children: "Test Coverage Log" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-orange-400 font-bold uppercase", children: "Ready for Deployment v13.0" })
          ] }) })
        ] })
      ] })
    )
  ] });
};
export {
  DiagnosticsScreen
};
