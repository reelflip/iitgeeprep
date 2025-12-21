import { j as jsxRuntimeExports, l as Layers, o as Users, c as BookOpen, F as FileText, a4 as Server, a5 as ArrowRight } from "../vendor.js";
import { S as StatCard } from "../components/StatCard.js";
const AdminDashboardScreen = ({ user, onNavigate, messageCount = 0 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0f172a] rounded-xl p-8 text-white relative overflow-hidden shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 100", preserveAspectRatio: "none", className: "h-full w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,50 L20,50 L30,20 L50,80 L70,50 L200,50", fill: "none", stroke: "white", strokeWidth: "2" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold mb-2", children: "Admin Command Center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm md:text-base", children: "Welcome back, Administrator. System is operational." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Users",
          value: "5",
          subValue: "Registered Students & Parents",
          color: "blue",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }) }),
          onClick: () => onNavigate && onNavigate("users")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Messages",
          value: messageCount.toString(),
          subValue: "Contact Form Inquiries",
          color: "purple",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
          onClick: () => onNavigate && onNavigate("inbox")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Content",
          value: "Manage",
          subValue: "Tests, Quotes & Broadcasts",
          color: "green",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }),
          onClick: () => onNavigate && onNavigate("content")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-xl border border-slate-200 shadow-sm h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6 text-slate-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800", children: "Admin Features & Capabilities" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-blue-700 font-bold text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 }),
              " User Management"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "View registered users, verify accounts, and manage roles." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-purple-200 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-purple-700 font-bold text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16 }),
              " Syllabus & Videos"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Manage syllabus topics, attach chapter notes, and video lessons." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-green-200 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-green-700 font-bold text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }),
              " Content Manager"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Update Flashcards, Memory Hacks, and publish Blog posts." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-orange-200 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-orange-700 font-bold text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { size: 16 }),
              " System Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Configure OAuth, Analytics, and AI Tutor parameters." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-slate-600", children: "🗄️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800", children: "System Documentation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 mb-6 text-sm", children: "Access SQL schemas, PHP API files, and deployment guides for Hostinger. Use the System section to verify database connectivity and download the latest build artifacts." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onNavigate && onNavigate("system"),
            className: "w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2",
            children: [
              "Open System Center ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
            ]
          }
        )
      ] })
    ] })
  ] });
};
export {
  AdminDashboardScreen
};
