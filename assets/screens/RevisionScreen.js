import { j as jsxRuntimeExports, R as RotateCw, H as HelpCircle, A as AlertCircle, aZ as Clock, a6 as CheckCircle2, h as Calendar } from "../vendor.js";
import { S as SYLLABUS_DATA, f as formatDate } from "../shared-core.js";
const RevisionScreen = ({ progress, handleRevisionComplete }) => {
  const now = /* @__PURE__ */ new Date();
  const dueTopics = Object.entries(progress).filter(([_, p]) => p.status === "COMPLETED" && p.nextRevisionDate && new Date(p.nextRevisionDate) <= now).map(([id, p]) => {
    const topic = SYLLABUS_DATA.find((t) => t.id === id);
    return { topic, progress: p };
  }).filter((item) => item.topic !== void 0);
  const upcomingTopics = Object.entries(progress).filter(([_, p]) => p.status === "COMPLETED" && p.nextRevisionDate && new Date(p.nextRevisionDate) > now).sort((a, b) => new Date(a[1].nextRevisionDate).getTime() - new Date(b[1].nextRevisionDate).getTime()).slice(0, 5).map(([id, p]) => {
    const topic = SYLLABUS_DATA.find((t) => t.id === id);
    return { topic, progress: p };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-6 h-6 text-white" }) }),
          "Smart Revision Manager"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-50 opacity-90 max-w-xl text-sm md:text-base leading-relaxed", children: [
          'Beat the "Forgetting Curve" using the ',
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1-7-30 Spaced Repetition Rule" }),
          ". We automatically schedule reviews to move concepts from short-term to long-term memory."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-white text-sm mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HelpCircle, { className: "w-4 h-4 text-yellow-300" }),
            " How to use this tab:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-blue-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Mark a topic as ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "Completed" }),
                " in the Syllabus Tracker."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The system automatically adds it here when due (Day 1, Day 7, Day 30)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Revise the topic, then click ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "Mark Done" }),
                " to schedule the next review."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 text-red-500" }),
            "Due Today"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full", children: [
            dueTopics.length,
            " Pending"
          ] })
        ] }),
        dueTopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-3xl", children: "🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-green-900 text-lg", children: "All caught up!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-700 text-sm mt-1", children: "No revisions pending for today. Go learn something new!" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dueTopics.map(({ topic, progress: progress2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-xl border border-red-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-red-200 transition-all group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${topic.subject === "Physics" ? "bg-purple-50 text-purple-700 border-purple-200" : topic.subject === "Chemistry" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: topic.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded", children: [
                "Level ",
                progress2.revisionLevel
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 text-base", children: topic.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 mt-1 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              " Last reviewed: ",
              formatDate(progress2.lastRevised)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => handleRevisionComplete(topic.id),
              className: "w-full sm:w-auto bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 hover:text-red-700 transition-colors flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }),
                " Mark Done"
              ]
            }
          )
        ] }, topic.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-blue-500" }),
          "Upcoming Schedule"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 min-h-[200px]", children: [
          upcomingTopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic", children: "Complete more topics in the Syllabus tab to populate your revision schedule." }) }) : upcomingTopics.map(({ topic, progress: progress2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center opacity-90 hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1", children: topic.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-slate-700 text-sm", children: topic.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-blue-600", children: formatDate(progress2.nextRevisionDate) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "Due Date" })
            ] })
          ] }, topic.id)),
          upcomingTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-slate-400 mt-2", children: "Showing next 5 scheduled items" })
        ] })
      ] })
    ] })
  ] });
};
export {
  RevisionScreen
};
