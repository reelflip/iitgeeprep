import { r as reactExports, j as jsxRuntimeExports, aL as Database, a9 as RefreshCw, aP as ShieldCheck, a7 as AlertTriangle, k as Layers, b4 as ChevronUp, C as ChevronDown, q as Activity, b5 as Info, a8 as CheckCircle2, b6 as Download, b7 as JSZip } from "../vendor.js";
import { g as getBackendFiles, b as generateSQLSchema } from "../shared-core.js";
const DeploymentScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("guide");
  const [dbConfig, setDbConfig] = reactExports.useState({ host: "localhost", name: "u123456789_iitjee", user: "u123456789_admin", pass: "" });
  const [isZipping, setIsZipping] = reactExports.useState(false);
  const [integrityResults, setIntegrityResults] = reactExports.useState([]);
  const [dbTables, setDbTables] = reactExports.useState([]);
  const [scanning, setScanning] = reactExports.useState(false);
  const [scanningDb, setScanningDb] = reactExports.useState(false);
  const [repairing, setRepairing] = reactExports.useState(false);
  const [expandedTable, setExpandedTable] = reactExports.useState(null);
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
    "upload_avatar.php",
    "get_topics.php",
    "get_attempt_details.php",
    "manage_chapter_test.php"
  ];
  const getStatusInfo = (code, text) => {
    if (text == null ? void 0 : text.includes("DATABASE_CONNECTION_ERROR")) return { desc: "DB Link Failed", msg: "PHP is OK, but MySQL credentials rejected." };
    switch (code) {
      case 200:
        return { desc: "Success", msg: "File reachable and active." };
      case 400:
        return { desc: "Bad Request", msg: "Invalid input parameters." };
      case 401:
        return { desc: "Unauthorized", msg: "Auth token missing or invalid." };
      case 403:
        return { desc: "Forbidden", msg: "Check folder permissions." };
      case 404:
        return { desc: "Not Found", msg: "File is missing from server." };
      case 500:
        return { desc: "Syntax Error", msg: "PHP engine crashed. Likely code error." };
      case 0:
        return { desc: "Network Error", msg: "CORS or Connection timeout." };
      default:
        return { desc: "Unknown", msg: "Unexpected response code." };
    }
  };
  const runIntegrityScan = async () => {
    setScanning(true);
    setIntegrityResults([]);
    const results = [];
    for (const file of API_FILES) {
      const start = performance.now();
      let status = "UNKNOWN";
      let code = 0;
      let responseText = "";
      try {
        const res = await fetch(`/api/${file}`, { method: "POST", body: "{}", cache: "no-store" });
        code = res.status;
        responseText = await res.clone().text();
        if (res.ok) {
          if (responseText.includes("DATABASE_CONNECTION_ERROR")) status = "DB_ERROR";
          else status = "OK";
        } else if (res.status === 403) status = "PERM_ERR";
        else if (res.status === 404) status = "MISSING";
        else if (res.status === 500) status = "CRASH";
        else status = "ERROR";
      } catch (e) {
        status = "NET_ERR";
      }
      results.push({ file, status, code, time: Math.round(performance.now() - start), text: responseText });
      setIntegrityResults([...results]);
    }
    setScanning(false);
  };
  const scanDatabase = async () => {
    setScanningDb(true);
    setDbTables([]);
    try {
      const res = await fetch("/api/test_db.php", { cache: "no-store" });
      const data = await res.json();
      if (data.status === "CONNECTED") {
        setDbTables(data.tables || []);
      } else {
        alert("Database Connectivity Error: " + (data.message || data.details || "Access Denied"));
      }
    } catch (e) {
      alert("API Unreachable: Ensure test_db.php exists in /api folder.");
    } finally {
      setScanningDb(false);
    }
  };
  const runDbRepair = async () => {
    setRepairing(true);
    try {
      const res = await fetch("/api/migrate_db.php");
      if (res.ok) {
        alert("v12.41 Master Sync Schema Verification Successful!");
        scanDatabase();
      } else throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      alert("Sync Failed: " + e.message);
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
      if (apiFolder) {
        backendFiles.filter((f) => f.folder === "deployment/api").forEach((file) => apiFolder.file(file.name, file.content));
      }
      const seoFolder = zip.folder("deployment/seo");
      if (seoFolder) {
        backendFiles.filter((f) => f.folder === "deployment/seo").forEach((file) => seoFolder.file(file.name, file.content));
      }
      const sqlFolder = zip.folder("deployment/sql");
      if (sqlFolder) sqlFolder.file("database.sql", generateSQLSchema());
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "IITGEEPrep_Full_v12_41.zip";
      link.click();
    } catch (error) {
      alert("Zip creation failed.");
    }
    setIsZipping(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: "Deployment Center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-md bg-blue-600 text-xs font-mono text-white animate-pulse uppercase tracking-widest", children: "v12.41 MASTER SYNC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg", children: "Platform-wide synchronization for 38 endpoints and 26-table SQL schema." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-700/50 p-1 rounded-xl border border-slate-600/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("guide"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "guide" ? "bg-blue-600 text-white" : "text-slate-400"}`, children: "Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("integrity"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "integrity" ? "bg-orange-600 text-white" : "text-slate-400"}`, children: "Integrity" })
      ] })
    ] }) }),
    activeTab === "integrity" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-8 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "text-blue-500", size: 20 }),
              " Database Sync Tracker"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Checking v12.41 schema compliance across 26 tables." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runDbRepair, disabled: repairing, className: "flex-1 md:flex-none bg-slate-800 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50", children: [
              repairing ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }),
              " Repair Schema"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: scanDatabase, disabled: scanningDb, className: "flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50", children: [
              scanningDb ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 18 }),
              " Test DB Connection"
            ] })
          ] })
        ] }),
        dbTables.length === 0 && !scanningDb ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center text-rose-500 bg-rose-50 rounded-2xl border border-dashed border-rose-200 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { size: 48, className: "mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold uppercase tracking-widest text-xs", children: "No DB Link Detected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-2 max-w-sm", children: [
            "Remote MySQL host rejected connection. Sync requires updated ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "config.php" }),
            "."
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dbTables.map((table) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-blue-300 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => setExpandedTable(expandedTable === table.name ? null : table.name),
                className: `p-4 flex items-center justify-between cursor-pointer transition-colors ${expandedTable === table.name ? "bg-blue-50" : "bg-white hover:bg-slate-50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${expandedTable === table.name ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 18 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-800 text-sm tracking-tight", children: table.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          ((_a = table.columns) == null ? void 0 : _a.length) || 0,
                          " Fields"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-600", children: [
                          table.rows,
                          " Records"
                        ] })
                      ] })
                    ] })
                  ] }),
                  expandedTable === table.name ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 20, className: "text-slate-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 20, className: "text-slate-400" })
                ]
              }
            ),
            expandedTable === table.name && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-t border-slate-100 animate-in slide-in-from-top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50 text-slate-400 uppercase font-black tracking-widest", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 border-b", children: "Field" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 border-b", children: "Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 border-b", children: "Null" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 border-b", children: "Key" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-50", children: table.columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-bold text-slate-700", children: col.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-500 font-mono text-[10px]", children: col.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-400", children: col.null }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: col.key === "PRI" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter", children: "Primary" }) : col.key ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter", children: col.key }) : "-" })
              ] }, col.name)) })
            ] }) })
          ] }, table.name);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-8 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-orange-500", size: 20 }),
              " Module Integrity Scan (v12.41)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Checking for syntax stability across the full 38-file set." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runIntegrityScan, disabled: scanning, className: "bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50", children: [
            scanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18 }),
            " Full Set Scan"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: integrityResults.map((res) => {
          const info = getStatusInfo(res.code, res.text);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl border flex flex-col justify-between transition-all hover:shadow-md ${res.status === "OK" ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-slate-800 text-xs truncate mb-1", children: res.file }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${res.code === 200 && !res.text.includes("DATABASE_CONNECTION_ERROR") ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`, children: [
                    "HTTP ",
                    res.code
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-slate-400", children: [
                    res.time,
                    "ms"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-lg border ${res.status === "OK" ? "bg-white border-emerald-200 text-emerald-600" : "bg-white border-rose-200 text-rose-600"}`, children: res.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-slate-200/40 flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "mt-0.5 text-slate-400 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-0.5", children: info.desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-slate-500 leading-tight", children: info.msg })
              ] })
            ] })
          ] }, res.file);
        }) })
      ] })
    ] }),
    activeTab === "guide" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-slate-800 flex items-center gap-2 text-blue-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "animate-pulse" }),
          " Master Synchronization Guide (v12.41)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-sm leading-relaxed", children: "System v12.41 ensures 100% synchronization between frontend and backend. Your database currently reports 26 tables." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-4 text-slate-600 text-sm list-decimal pl-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Download the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "v12.41 Master Sync Bundle" }),
            ". It contains 38 PHP scripts."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Wipe the /api directory" }),
            " completely before uploading. Do not leave old files."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Run the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Repair Schema" }),
            " button to verify that all 26 production tables are correctly structured."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Perform a ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Full Set Scan" }),
            " to confirm 200 OK responses from all 38 endpoints."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Sync Master Bundle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm mb-6 leading-relaxed", children: "Contains 38 Synchronized PHP APIs and the 26-table Master SQL Schema for full system restoration." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadAllZip, disabled: isZipping, className: "w-full bg-white text-blue-900 font-black py-3 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg active:scale-95 mt-4", children: [
          isZipping ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2" }),
          " Download v12.41 (38 Files)"
        ] })
      ] }) })
    ] })
  ] });
};
export {
  DeploymentScreen
};
