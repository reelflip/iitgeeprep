import { r as reactExports, j as jsxRuntimeExports, al as Database, ae as Terminal, af as Lock, _ as RefreshCw, aT as Download, h as Layers, A as Activity, W as TriangleAlert, aU as JSZip } from "../vendor.js";
import { g as getBackendFiles, c as generateSQLSchema } from "../shared-core.js";
const DeploymentScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("guide");
  const [dbConfig, setDbConfig] = reactExports.useState({
    host: "localhost",
    name: "u123456789_prep",
    user: "u123456789_admin",
    pass: "password"
  });
  const [isZipping, setIsZipping] = reactExports.useState(false);
  const [integrityResults, setIntegrityResults] = reactExports.useState([]);
  const [dbTables, setDbTables] = reactExports.useState([]);
  const [scanning, setScanning] = reactExports.useState(false);
  const [scanningDb, setScanningDb] = reactExports.useState(false);
  const runIntegrityScan = async () => {
    setScanning(true);
    setIntegrityResults([]);
    const API_FILES = ["test_db.php", "login.php", "get_dashboard.php"];
    const results = [];
    for (const file of API_FILES) {
      const start = performance.now();
      let status = "UNKNOWN";
      let code = 0;
      try {
        const res = await fetch(`/api/${file}`, { method: "GET", cache: "no-store" });
        code = res.status;
        if (res.ok) status = "OK";
        else if (res.status === 404) status = "MISSING";
        else status = "ERROR";
      } catch (e) {
        status = "NET_ERR";
      }
      results.push({ file, status, code, time: Math.round(performance.now() - start) });
      setIntegrityResults([...results]);
    }
    setScanning(false);
  };
  const scanDatabase = async () => {
    setScanningDb(true);
    try {
      const res = await fetch("/api/test_db.php", { cache: "no-store" });
      const data = await res.json();
      if (data.status === "success" && data.tables) {
        setDbTables(data.tables);
      } else {
        alert(`MySQL Connection Refused: ${data.message || "Check your config.php credentials."}`);
      }
    } catch (e) {
      alert("Database node unreachable. Please ensure your /api/ folder is uploaded to the server.");
    }
    setScanningDb(false);
  };
  const downloadAllZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const backendFiles = getBackendFiles(dbConfig);
      const apiFolder = zip.folder("api");
      if (apiFolder) {
        backendFiles.filter((f) => f.folder === "deployment/api").forEach((file) => apiFolder.file(file.name, file.content));
      }
      zip.file("database_mysql.sql", generateSQLSchema());
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `IITGEE_Master_Sync_v18.zip`;
      link.click();
    } catch (error) {
      alert("Zip generation failed.");
    }
    setIsZipping(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-8 h-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase tracking-tight", children: "Deployment Control" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-bold uppercase text-xs tracking-widest mt-1", children: "Master Build v18.0 • Direct MySQL Sync" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-xl font-medium", children: "Use this console to configure your Hostinger environment and download the required backend architecture." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-800 p-1 rounded-2xl border border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("guide"), className: `px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "guide" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400"}`, children: "Instruction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("integrity"), className: `px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "integrity" ? "bg-orange-600 text-white shadow-lg" : "text-slate-400"}`, children: "Verification" })
      ] })
    ] }) }),
    activeTab === "guide" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-black text-slate-800 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "text-blue-600" }),
          " Database Configuration"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1", children: "Host (Usually localhost)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-none", value: dbConfig.host, onChange: (e) => setDbConfig({ ...dbConfig, host: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1", children: "Database Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-none", value: dbConfig.name, onChange: (e) => setDbConfig({ ...dbConfig, name: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1", children: "DB User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-none", value: dbConfig.user, onChange: (e) => setDbConfig({ ...dbConfig, user: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1", children: "DB Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-4 top-3.5 text-slate-300 w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-none", type: "password", value: dbConfig.pass, onChange: (e) => setDbConfig({ ...dbConfig, pass: e.target.value }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-100 p-6 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-blue-900 text-sm mb-3", children: "Deployment Protocol" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-xs text-blue-800/80 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1." }),
              " Enter your Hostinger MySQL details above."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2." }),
              " Download the ZIP bundle containing all 38 PHP endpoints."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3." }),
              ' Upload the extracted "api" folder to your public_html root.'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "4." }),
              ' Use the "Verify" tab to check connectivity.'
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-between h-full relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-black uppercase tracking-tight mb-4 leading-tight", children: [
            "Master Build ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Bundle"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-200 text-sm font-medium italic opacity-80 leading-relaxed", children: "Contains the SQL schema and all backend logic files pre-configured with your credentials." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadAllZip, disabled: isZipping, className: "w-full bg-white text-indigo-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-50 transition-all active:scale-95 shadow-xl mt-12 relative z-10", children: [
          isZipping ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, {}),
          "Download Build ZIP"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -right-10 p-4 opacity-5 text-white scale-[2.5]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 64 }) })
      ] }) })
    ] }),
    activeTab === "integrity" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8 animate-in slide-in-from-right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-10 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-slate-800 uppercase tracking-tight", children: "Connectivity Audit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 font-bold uppercase tracking-widest mt-1", children: "Live Endpoint Probe" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runIntegrityScan, disabled: scanning, className: "bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-95", children: [
            scanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }),
            " Probe Files"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: scanDatabase, disabled: scanningDb, className: "bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-95", children: [
            scanningDb ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            " DB Handshake"
          ] })
        ] })
      ] }),
      integrityResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-10", children: integrityResults.map((res) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 border-2 rounded-2xl flex flex-col justify-between transition-all ${res.status === "OK" ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1", children: res.file }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xl font-black ${res.code === 200 ? "text-emerald-700" : "text-rose-700"}`, children: res.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-black px-2 py-0.5 rounded-lg ${res.status === "OK" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`, children: res.status })
        ] })
      ] }, res.file)) }),
      dbTables.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-1", children: "Live Database State" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center group hover:bg-white transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-slate-700 uppercase tracking-tight", children: t.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white px-3 py-1 rounded-xl border text-[11px] font-black text-blue-600 shadow-sm", children: [
            t.rows,
            " Rows"
          ] })
        ] }, t.name)) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-24 text-center text-slate-300 border-4 border-dashed rounded-[3rem] opacity-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 64, className: "mx-auto mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase text-sm tracking-[0.2em]", children: "Registry Empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase mt-2", children: "Upload backend and run 'DB Handshake' above." })
      ] })
    ] }) })
  ] });
};
export {
  DeploymentScreen
};
