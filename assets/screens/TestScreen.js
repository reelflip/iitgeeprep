import { r as reactExports, j as jsxRuntimeExports, F as FileText } from "../vendor.js";
const TestScreen = ({ user, addTestAttempt, history, availableTests = [] }) => {
  const isParent = user.role === "PARENT";
  const [activeTab, setActiveTab] = reactExports.useState(isParent ? "history" : "practice");
  const [activeTest, setActiveTest] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isParent) setActiveTab("history");
  }, [isParent]);
  if (activeTest) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center bg-white rounded-xl border", children: "Test Engine active..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: isParent ? "Student Scorecards" : "Test Center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 mt-1 opacity-90", children: isParent ? "Viewing verified performance history of your child." : "Challenge yourself with mock exams and track your improvement." })
      ] }),
      !isParent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-white/20 p-1 rounded-xl backdrop-blur-sm border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("practice"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "practice" ? "bg-white text-blue-700" : "text-white hover:bg-white/10"}`, children: "Practice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("history"), className: `px-6 py-2 rounded-lg text-sm font-bold ${activeTab === "history" ? "bg-white text-blue-700" : "text-white hover:bg-white/10"}`, children: "History" })
      ] })
    ] }),
    activeTab === "practice" && !isParent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: availableTests.map((test) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800 mb-2", children: test.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          test.durationMinutes,
          " mins"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          test.questions.length,
          " Questions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTest(test), className: "w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors", children: "Start Mock Test" })
    ] }, test.id)) }),
    activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-slate-200 bg-slate-50 font-bold text-slate-700", children: isParent ? "Official Score History" : "Past Attempts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "No test records found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: isParent ? "Your child hasn't taken any mock tests yet." : "Time to take your first mock test!" })
      ] }) : history.map((attempt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between hover:bg-slate-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 text-sm", children: attempt.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-400 font-bold uppercase mt-1", children: [
            new Date(attempt.date).toLocaleDateString(),
            " • JEE Pattern"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-blue-600", children: [
            attempt.score,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 text-xs font-normal", children: [
              "/",
              attempt.totalMarks
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${attempt.accuracy_percent >= 75 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`, children: [
            attempt.accuracy_percent,
            "% Accuracy"
          ] })
        ] })
      ] }, attempt.id)) })
    ] })
  ] });
};
export {
  TestScreen
};
