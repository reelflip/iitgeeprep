import { r as reactExports, j as jsxRuntimeExports, b4 as Wrench, b2 as Download, a7 as RefreshCw, b5 as Play, aY as MessageSquare, U as User, B as Bot, S as Send, a$ as Sparkles, a as Brain, p as Activity, ar as Terminal, aC as Shield, a6 as CheckCircle2, aD as XCircle, ax as Database, i as Layers, b0 as ChevronUp, C as ChevronDown, b6 as GoogleGenAI } from "../vendor.js";
import { E as E2ETestRunner } from "../shared-core.js";
var define_process_env_default = {};
const DiagnosticsScreen = () => {
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [aiFixes, setAiFixes] = reactExports.useState([]);
  const [dbTables, setDbTables] = reactExports.useState([]);
  const [expandedTable, setExpandedTable] = reactExports.useState(null);
  const runnerRef = reactExports.useRef(null);
  const [chatMessages, setChatMessages] = reactExports.useState([
    { role: "assistant", content: "System Debugger initialized. You can ask me about specific PHP files, database mismatches, or deployment errors. Paste your error logs or file paths here for an instant diagnosis." }
  ]);
  const [chatInput, setChatInput] = reactExports.useState("");
  const [isChatLoading, setIsChatLoading] = reactExports.useState(false);
  const chatEndRef = reactExports.useRef(null);
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
  reactExports.useEffect(() => {
    var _a;
    (_a = chatEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  const runFullAudit = async () => {
    setResults([]);
    setAiFixes([]);
    setIsRunning(true);
    const runner = initRunner();
    await runner.runFullAudit();
    setIsRunning(false);
    fetchDbStatus();
  };
  const runAIDiagnosis = async () => {
    const failedTests = results.filter((r) => r.status === "FAIL");
    if (failedTests.length === 0) {
      alert("No failures detected in the legacy suite to analyze!");
      return;
    }
    setIsAnalyzing(true);
    const runner = initRunner();
    const fixes = await runner.getAIDiagnosis(failedTests);
    setAiFixes(fixes);
    setIsAnalyzing(false);
  };
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsChatLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: define_process_env_default.API_KEY });
      const model = "gemini-3-flash-preview";
      const failureContext = results.filter((r) => r.status === "FAIL").map((r) => `${r.step}: ${r.description} - ${r.details}`).join("\n");
      const dbContext = dbTables.map((t) => `${t.name} (${t.rows} rows)`).join(", ");
      const systemPrompt = `You are a Full-Stack System Architect and PHP/React Debugging Expert for the IIT JEE Prep platform.
            STACK: PHP 8.1+ (LAMP), React (TypeScript), MySQL.
            CURRENT SYSTEM STATE:
            - Database Tables: ${dbContext || "Unknown"}
            - Recent Failures: ${failureContext || "None detected yet"}
            
            CAPABILITIES:
            1. Analyze PHP syntax and logical errors in api/ folder.
            2. Diagnose database mismatches (e.g., missing columns like accuracy_percent).
            3. Detect deployment crashes (500 errors, 404 missing endpoints).
            4. Suggest exact line-by-line code modifications for PHP and JS files.
            
            INSTRUCTIONS:
            - Provide code snippets in markdown.
            - Be concise and actionable.
            - If a file path is mentioned (e.g., sync_progress.php), explain its role and potential issues.
            - Always recommend checking migrate_db.php for schema updates if database errors are suspected.`;
      const response = await ai.models.generateContent({
        model,
        contents: userMsg,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2
          // Lower temperature for more deterministic debugging
        }
      });
      setChatMessages((prev) => [...prev, { role: "assistant", content: response.text || "I couldn't generate a diagnosis. Please check the server logs." }]);
    } catch (error) {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Error connecting to the AI Debugging Core. Ensure your API key is valid." }]);
    } finally {
      setIsChatLoading(false);
    }
  };
  const downloadReport = () => {
    const runner = initRunner();
    runner.downloadJSONReport();
  };
  const stats = reactExports.useMemo(() => ({
    total: results.length,
    passed: results.filter((r) => r.status === "PASS").length,
    failed: results.filter((r) => r.status === "FAIL").length,
    running: results.filter((r) => r.status === "RUNNING").length
  }), [results]);
  reactExports.useMemo(() => results.filter((r) => r.status === "FAIL"), [results]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-6xl mx-auto pb-24 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-8 h-8 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight uppercase", children: "System Health Dashboard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm max-w-xl font-medium", children: "Dual-Core Diagnostics: Deterministic Legacy Suite (51 Tests) & AI-Assisted Recovery." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 shrink-0", children: [
          results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadReport, className: "bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border border-slate-700 active:scale-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
            " Export Results"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runFullAudit, disabled: isRunning, className: "bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 active:scale-95", children: [
            isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18 }),
            isRunning ? "Auditing 51 Nodes..." : "Run Legacy Audit Suite"
          ] })
        ] })
      ] }),
      results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 p-4 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "Coverage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-white", children: [
            Math.round(results.length / 51 * 100),
            "% of 51"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "Passed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-emerald-400", children: [
            stats.passed,
            " Checks"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "Critical Failures" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-red-400", children: [
            stats.failed,
            " Errors"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 text-[10px] font-black uppercase tracking-widest block mb-1", children: "Host Response" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-blue-400", children: [
            results.length > 0 ? Math.round(results.reduce((acc, r) => acc + (r.latency || 0), 0) / results.length) : 0,
            "ms"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[600px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-slate-100 bg-slate-900 text-white flex justify-between items-center shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-500/20 rounded-lg border border-blue-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 20, className: "text-blue-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-sm uppercase tracking-tight", children: "AI Expert Debug Console" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest", children: "Interactive File & Query Diagnosis" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase", children: "Live Advisor" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 custom-scrollbar", children: [
            chatMessages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${msg.role === "user" ? "bg-slate-900 border-slate-700 text-white" : "bg-blue-600 border-blue-500 text-white"}`, children: msg.role === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user" ? "bg-slate-900 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm prose-slate max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap", children: msg.content }) }) })
            ] }) }, idx)),
            isChatLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: "animate-spin" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-slate-400 uppercase tracking-widest", children: "Analyzing platform components..." }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleChatSubmit, className: "p-4 bg-white border-t border-slate-100 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: chatInput,
                onChange: (e) => setChatInput(e.target.value),
                placeholder: "e.g. Why did save_attempt.php crash? Or paste an error log...",
                className: "flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder:text-slate-400 font-medium"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: !chatInput.trim() || isChatLoading,
                className: "bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-95",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 20 })
              }
            )
          ] }) })
        ] }),
        aiFixes.length > 0 && !isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl shadow-xl text-white animate-in zoom-in-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-amber-300 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase tracking-tight", children: "Auto-Repair Advisor" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-100 text-sm font-medium", children: "Consult these fix patterns based on the last 51-node audit results." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: runAIDiagnosis,
                disabled: isAnalyzing,
                className: "bg-white text-indigo-700 px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-lg active:scale-95 disabled:opacity-50",
                children: [
                  isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 18 }),
                  isAnalyzing ? "Analyzing 51-Point Log..." : "Refresh AI Analysis"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: aiFixes.map((fix, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-white/10 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 px-2 py-1 rounded text-[10px] font-black", children: fix.stepId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white", children: fix.problem })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white/50", children: "Match Confidence" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-emerald-400", style: { width: `${fix.confidence * 100}%` } }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-6", children: fix.filesToModify.map((file, fIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { size: 14 }),
                " ",
                file.path
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-900/50 rounded-xl border border-white/10 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-300 mb-2 font-bold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 14 }),
                  " Recommended Action: ",
                  file.action
                ] }),
                file.codeSnippet && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[11px] font-mono text-slate-300 overflow-x-auto p-3 bg-black/30 rounded-lg", children: file.codeSnippet })
              ] })
            ] }, fIdx)) })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-4 h-4 text-slate-400" }),
              " Legacy Audit Stream (51 Deterministic Tests)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SyncStatusBadge, { status: isRunning ? "SYNCING" : "IDLE", show: isRunning })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar", children: results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center p-20 text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-16 h-16 mb-4 opacity-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-500 uppercase tracking-widest text-xs", children: "Ready for Deterministic Scan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] mt-2 font-medium max-w-[200px]", children: "Launch the 51-node legacy audit to verify table existence, schema mismatches, and core connectivity." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100 pb-20", children: results.map((r) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 flex items-start justify-between transition-all ${r.status === "FAIL" ? "bg-rose-50/30" : "hover:bg-slate-50/50"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-0.5 p-1.5 rounded-lg border ${r.status === "PASS" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : r.status === "FAIL" ? "bg-rose-50 border-rose-100 text-rose-600" : r.status === "RUNNING" ? "bg-blue-50 border-blue-100 text-blue-600 animate-pulse" : "bg-slate-50 border-slate-100 text-slate-300"}`, children: r.status === "PASS" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { size: 16 }) : r.status === "FAIL" ? /* @__PURE__ */ jsxRuntimeExports.jsx(XCircle, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-black text-slate-400 uppercase tracking-[0.15em]", children: r.step }),
                    r.status === "FAIL" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 bg-rose-600 text-white text-[8px] font-black rounded uppercase", children: "Fix Req" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-800 text-xs truncate max-w-[400px]", children: r.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[10px] mt-1 font-medium ${r.status === "FAIL" ? "text-rose-700 font-bold" : "text-slate-500"}`, children: r.details }),
                  r.status === "FAIL" && ((_a = r.metadata) == null ? void 0 : _a.rawResponse) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 bg-slate-900 rounded-xl text-[9px] font-mono text-rose-400 overflow-x-auto max-w-lg border border-slate-800 shadow-inner", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1 text-slate-500", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black", children: "LOG_DUMP" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.metadata.httpCode })
                    ] }),
                    r.metadata.rawResponse.slice(0, 300),
                    "..."
                  ] })
                ] })
              ] }),
              r.latency && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] font-mono font-black text-slate-300 shrink-0 ml-2", children: [
                r.latency,
                "ms"
              ] })
            ] }, r.step);
          }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-5 h-5 text-blue-600" }),
            " Database Integrity"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1", children: dbTables.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 italic py-4 text-center", children: "Run audit to refresh DB state." }) : dbTables.map((table) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setExpandedTable(expandedTable === table.name ? null : table.name),
                className: "w-full p-3 flex items-center justify-between hover:bg-slate-100 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 14, className: "text-slate-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-700", children: table.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded", children: [
                      table.rows,
                      " Row"
                    ] }),
                    expandedTable === table.name ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14 })
                  ] })
                ]
              }
            ),
            expandedTable === table.name && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white border-t border-slate-100 animate-in slide-in-from-top-1", children: table.columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] py-1 border-b border-slate-50 last:border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-500", children: col.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-mono", children: col.type })
            ] }, col.name)) })
          ] }, table.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-orange-500" }),
            " Server Parameters"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-3 bg-slate-50 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest", children: "PHP Version" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-800", children: "8.1+ Detected" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-3 bg-slate-50 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest", children: "API Count" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-800", children: "38 Enpoints" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-3 bg-slate-50 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest", children: "Audit Depth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-800", children: "51 Integrity Nodes" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 20 }),
            " Debug Tip"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700 leading-relaxed font-medium", children: 'If you see "Requested entity was not found" in the AI console, your API key may have reached its limit or the session expired. Try scanning again.' })
        ] })
      ] })
    ] })
  ] });
};
const SyncStatusBadge = ({ status, show }) => {
  if (!show) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-2 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 ${status === "SYNCING" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"}`, children: [
    status === "SYNCING" && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 10, className: "animate-spin" }),
    status === "SYNCING" ? "Running Tests..." : "Idle"
  ] });
};
const ShieldAlert = ({ size }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 8v4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 16h.01" })
] });
const FileCode = ({ size }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "14 2 14 8 20 8" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m10 13-2 2 2 2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m14 17 2-2-2-2" })
] });
export {
  DiagnosticsScreen
};
