import { r as reactExports, j as jsxRuntimeExports, aB as ShieldCheck, a7 as RefreshCw, b4 as Play, a$ as Sparkles, b as ChevronDown, L as LoaderCircle, b5 as ClipboardList, A as Activity, a6 as CircleCheck, B as Bot, F as FileText, ar as Terminal, aC as Shield, aD as CircleX, ax as Database } from "../vendor.js";
import { A as API_FILES, L as LocalKnowledgeBase, E as E2ETestRunner } from "../shared-core.js";
import { GoogleGenAI } from "@google/genai";
var define_process_env_default = {};
const DiagnosticsScreen = () => {
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
    if ("source" in result) {
      setFileSource(result.source);
    } else {
      setFileSource(null);
    }
    setIsLoadingFile(false);
  };
  const runFullAudit = async () => {
    setResults([]);
    setAnalysisReport(null);
    setIsRunning(true);
    const runner = initRunner();
    await runner.runFullAudit();
    setIsRunning(false);
    fetchDbStatus();
  };
  const generateAnalysisReport = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisReport(null);
    const apiKey = define_process_env_default.API_KEY;
    if (!apiKey || apiKey === "undefined") {
      setTimeout(() => {
        const failures = results.filter((r) => r.status === "FAIL");
        const localAdvice = failures.length > 0 ? LocalKnowledgeBase.query(`fix ${failures[0].step}`, failures) : "System appears healthy according to deterministic rules. Load a specific file to analyze logic.";
        setAnalysisReport(`### OFFLINE HEURISTIC REPORT

**Note:** Gemini API Key is missing. Showing deterministic recovery steps.

${localAdvice}`);
        setIsAnalyzing(false);
      }, 800);
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey });
      const failures = results.filter((r) => r.status === "FAIL").map((r) => `${r.step}: ${r.description} (${r.details})`).join("\n");
      const schema = dbTables.map((t) => {
        var _a;
        return `${t.name} (${t.rows} rows, ${((_a = t.columns) == null ? void 0 : _a.length) || 0} cols)`;
      }).join(", ");
      const systemInstruction = `You are a Lead Systems Architect. Analyze this system state and provide a single, cohesive Recovery Report.
            
            STRUCTURE:
            1. ROOT CAUSE ANALYSIS: Explain why specific nodes are failing.
            2. FILE CONTEXT: Analyze ${selectedFile || "General Logic"} for security or syntax flaws.
            3. STEP-BY-STEP FIX: Provide exact PHP/SQL code to resolve current issues.
            
            SYSTEM CONTEXT:
            - Database: ${schema || "No tables detected."}
            - Failures: ${failures || "None detected."}
            - File Content: ${fileSource || "None provided."}`;
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Generate a deep diagnostic recovery report based on the provided system instruction context.",
        config: { systemInstruction }
      });
      setAnalysisReport(response.text || "Diagnostic scan yielded no logical anomalies.");
    } catch (error) {
      setAnalysisReport(`### ERROR GENERATING REPORT

${error.message || "The AI Engine timed out."}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const stats = reactExports.useMemo(() => ({
    total: results.length,
    passed: results.filter((r) => r.status === "PASS").length,
    failed: results.filter((r) => r.status === "FAIL").length
  }), [results]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-24 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight uppercase", children: "Stability Control Center" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm max-w-xl font-medium", children: "Recovery v12.45 Core: Combined Deterministic Audit Stream & AI-Driven Recovery Engine." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: runFullAudit,
            disabled: isRunning,
            className: "bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 active:scale-95",
            children: [
              isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18 }),
              isRunning ? "Auditing 51 Nodes..." : "Launch 51-Point Scan"
            ]
          }
        ) })
      ] }),
      results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "System Health" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-white", children: [
            Math.round(stats.passed / (stats.total || 1) * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "Failure Nodes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-rose-400", children: stats.failed })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "AI Linkage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-emerald-400", children: define_process_env_default.API_KEY ? "Ready" : "Heuristic Only" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "Audit Depth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-blue-400", children: "51 Points" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-8 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[650px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-blue-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-black text-lg uppercase tracking-tight leading-none", children: "AI Diagnostic Recovery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest mt-1", children: "Cross-Analysis: Code + Logs + Schema" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full md:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:w-64", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: selectedFile,
                  onChange: (e) => {
                    setSelectedFile(e.target.value);
                    handleLoadFile(e.target.value);
                  },
                  className: "w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none transition-all",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "text-slate-900", children: "Analyze System Context Only" }),
                    API_FILES.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: file, className: "text-slate-900", children: file }, file))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-2.5 text-slate-400 pointer-events-none", size: 14 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: generateAnalysisReport,
                disabled: isAnalyzing || results.length === 0 && !selectedFile,
                className: "bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-900/40 disabled:opacity-30 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap",
                children: [
                  isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 16 }),
                  "Generate Report"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-8 bg-slate-50/50 overflow-y-auto custom-scrollbar", children: !analysisReport && !isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-10 h-10 text-slate-200" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-slate-800", children: "Awaiting Analysis Parameters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-2 leading-relaxed", children: "Run the 51-point scan or select a specific PHP file to generate a structured recovery report. The AI will cross-reference failures with source logic." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-white rounded-2xl border border-slate-100 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500 mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase text-slate-400", children: "Step 1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-700", children: "Audit Nodes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-white rounded-2xl border border-slate-100 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-blue-500 mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase text-slate-400", children: "Step 2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-700", children: "Select Source" })
            ] })
          ] })
        ] }) : isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-16 h-16 text-blue-600 animate-bounce" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-slate-800 uppercase tracking-widest text-sm", children: "Deep Reasoning Engine Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 max-w-xs leading-relaxed", children: "Analyzing system telemetry, database relationships, and script dependencies..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8 pb-4 border-b border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 p-2 rounded-xl text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 20 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-800 uppercase tracking-tight", children: "Recovery Plan Generated" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-slate-900 text-white px-2 py-1 rounded", children: [
              "TIMESTAMP: ",
              (/* @__PURE__ */ new Date()).toLocaleTimeString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-slate max-w-none prose-h3:text-blue-600 prose-h3:uppercase prose-h3:text-xs prose-h3:font-black prose-h3:tracking-[0.2em] prose-h3:mb-3 prose-h3:mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blog-content", dangerouslySetInnerHTML: {
            __html: analysisReport.replace(/### (.*)/g, '<h3 class="mt-8 mb-4">$1</h3>').replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>").replace(/```php([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto">$1</pre>')
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest italic", children: "Verified against v12.45 Logic Core" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.print(), className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all", children: "Print Report" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: generateAnalysisReport, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 transition-all flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
                " Refresh Analysis"
              ] })
            ] })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-200 shadow-sm h-[650px] overflow-hidden flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { size: 20, className: "text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-slate-700 text-xs uppercase tracking-widest", children: "Legacy Audit Stream" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5", children: "51 Real-time Nodes" })
              ] })
            ] }),
            isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, className: "animate-spin text-blue-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar", children: results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center p-12 text-slate-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 mb-4 opacity-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase tracking-widest text-[10px]", children: "Awaiting Manual Activation" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-50", children: results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 flex items-start gap-4 transition-all ${r.status === "FAIL" ? "bg-rose-50/40 border-l-4 border-rose-500" : "hover:bg-slate-50/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 shrink-0 ${r.status === "PASS" ? "text-emerald-500" : r.status === "FAIL" ? "text-rose-500" : "text-blue-500 animate-pulse"}`, children: r.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 }) : r.status === "FAIL" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest", children: r.step }),
                r.latency && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-slate-300 font-bold", children: [
                  r.latency,
                  "ms"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-slate-800 text-xs truncate leading-tight", children: r.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[10px] mt-1 leading-tight font-medium ${r.status === "FAIL" ? "text-rose-700" : "text-slate-500"}`, children: r.details })
            ] })
          ] }, r.step)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-slate-900 border-t border-slate-800 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SYSTEM STATUS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: stats.failed > 0 ? "text-rose-500" : "text-emerald-500", children: stats.failed > 0 ? "CRITICAL ERRORS DETECTED" : "OPERATIONAL" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 pb-3 border-b border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 16, className: "text-blue-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-800 text-xs uppercase tracking-tight", children: "Database Objects" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-slate-400 uppercase", children: [
              dbTables.length,
              " TABLES"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1", children: dbTables.length > 0 ? dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 truncate mr-2", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-600 whitespace-nowrap", children: [
              t.rows,
              " Rows"
            ] })
          ] }, t.name)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 italic text-center py-4", children: "No database link data." }) })
        ] })
      ] })
    ] })
  ] });
};
export {
  DiagnosticsScreen
};
