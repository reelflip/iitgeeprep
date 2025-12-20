import { r as reactExports, j as jsxRuntimeExports, I as Inbox, ay as FileWarning, a7 as AlertTriangle, a9 as RefreshCw, at as Search, L as Loader2, az as Mail, av as Trash2, e as ChevronRight } from "../vendor.js";
const AdminInboxScreen = () => {
  const [messages, setMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const fetchMessages = reactExports.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/manage_contact.php", { cache: "no-store" });
      if (res.status === 404) {
        setError({ type: "api", msg: "Inbox component 'manage_contact.php' is missing from server." });
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (data == null ? void 0 : data.error) {
        setError({ type: "data", msg: data.error });
      }
    } catch (e) {
      setError({ type: "net", msg: "Failed to establish secure connection to Inbox server." });
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Permanently delete this inquiry?")) return;
    try {
      await fetch(`/api/manage_contact.php?id=${id}`, { method: "DELETE" });
      setMessages(messages.filter((m) => String(m.id) !== String(id)));
    } catch (err) {
      alert("Delete action failed.");
    }
  };
  const filteredMessages = messages.filter((m) => {
    var _a, _b, _c;
    const s = search.toLowerCase();
    return ((_a = m.name) == null ? void 0 : _a.toLowerCase().includes(s)) || ((_b = m.subject) == null ? void 0 : _b.toLowerCase().includes(s)) || ((_c = m.email) == null ? void 0 : _c.toLowerCase().includes(s));
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-8 h-8 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Identity Communication Console" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-100 opacity-90 max-w-2xl font-medium", children: "Monitor public inquiries and aspirant support tickets from the main website." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-2 border ${error.type === "api" ? "bg-orange-50 border-orange-200 text-orange-800" : "bg-red-50 border-red-200 text-red-700"}`, children: [
      error.type === "api" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileWarning, { className: "w-6 h-6 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-6 h-6 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase text-xs tracking-widest mb-1", children: error.type === "api" ? "Configuration Alert" : "System Error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: error.msg })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchMessages, className: "p-2 hover:bg-black/5 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Filter by sender or subject...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-100 outline-none bg-white"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: [
            filteredMessages.length,
            " Messages Found"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchMessages, className: "p-2 hover:bg-slate-100 rounded-lg text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16 }) })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 animate-spin mb-3 text-purple-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-widest", children: "Retrieving Inbound Streams..." })
      ] }) : filteredMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-16 h-16 mb-4 opacity-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold italic", children: "No active inquiries matched your criteria." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: filteredMessages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => setExpandedId(String(expandedId) === String(msg.id) ? null : msg.id),
          className: `group p-5 transition-all cursor-pointer hover:bg-slate-50 ${String(expandedId) === String(msg.id) ? "bg-purple-50/40 border-l-4 border-purple-600" : "border-l-4 border-transparent"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm transition-all ${String(expandedId) === String(msg.id) ? "bg-purple-600 text-white shadow-lg" : "bg-white border border-slate-200 text-slate-400"}`, children: (msg.name || "U").charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `font-bold text-base truncate ${String(expandedId) === String(msg.id) ? "text-purple-900" : "text-slate-800"}`, children: msg.subject || "(No Subject)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-tighter", children: "Support" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 font-medium truncate", children: [
                    msg.name,
                    " • ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: msg.email })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 ml-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap", children: msg.created_at ? new Date(msg.created_at).toLocaleDateString(void 0, { day: "2-digit", month: "short" }) : "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => handleDelete(msg.id, e),
                    className: "p-2 text-slate-200 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            String(expandedId) === String(msg.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pl-16 pr-4 animate-in fade-in slide-in-from-top-1 duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 opacity-5 text-purple-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 48 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-purple-600" }),
                "Message Payload"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-700 leading-relaxed whitespace-pre-wrap relative z-10 font-medium italic", children: [
                '"',
                msg.message,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-6 border-t border-slate-50 flex justify-end gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${msg.email}`, className: "px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all flex items-center gap-2", children: [
                "Compose Reply ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
              ] }) })
            ] }) })
          ]
        },
        msg.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-widest text-slate-400 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldRight, { className: "w-3 h-3" }),
      " End-to-End Encrypted Communication Interface"
    ] })
  ] });
};
const ShieldRight = ({ className }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m9 12 2 2 4-4" })
] });
export {
  AdminInboxScreen
};
