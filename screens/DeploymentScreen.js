import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import { getBackendFiles, generateSQLSchema } from "../services/generatorService.js";
import JSZip from "../node_modules/jszip/dist/jszip.min.js";
import BookOpen from "../node_modules/lucide-react/dist/esm/icons/book-open.js";
import Server from "../node_modules/lucide-react/dist/esm/icons/server.js";
import Package from "../node_modules/lucide-react/dist/esm/icons/package.js";
import Activity from "../node_modules/lucide-react/dist/esm/icons/activity.js";
import Download from "../node_modules/lucide-react/dist/esm/icons/download.js";
import Database from "../node_modules/lucide-react/dist/esm/icons/database.js";
import ShieldCheck from "../node_modules/lucide-react/dist/esm/icons/shield-check.js";
import PanelsTopLeft from "../node_modules/lucide-react/dist/esm/icons/panels-top-left.js";
const DeploymentScreen = () => {
  const [activeTab, setActiveTab] = reactExports.useState("guide");
  const [dbConfig, setDbConfig] = reactExports.useState({
    host: "localhost",
    name: "u123456789_iitjee",
    user: "u123456789_admin",
    pass: ""
  });
  const [isZipping, setIsZipping] = reactExports.useState(false);
  const downloadAllZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const backendFiles = getBackendFiles(dbConfig);
      const apiFolder = zip.folder("deployment/api");
      if (apiFolder) {
        backendFiles.filter((f) => f.folder === "deployment/api").forEach((file) => {
          apiFolder.file(file.name, file.content);
        });
      }
      const seoFolder = zip.folder("deployment/seo");
      if (seoFolder) {
        backendFiles.filter((f) => f.folder === "deployment/seo").forEach((file) => {
          seoFolder.file(file.name, file.content);
        });
      }
      const sqlFolder = zip.folder("deployment/sql");
      if (sqlFolder) {
        sqlFolder.file("database.sql", generateSQLSchema());
      }
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "iitgeeprep_deployment_bundle.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to zip files", error);
      alert("Error creating zip file.");
    }
    setIsZipping(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: "System Deployment Center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-md bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-400 shadow-sm", children: "v12.3 (Stable)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg max-w-xl", children: "Download the complete backend kit and follow the structured guide to go live." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-700/50 p-1 rounded-xl border border-slate-600/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveTab("guide"),
            className: `flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "guide" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
              " Instructions"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveTab("architecture"),
            className: `flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "architecture" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4 h-4" }),
              " Architecture"
            ]
          }
        )
      ] })
    ] }) }),
    activeTab === "guide" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 mr-3 text-blue-600" }),
          " Deployment Workflow"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold text-slate-800", children: "Download System Bundle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm mt-1 leading-relaxed", children: "Click the download button on the right. This ZIP contains all necessary server-side files organized into folders (`deployment/api`, `deployment/sql`, `deployment/seo`)." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold text-slate-800", children: "Build Frontend" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm mt-1 leading-relaxed", children: [
                "Run ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono text-xs", children: "npm run build" }),
                " in your local terminal. This creates a ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono text-xs", children: "dist/" }),
                " folder containing the React application."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold text-slate-800", children: "Server Mapping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm mt-2 mb-3", children: [
                "Copy files to your server's ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: "public_html" }),
                " as follows:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-xl border border-slate-200 overflow-hidden text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-slate-100 p-2 font-bold text-slate-600 border-b border-slate-200", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Source" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Destination" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 p-3 border-b border-slate-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-slate-700", children: "dist/*" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-blue-600", children: "public_html/" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 p-3 border-b border-slate-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-slate-700", children: "deployment/api/*" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-blue-600", children: "public_html/api/" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 p-3 border-b border-slate-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-slate-700", children: "deployment/seo/*" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-blue-600", children: "public_html/" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 p-3 bg-yellow-50/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-slate-700", children: "deployment/sql/database.sql" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-orange-600", children: "Import via phpMyAdmin" })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Ready to Deploy?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-6", children: "Get the full backend kit with SQL schemas and API scripts." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: downloadAllZip,
                disabled: isZipping,
                className: "w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95 disabled:opacity-50",
                children: [
                  isZipping ? /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5 mr-2" }),
                  "Download Bundle .zip"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-slate-800 mb-4 flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4 mr-2 text-slate-500" }),
            " Pre-Config Database"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mb-4", children: "Enter your hosting DB details here to auto-generate the `config.php` inside the bundle." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "DB Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: dbConfig.name,
                  onChange: (e) => setDbConfig({ ...dbConfig, name: e.target.value }),
                  className: "w-full p-2 border border-slate-200 rounded text-sm mt-1 focus:ring-1 focus:ring-blue-200 outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "DB User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: dbConfig.user,
                  onChange: (e) => setDbConfig({ ...dbConfig, user: e.target.value }),
                  className: "w-full p-2 border border-slate-200 rounded text-sm mt-1 focus:ring-1 focus:ring-blue-200 outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "DB Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: dbConfig.pass,
                  onChange: (e) => setDbConfig({ ...dbConfig, pass: e.target.value }),
                  placeholder: "Optional",
                  className: "w-full p-2 border border-slate-200 rounded text-sm mt-1 focus:ring-1 focus:ring-blue-200 outline-none"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-100 p-4 rounded-xl flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-green-600 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-green-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block mb-1", children: "Security Note" }),
            "Ensure your `api` folder has 755 permissions. Never upload the source code (`src/`, `package.json`) to the public server."
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { className: "w-16 h-16 text-slate-200 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "System Architecture" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 max-w-lg mx-auto", children: "The IITGEEPrep platform utilizes a decoupled React Frontend (Client-side routing) talking to a lightweight PHP/MySQL Backend via REST API. State is managed via LocalStorage for offline resilience with sync capabilities." })
    ] })
  ] });
};
export {
  DeploymentScreen
};
