import { j as jsxRuntimeExports, n as Lightbulb, a as Brain, Z as Zap } from "../vendor.js";
const HacksScreen = ({ hacks }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-6 h-6 text-white" }) }),
          "Memory Hacks & Mnemonics"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-50 mt-2 opacity-90 max-w-xl text-sm md:text-base", children: "Master complex formulas and periodic tables using smart acronyms, visualization tricks, and shortcuts. This curated library helps you recall information instantly during exams." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" })
    ] }),
    hacks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center text-slate-400 border border-dashed border-slate-300 rounded-xl bg-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-12 h-12 mx-auto mb-3 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No hacks added by Admin yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Check back later for new shortcuts!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: hacks.map((hack) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-12 h-12 text-amber-500 fill-amber-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded mb-3 border ${hack.tag === "Physics" ? "bg-purple-50 text-purple-700 border-purple-200" : hack.tag === "Chemistry" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: hack.tag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-slate-800 mb-2 leading-tight", children: hack.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-sm leading-relaxed mb-3", children: hack.description }),
      hack.trick && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-3 rounded-lg border border-slate-100 mt-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase block mb-1", children: "The Trick:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-sm font-bold text-blue-600 font-mono", children: hack.trick })
      ] })
    ] }, hack.id)) })
  ] });
};
export {
  HacksScreen
};
