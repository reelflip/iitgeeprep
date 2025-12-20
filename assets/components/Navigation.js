import { j as jsxRuntimeExports, f as LogOut, r as reactExports, E as Ellipsis, X, g as LayoutDashboard, c as BookOpen, B as Bot, F as FileText, a as Brain, T as Timer, h as ChartNoAxesColumn, i as Calendar, R as RotateCw, k as CircleAlert, l as Layers, m as ListTodo, n as Lightbulb, H as Heart, U as User, o as Users, p as Settings, I as Inbox, P as PenTool, A as Activity, q as CloudUpload } from "../vendor.js";
const STUDENT_MENU = [
  { id: "dashboard", icon: LayoutDashboard, label: "Home" },
  { id: "syllabus", icon: BookOpen, label: "Syllabus" },
  { id: "ai-tutor", icon: Bot, label: "AI Tutor" },
  { id: "tests", icon: FileText, label: "Tests" },
  { id: "psychometric", icon: Brain, label: "Psychometric Test" },
  { id: "focus", icon: Timer, label: "Focus" },
  { id: "analytics", icon: ChartNoAxesColumn, label: "Analytics" },
  { id: "timetable", icon: Calendar, label: "Timetable" },
  { id: "revision", icon: RotateCw, label: "Revision" },
  { id: "mistakes", icon: CircleAlert, label: "Mistakes" },
  { id: "flashcards", icon: Layers, label: "Cards" },
  { id: "backlogs", icon: ListTodo, label: "Backlogs" },
  { id: "hacks", icon: Lightbulb, label: "Hacks" },
  { id: "wellness", icon: Heart, label: "Wellness" },
  { id: "profile", icon: User, label: "Profile" }
];
const ADMIN_MENU = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "users", icon: Users, label: "Users" },
  { id: "inbox", icon: Inbox, label: "Inbox" },
  { id: "syllabus_admin", icon: BookOpen, label: "Syllabus" },
  { id: "tests", icon: FileText, label: "Tests" },
  { id: "content", icon: Layers, label: "Content" },
  { id: "blog_admin", icon: PenTool, label: "Blog" },
  { id: "analytics", icon: ChartNoAxesColumn, label: "Analytics" },
  { id: "diagnostics", icon: Activity, label: "Diagnostics" },
  { id: "system", icon: Settings, label: "System" },
  { id: "deployment", icon: CloudUpload, label: "Deploy" }
];
const ADMIN_EXECUTIVE_MENU = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "inbox", icon: Inbox, label: "Inbox" },
  { id: "syllabus_admin", icon: BookOpen, label: "Syllabus" },
  { id: "tests", icon: FileText, label: "Tests" },
  { id: "content", icon: Layers, label: "Content" },
  { id: "blog_admin", icon: PenTool, label: "Blog" },
  { id: "analytics", icon: ChartNoAxesColumn, label: "Analytics" },
  { id: "diagnostics", icon: Activity, label: "Diagnostics" },
  { id: "profile", icon: User, label: "Profile" }
];
const PARENT_MENU = [
  { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
  { id: "family", icon: Users, label: "Family" },
  { id: "analytics", icon: ChartNoAxesColumn, label: "Performance" },
  { id: "tests", icon: FileText, label: "Results" },
  { id: "profile", icon: Settings, label: "Settings" }
];
const getMenu = (role) => {
  switch (role) {
    case "ADMIN":
      return ADMIN_MENU;
    case "ADMIN_EXECUTIVE":
      return ADMIN_EXECUTIVE_MENU;
    case "PARENT":
      return PARENT_MENU;
    default:
      return STUDENT_MENU;
  }
};
const NavItem = ({ id, icon: Icon, label, isActive, onClick, hasNotification }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "button",
  {
    onClick,
    className: `w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative group ${isActive ? "bg-gradient-to-r from-blue-600/10 to-transparent border-l-4 border-blue-500 text-blue-400" : "border-l-4 border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 transition-transform ${isActive ? "scale-110" : "group-hover:scale-105"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide", children: label }),
      hasNotification && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-4 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" })
    ]
  }
);
const Navigation = ({ currentScreen, setScreen, logout, user }) => {
  const hasNotifications = (user == null ? void 0 : user.notifications) && user.notifications.length > 0;
  const menuItems = getMenu(user == null ? void 0 : user.role);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64 bg-[#0f172a] h-screen flex flex-col fixed left-0 top-0 z-20 hidden md:flex overflow-y-auto custom-scrollbar shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-white tracking-tight flex items-center gap-2", children: [
        "IIT",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "JEE" }),
        "Prep"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1.5 py-0.5 bg-slate-800 rounded", children: (user == null ? void 0 : user.role) || "STUDENT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-600", children: "• v12.41" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 pb-4", children: menuItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      NavItem,
      {
        id: item.id,
        icon: item.icon,
        label: item.label,
        isActive: currentScreen === item.id,
        onClick: () => setScreen(item.id),
        hasNotification: item.id === "profile" && hasNotifications
      },
      item.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-slate-800/50 bg-slate-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: logout,
        className: "w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-bold transition-all hover:shadow-inner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          " Sign Out"
        ]
      }
    ) })
  ] });
};
const MobileNavigation = ({ currentScreen, setScreen, logout, user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = reactExports.useState(false);
  const menuItems = getMenu(user == null ? void 0 : user.role);
  const showMore = menuItems.length > 4;
  const primaryCount = showMore ? 4 : 5;
  const primaryItems = menuItems.slice(0, primaryCount);
  const secondaryItems = menuItems.slice(primaryCount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 z-[50] flex justify-around items-end safe-area-pb shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]", children: [
      primaryItems.map((item) => {
        const isActive = currentScreen === item.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setScreen(item.id);
              setIsDrawerOpen(false);
            },
            className: `flex-1 flex flex-col items-center justify-center pt-3 pb-2 transition-all active:scale-95 touch-manipulation group relative ${isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`,
            children: [
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 w-8 h-0.5 bg-blue-500 rounded-b-full shadow-[0_2px_8px_rgba(59,130,246,0.6)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative p-1.5 rounded-2xl transition-all duration-300 ${isActive ? "bg-blue-50 -translate-y-1" : ""}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `w-6 h-6 ${isActive ? "stroke-[2.5px] drop-shadow-sm" : "stroke-[1.5px]"}` }),
                item.id === "profile" && (user == null ? void 0 : user.notifications) && user.notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold mt-0.5 max-w-[64px] truncate transition-colors ${isActive ? "text-blue-700" : "text-slate-400"}`, children: item.label })
            ]
          },
          item.id
        );
      }),
      showMore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setIsDrawerOpen(true),
          className: `flex-1 flex flex-col items-center justify-center pt-3 pb-2 transition-all active:scale-95 touch-manipulation ${isDrawerOpen || secondaryItems.some((i) => i.id === currentScreen) ? "text-blue-600" : "text-slate-400"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative p-1.5 rounded-2xl ${isDrawerOpen ? "bg-blue-50 -translate-y-1" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-6 h-6 stroke-[1.5]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold mt-0.5", children: "More" })
          ]
        }
      )
    ] }),
    isDrawerOpen && secondaryItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[60] flex flex-col justify-end md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity", onClick: () => setIsDrawerOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-t-[2rem] p-6 relative z-10 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-10 shadow-2xl safe-area-pb ring-1 ring-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6 px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 tracking-tight", children: "All Features" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsDrawerOpen(false), className: "p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-4 mb-8", children: secondaryItems.map((item) => {
          const isActive = currentScreen === item.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                setScreen(item.id);
                setIsDrawerOpen(false);
              },
              className: `flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-90 touch-manipulation aspect-square shadow-sm ${isActive ? "bg-blue-600 border-blue-600 text-white shadow-blue-200" : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-7 h-7 mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-center leading-tight line-clamp-2", children: item.label })
              ]
            },
            item.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-100 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: logout,
            className: "w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold active:scale-95 transition-transform hover:bg-red-100 border border-red-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" }),
              " Sign Out"
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
export {
  MobileNavigation as M,
  Navigation as N
};
