import { r as reactExports, j as jsxRuntimeExports, aq as Database, ak as Terminal, _ as RefreshCw, aX as Download, A as Activity, l as Layers, W as TriangleAlert, aY as JSZip } from "../vendor.js";
import { g as getBackendFiles, b as generateSQLSchema } from "../shared-core.js";
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
        alert(`MySQL Error: ${data.message || "Check credentials"}`);
      }
    } catch (e) {
      alert("Endpoint unreachable. Ensure you have uploaded the api/ folder to your server.");
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
      link.download = "IITGEE_MySQL_Bundle_v16.zip";
      link.click();
    } catch (error) {
      alert("Zip failed.");
    }
    setIsZipping(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: "MySQL Sync Console" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-md bg-indigo-600 text-[10px] font-black text-white uppercase tracking-widest", children: "v16.0 ENGINE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg", children: "Connected to Hostinger MySQL environment." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("guide"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "guide" ? "bg-blue-600 text-white" : "text-slate-400"}`, children: "Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("integrity"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "integrity" ? "bg-orange-600 text-white" : "text-slate-400"}`, children: "Verify" })
      ] })
    ] }) }),
    activeTab === "guide" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-slate-800 flex items-center gap-2 text-indigo-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { size: 20 }),
          " MySQL Instructions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 rounded-xl border border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-slate-400 uppercase tracking-widest mb-3", children: "1. Database Config" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase", children: "DBHOST" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-2 border rounded mt-1 text-sm font-mono", value: dbConfig.host, onChange: (e) => setDbConfig({ ...dbConfig, host: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase", children: "DBNAME" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-2 border rounded mt-1 text-sm font-mono", value: dbConfig.name, onChange: (e) => setDbConfig({ ...dbConfig, name: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase", children: "DBUSER" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-2 border rounded mt-1 text-sm font-mono", value: dbConfig.user, onChange: (e) => setDbConfig({ ...dbConfig, user: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase", children: "DBPASS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-2 border rounded mt-1 text-sm font-mono", type: "password", value: dbConfig.pass, onChange: (e) => setDbConfig({ ...dbConfig, pass: e.target.value }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-slate-600 list-disc pl-5 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Extract the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "api/" }),
              " folder to your ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "public_html" }),
              " root."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Import ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "database_mysql.sql" }),
              " via phpMyAdmin in your Hostinger panel."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Ensure ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PDO MySQL" }),
              " is enabled in your PHP Selector settings."
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-900 rounded-2xl p-8 text-white shadow-xl flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-4", children: "MySQL Bundle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-200 text-sm mb-8 font-medium italic", children: "Optimized for Hostinger LAMP stacks. Includes full relational schema." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadAllZip, disabled: isZipping, className: "w-full bg-white text-indigo-900 font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-95", children: [
          isZipping ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, {}),
          "Download v16.0 ZIP"
        ] })
      ] }) })
    ] }),
    activeTab === "integrity" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8 animate-in slide-in-from-right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-orange-500" }),
          " MySQL Link Status"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runIntegrityScan, disabled: scanning, className: "bg-slate-800 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2", children: [
            scanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, {}),
            " Scan Endpoints"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: scanDatabase, disabled: scanningDb, className: "bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2", children: [
            scanningDb ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, {}),
            " Test Connection"
          ] })
        ] })
      ] }),
      integrityResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8", children: integrityResults.map((res) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 border rounded-xl flex flex-col justify-between ${res.status === "OK" ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-slate-800 truncate mb-1 uppercase", children: res.file }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[10px] font-bold ${res.code === 200 ? "text-emerald-600" : "text-rose-600"}`, children: [
          "HTTP ",
          res.code,
          " (",
          res.status,
          ")"
        ] })
      ] }, res.file)) }),
      dbTables.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: dbTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 border rounded-xl flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "text-slate-400", size: 16 }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-slate-700", children: t.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-white px-2 py-1 rounded border text-blue-600", children: [
          t.rows,
          " rows"
        ] })
      ] }, t.name)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center text-slate-400 border-2 border-dashed rounded-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 48, className: "mx-auto mb-4 opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "No active tables detected. Run the test above." })
      ] })
    ] }) })
  ] });
};
export {
  DeploymentScreen
};
