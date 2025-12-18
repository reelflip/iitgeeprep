import { r as reactExports, j as jsxRuntimeExports, av as RefreshCw, aI as Database, o as Activity, b0 as PlugZap, b1 as Package, b2 as Download, b3 as JSZip } from "../vendor.js";
import { g as getBackendFiles, a as generateSQLSchema } from "../shared-core.js";
const DeploymentScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("guide");
  const [dbConfig, setDbConfig] = reactExports.useState({ host: "localhost", name: "u123456789_iitjee", user: "u123456789_admin", pass: "" });
  const [isZipping, setIsZipping] = reactExports.useState(false);
  const [connectionStatus, setConnectionStatus] = reactExports.useState(null);
  const [integrityResults, setIntegrityResults] = reactExports.useState([]);
  const [scanning, setScanning] = reactExports.useState(false);
  const [repairing, setRepairing] = reactExports.useState(false);
  const API_FILES = [
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
    "upload_avatar.php"
  ];
  const runIntegrityScan = async () => {
    setScanning(true);
    setIntegrityResults([]);
    const results = [];
    for (const file of API_FILES) {
      const start = performance.now();
      let status = "UNKNOWN";
      let code = 0;
      try {
        const res = await fetch(`/api/${file}`, { method: "HEAD", cache: "no-store" });
        code = res.status;
        if (res.ok) status = "OK";
        else if (res.status === 403) status = "PERM_ERR";
        else if (res.status === 404) status = "MISSING";
        else if (res.status === 500) status = "CRASH";
        else status = "ERROR";
      } catch (e) {
        status = "NET_ERR";
      }
      results.push({ file, status, code, time: Math.round(performance.now() - start) });
      setIntegrityResults([...results]);
    }
    setScanning(false);
  };
  const runDbRepair = async () => {
    setRepairing(true);
    try {
      const res = await fetch("/api/migrate_db.php");
      if (res.ok) alert("v12.23 Schema Repair Successful!");
      else throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      alert("Repair Failed: " + e.message);
    } finally {
      setRepairing(false);
    }
  };
  const downloadAllZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const backendFiles = getBackendFiles(dbConfig);
      const apiFolder = zip.folder("deployment/api");
      if (apiFolder) backendFiles.filter((f) => f.folder === "deployment/api").forEach((file) => apiFolder.file(file.name, file.content));
      const seoFolder = zip.folder("deployment/seo");
      if (seoFolder) backendFiles.filter((f) => f.folder === "deployment/seo").forEach((file) => seoFolder.file(file.name, file.content));
      const sqlFolder = zip.folder("deployment/sql");
      if (sqlFolder) sqlFolder.file("database.sql", generateSQLSchema());
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "IITGEEPrep_Bundle_v12_23.zip";
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error creating zip file.");
    }
    setIsZipping(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: "Deployment Center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-md bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-400", children: "v12.23 (Latest)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg", children: "Download the complete backend kit for production rollout." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-700/50 p-1 rounded-xl border border-slate-600/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("guide"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "guide" ? "bg-blue-600 text-white" : "text-slate-400"}`, children: "Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("integrity"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "integrity" ? "bg-orange-600 text-white" : "text-slate-400"}`, children: "Integrity" })
      ] })
    ] }) }),
    activeTab === "integrity" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-8 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800", children: "File & Schema Diagnostics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Scan API health and repair database tables." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runDbRepair, disabled: repairing, className: "bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2", children: [
            repairing ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 18 }),
            " Repair DB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runIntegrityScan, disabled: scanning, className: "bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2", children: [
            scanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlugZap, { size: 18 }),
            " Scan Files"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: integrityResults.map((res) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between ${res.status === "OK" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-700 text-sm truncate w-32", children: res.file }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-slate-500", children: [
            res.time,
            "ms • HTTP ",
            res.code
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-black ${res.status === "OK" ? "text-green-600" : "text-red-600"}`, children: res.status })
      ] }, res.file)) })
    ] }),
    activeTab === "guide" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-slate-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "text-blue-600" }),
          " Update Instructions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-4 text-slate-600 text-sm list-decimal pl-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Download the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "v12.23" }),
            " Bundle using the sidebar action."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Extract and upload ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "deployment/api/*" }),
            " to your server's ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api" }),
            " folder."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Use the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Repair DB" }),
            " tool above to synchronize any new schema changes."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Clear browser cache to see the latest frontend updates." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Get Bundle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-6", children: "Complete v12.23 backend kit including PHP APIs and SQL." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadAllZip, disabled: isZipping, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-all disabled:opacity-50", children: [
          isZipping ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2" }),
          " Download v12.23 .zip"
        ] })
      ] }) })
    ] })
  ] });
};
export {
  DeploymentScreen
};
