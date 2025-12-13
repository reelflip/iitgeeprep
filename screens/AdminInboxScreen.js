import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import Inbox from "../node_modules/lucide-react/dist/esm/icons/inbox.js";
import Search from "../node_modules/lucide-react/dist/esm/icons/search.js";
import RefreshCw from "../node_modules/lucide-react/dist/esm/icons/refresh-cw.js";
import Mail from "../node_modules/lucide-react/dist/esm/icons/mail.js";
import User from "../node_modules/lucide-react/dist/esm/icons/user.js";
import Clock from "../node_modules/lucide-react/dist/esm/icons/clock.js";
import Trash2 from "../node_modules/lucide-react/dist/esm/icons/trash-2.js";
const AdminInboxScreen = () => {
  const [messages, setMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/manage_contact.php");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        setMessages([
          { id: 1, name: "John Doe", email: "john@example.com", subject: "Login Issue", message: "I cannot login to my account. Please help.", created_at: (/* @__PURE__ */ new Date()).toISOString() },
          { id: 2, name: "Jane Smith", email: "jane@test.com", subject: "Feature Request", message: "Can you add a Dark Mode?", created_at: new Date(Date.now() - 864e5).toISOString() }
        ]);
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchMessages();
  }, []);
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this message?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };
  const filteredMessages = messages.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-slate-900 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-6 h-6 mr-2 text-purple-600" }),
          " Inbox"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500", children: "Read inquiries from the Contact Us page." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search messages...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: fetchMessages,
            className: "p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors",
            title: "Refresh",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-5 h-5 ${loading ? "animate-spin" : ""}` })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 animate-spin mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading messages..." })
    ] }) : filteredMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-12 h-12 mb-2 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No messages found." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: filteredMessages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => setExpandedId(expandedId === msg.id ? null : msg.id),
        className: `group p-4 transition-all cursor-pointer hover:bg-slate-50 ${expandedId === msg.id ? "bg-slate-50" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${expandedId === msg.id ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-500"}`, children: msg.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `font-bold text-sm truncate ${expandedId === msg.id ? "text-purple-900" : "text-slate-800"}`, children: msg.subject }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 flex items-center truncate", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 mr-1" }),
                  " ",
                  msg.name,
                  " <",
                  msg.email,
                  ">"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 flex items-center whitespace-nowrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
                new Date(msg.created_at || Date.now()).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => handleDelete(msg.id, e),
                  className: "text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all",
                  title: "Delete",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          expandedId === msg.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pl-14 pr-4 animate-in fade-in slide-in-from-top-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-lg border border-slate-200 shadow-sm", children: msg.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `mailto:${msg.email}?subject=Re: ${msg.subject}`,
                className: "text-xs font-bold text-blue-600 hover:underline flex items-center",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 mr-1" }),
                  " Reply via Email"
                ]
              }
            ) })
          ] })
        ]
      },
      msg.id
    )) }) })
  ] });
};
export {
  AdminInboxScreen
};
