import { r as reactExports, j as jsxRuntimeExports, p as Activity, ar as Terminal, L as Loader2, as as Lock, at as ToggleRight, au as ToggleLeft, av as Key, a7 as RefreshCw, aw as BarChart3, ac as Globe, ae as Save, ax as Database, ay as FileCode, a6 as CheckCircle2 } from "../vendor.js";
const AI_MODELS = [
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash", provider: "Google", description: "Ultra-fast, optimized for quick doubts and scheduling.", strength: "Speed", color: "blue" },
  { id: "gemini-3-pro-preview", name: "Gemini 3 Pro", provider: "Google", description: "Deep reasoning and complex Physics problem solving.", strength: "Reasoning", color: "indigo" },
  { id: "llama-3.1-70b", name: "Llama 3.1 (70B)", provider: "Meta", description: "Versatile model with great theory explanation capabilities.", strength: "General", color: "purple" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", description: "Logic-heavy model, excellent for Inorganic Chemistry facts.", strength: "Logic", color: "cyan" },
  { id: "qwen-2.5-72b", name: "Qwen 2.5 Math", provider: "Alibaba", description: "Specialized for high-level Mathematics and Calculus.", strength: "Math", color: "emerald" },
  { id: "mistral-large", name: "Mistral Large", provider: "Mistral", description: "Balanced performance for general guidance and motivation.", strength: "Balanced", color: "orange" }
];
const API_FILE_LIST = [
  "index.php",
  "config.php",
  "cors.php",
  "test_db.php",
  "migrate_db.php",
  "login.php",
  "register.php",
  "google_login.php",
  "update_password.php",
  "get_dashboard.php",
  "sync_progress.php",
  "save_attempt.php",
  "save_timetable.php",
  "manage_users.php",
  "manage_content.php",
  "manage_tests.php",
  "manage_syllabus.php",
  "manage_questions.php",
  "manage_backlogs.php",
  "manage_goals.php",
  "manage_mistakes.php",
  "manage_notes.php",
  "manage_videos.php",
  "manage_contact.php",
  "contact.php",
  "manage_settings.php",
  "update_profile.php",
  "track_visit.php",
  "get_admin_stats.php",
  "search_students.php",
  "send_request.php",
  "respond_request.php",
  "get_psychometric.php",
  "save_psychometric.php",
  "delete_account.php",
  "upload_avatar.php",
  "get_topics.php",
  "get_attempt_details.php",
  "manage_chapter_test.php"
];
const AdminSystemScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("ai");
  const [aiConfig, setAiConfig] = reactExports.useState({ enabled: true, model: "gemini-3-flash-preview" });
  const [googleAuthEnabled, setGoogleAuthEnabled] = reactExports.useState(false);
  const [showSyncStatus, setShowSyncStatus] = reactExports.useState(false);
  const [googleClientId, setGoogleClientId] = reactExports.useState("");
  const [gaId, setGaId] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [saveSuccess, setSaveSuccess] = reactExports.useState(false);
  const [testInput, setTestInput] = reactExports.useState("");
  const [testResponse, setTestResponse] = reactExports.useState("");
  const [verifying, setVerifying] = reactExports.useState(false);
  const [verified, setVerified] = reactExports.useState(false);
  const [dbTables, setDbTables] = reactExports.useState([]);
  const [fileStatus, setFileStatus] = reactExports.useState({});
  const [scanning, setScanning] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadSettings();
    runDiagnostics();
  }, []);
  const loadSettings = async () => {
    try {
      const aiRes = await fetch("/api/manage_settings.php?key=ai_config");
      if (aiRes.ok) {
        const data = await aiRes.json();
        if (data == null ? void 0 : data.value) setAiConfig(JSON.parse(data.value));
      }
      const gaRes = await fetch("/api/manage_settings.php?key=google_analytics_id");
      if (gaRes.ok) {
        const data = await gaRes.json();
        if (data == null ? void 0 : data.value) setGaId(data.value);
      }
      const oRes = await fetch("/api/manage_settings.php?key=google_client_id");
      if (oRes.ok) {
        const data = await oRes.json();
        if (data == null ? void 0 : data.value) setGoogleClientId(data.value);
      }
      const oEnableRes = await fetch("/api/manage_settings.php?key=google_auth_enabled");
      if (oEnableRes.ok) {
        const data = await oEnableRes.json();
        if (data == null ? void 0 : data.value) setGoogleAuthEnabled(data.value === "1");
      }
      const syncRes = await fetch("/api/manage_settings.php?key=show_sync_status");
      if (syncRes.ok) {
        const data = await syncRes.json();
        if (data == null ? void 0 : data.value) setShowSyncStatus(data.value === "1");
      }
    } catch (e) {
    }
  };
  const handleTestAI = async () => {
    if (!testInput.trim() || verifying) return;
    setVerifying(true);
    setTestResponse("");
    try {
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(testInput)}`);
      setTestResponse(await res.text());
      setVerified(true);
    } catch (e) {
      setTestResponse("Verification failed.");
    } finally {
      setVerifying(false);
    }
  };
  const runDiagnostics = async () => {
    setScanning(true);
    try {
      const dbRes = await fetch("/api/test_db.php");
      if (dbRes.ok) {
        const data = await dbRes.json();
        if (data.tables) setDbTables(data.tables);
      }
      const statusMap = {};
      for (const file of API_FILE_LIST) {
        const res = await fetch(`/api/${file}`, { method: "HEAD" }).catch(() => ({ ok: false, status: 0 }));
        statusMap[file] = { code: res.status, ok: res.ok };
      }
      setFileStatus(statusMap);
    } catch (e) {
    }
    setScanning(false);
  };
  const handleSaveAI = async () => {
    setSaving(true);
    try {
      await fetch("/api/manage_settings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "ai_config", value: JSON.stringify(aiConfig) })
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3e3);
    } catch (e) {
    }
    setSaving(false);
  };
  const handleSaveAuth = async () => {
    setSaving(true);
    try {
      await Promise.all([
        fetch("/api/manage_settings.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "google_client_id", value: googleClientId })
        }),
        fetch("/api/manage_settings.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "google_auth_enabled", value: googleAuthEnabled ? "1" : "0" })
        }),
        fetch("/api/manage_settings.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "show_sync_status", value: showSyncStatus ? "1" : "0" })
        }),
        fetch("/api/manage_settings.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "google_analytics_id", value: gaId })
        })
      ]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3e3);
    } catch (e) {
    }
    setSaving(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-black flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-blue-400" }),
          " Admin System"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 mt-2", children: "v12.39 Sync Status Control" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("ai"), className: `px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "ai" ? "bg-blue-600 text-white" : "text-slate-400"}`, children: "AI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("auth"), className: `px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "auth" ? "bg-blue-600 text-white" : "text-slate-400"}`, children: "Auth & Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("health"), className: `px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "health" ? "bg-blue-600 text-white" : "text-slate-400"}`, children: "Health" })
      ] })
    ] }) }),
    activeTab === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in slide-in-from-bottom-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: AI_MODELS.map((model) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => {
        setAiConfig({ ...aiConfig, model: model.id });
        setVerified(false);
      }, className: `p-5 rounded-2xl border-2 transition-all cursor-pointer ${aiConfig.model === model.id ? "border-blue-600 bg-blue-50" : "border-slate-100 bg-white hover:border-slate-200"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-black uppercase px-2 py-1 rounded bg-${model.color}-100 text-${model.color}-700`, children: model.strength }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-800", children: model.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-2", children: model.description })
      ] }, model.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "text-slate-400" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "AI Sandbox Verification" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: testInput, onChange: (e) => setTestInput(e.target.value), className: "flex-1 p-4 bg-slate-50 border rounded-xl text-sm h-32", placeholder: "Send a test doubt..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-slate-50 rounded-xl p-4 border overflow-y-auto text-sm min-h-[128px]", children: testResponse || "No output." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleTestAI, disabled: verifying, className: "bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2", children: [
            verifying && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin", size: 16 }),
            " Test Model"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSaveAI, disabled: !verified, className: "bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg", children: "Save AI Config" })
        ] })
      ] })
    ] }),
    activeTab === "auth" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in slide-in-from-bottom-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-slate-100 bg-slate-50/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-100 text-blue-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Google Authentication" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Allow students to sign up and login using their Google accounts." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setGoogleAuthEnabled(!googleAuthEnabled), className: `flex items-center gap-2 transition-colors ${googleAuthEnabled ? "text-blue-600" : "text-slate-400"}`, children: googleAuthEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { size: 32 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { size: 32 }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-6 space-y-4 transition-all ${googleAuthEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Google OAuth Client ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "absolute left-3 top-3 text-slate-400", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: googleClientId,
                onChange: (e) => setGoogleClientId(e.target.value),
                placeholder: "xxxx-xxxx.apps.googleusercontent.com",
                className: "w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-slate-100 bg-slate-50/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-orange-100 text-orange-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Visual Sync Indicators" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Display 'Synced' / 'Not Synced' badges in the app headers." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSyncStatus(!showSyncStatus), className: `flex items-center gap-2 transition-colors ${showSyncStatus ? "text-orange-600" : "text-slate-400"}`, children: showSyncStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { size: 32 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { size: 32 }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-slate-100 bg-slate-50/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-emerald-100 text-emerald-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Analytics & Tracking" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Monitor visitor behavior and platform engagement." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Google Analytics ID (G-XXXXXX)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "absolute left-3 top-3 text-slate-400", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: gaId,
                onChange: (e) => setGaId(e.target.value),
                placeholder: "G-XXXXXXXXXX",
                className: "w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-100 outline-none"
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleSaveAuth,
          disabled: saving,
          className: "bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50",
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 18 }),
            saving ? "Saving..." : "Save Configuration"
          ]
        }
      ) })
    ] }),
    activeTab === "health" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black uppercase tracking-wider text-xs mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "text-blue-500" }),
          " Database Schema (v12.39)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[400px] overflow-y-auto", children: dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-3 bg-slate-50 rounded-lg border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-slate-700", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400", children: [
            t.rows,
            " records"
          ] })
        ] }, t.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black uppercase tracking-wider text-xs mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "text-orange-500" }),
          " API File Map (38 Enpoints)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto", children: API_FILE_LIST.map((file) => {
          var _a, _b;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-2 border rounded-lg text-[10px] font-bold ${((_a = fileStatus[file]) == null ? void 0 : _a.ok) ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`, children: [
            file,
            " • ",
            ((_b = fileStatus[file]) == null ? void 0 : _b.code) || "..."
          ] }, file);
        }) })
      ] })
    ] }),
    saveSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { size: 20 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "System Settings Updated Successfully" })
    ] })
  ] });
};
export {
  AdminSystemScreen
};
