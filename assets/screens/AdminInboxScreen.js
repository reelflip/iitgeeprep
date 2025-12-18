import { r as reactExports, j as jsxRuntimeExports, I as Inbox, at as FileWarning, au as AlertTriangle, c as ChevronRight, av as RefreshCw, ao as Search, aw as Mail, aq as Trash2 } from "../vendor.js";
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
      const text = await res.text();
      if (res.status === 404) {
        setError({ type: "api", msg: "Endpoint 'manage_contact.php' not found. Please re-run the System Setup to restore API files." });
        setMessages([]);
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 50)}`);
      }
      if (!text || text.trim() === "") {
        setMessages([]);
        return;
      }
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          setMessages(data.filter((m) => m && typeof m === "object" && m.id));
        } else {
          setMessages([]);
          if (data == null ? void 0 : data.error) setError({ type: "data", msg: data.error });
        }
      } catch (parseErr) {
        setError({ type: "data", msg: "Invalid data received. The API file might be corrupted." });
      }
    } catch (e) {
      setError({ type: "net", msg: e.message || "Failed to reach server." });
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Permanently delete this message?")) return;
    setMessages((prev) => prev.filter((m) => String(m.id) !== String(id)));
    try {
      await fetch(`/api/manage_contact.php?id=${id}`, { method: "DELETE" });
    } catch (err) {
      fetchMessages();
    }
  };
  const safeMessages = Array.isArray(messages) ? messages : [];
  const filteredMessages = safeMessages.filter((m) => {
    var _a, _b, _c;
    if (!m) return false;
    const s = search.toLowerCase();
    return ((_a = m.name) == null ? void 0 : _a.toLowerCase().includes(s)) || false || (((_b = m.subject) == null ? void 0 : _b.toLowerCase().includes(s)) || false) || (((_c = m.email) == null ? void 0 : _c.toLowerCase().includes(s)) || false);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-8 h-8 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Admin Inbox" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-100 opacity-90 max-w-2xl", children: "Monitor public inquiries safely. If this screen fails, check the System Health tab." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-2 border ${error.type === "api" ? "bg-orange-50 border-orange-200 text-orange-800" : "bg-red-50 border-red-200 text-red-700"}`, children: [
      error.type === "api" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileWarning, { className: "w-6 h-6 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-6 h-6 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase text-xs tracking-widest mb-1", children: error.type === "api" ? "Missing Component" : "System Error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: error.msg }),
        error.type === "api" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/deployment", className: "text-[10px] font-bold bg-orange-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1", children: [
          "Go to Deployment Center ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 10 })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchMessages, className: "p-2 hover:bg-black/5 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Filter inbox...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-100 outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-400", children: [
          filteredMessages.length,
          " Messages"
        ] })
      ] }),
      loading && safeMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 animate-spin mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Synchronizing with server..." })
      ] }) : filteredMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-16 h-16 mb-2 opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold italic", children: error ? "System unreachable" : "Inbox is clean" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: filteredMessages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => setExpandedId(String(expandedId) === String(msg.id) ? null : msg.id),
          className: `group p-4 transition-all cursor-pointer hover:bg-slate-50 ${String(expandedId) === String(msg.id) ? "bg-purple-50/30" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm bg-white border border-slate-100 text-slate-400", children: (msg.name || "U").charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `font-bold text-sm truncate ${String(expandedId) === String(msg.id) ? "text-purple-700" : "text-slate-800"}`, children: msg.subject || "(No Subject)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 truncate mt-0.5", children: [
                    msg.name,
                    " • ",
                    msg.email
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 ml-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-300 whitespace-nowrap", children: msg.created_at ? new Date(msg.created_at).toLocaleDateString() : "Just now" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => handleDelete(msg.id, e),
                    className: "text-slate-200 hover:text-red-500 transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            String(expandedId) === String(msg.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pl-14 pr-4 animate-in fade-in slide-in-from-top-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 opacity-5 text-purple-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 48 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 leading-relaxed whitespace-pre-wrap relative z-10", children: msg.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${msg.email}`, className: "text-[10px] font-black uppercase text-blue-600 hover:underline", children: [
                "Reply to ",
                msg.name
              ] }) })
            ] }) })
          ]
        },
        msg.id
      )) })
    ] })
  ] });
};
export {
  AdminInboxScreen
};
