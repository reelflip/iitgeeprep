import { j as jsxRuntimeExports, aw as ChartColumn, a8 as Target, a6 as CircleCheck, aF as ResponsiveContainer, aG as RadialBarChart, aH as RadialBar, aI as Legend, aJ as Tooltip, s as TrendingUp, aK as LineChart, aL as CartesianGrid, aM as XAxis, aN as YAxis, aO as Line, aP as BarChart, aQ as Bar, a5 as TriangleAlert, aR as ListChecks } from "../vendor.js";
import { S as SYLLABUS_DATA } from "../shared-core.js";
const AnalyticsScreen = ({ user, viewingStudentName, progress = {}, testAttempts = [] }) => {
  const subjectStats = ["Physics", "Chemistry", "Maths"].map((subject) => {
    const subjectTopics = SYLLABUS_DATA.filter((t) => t.subject === subject);
    const completedCount = subjectTopics.filter((t) => {
      var _a;
      return ((_a = progress[t.id]) == null ? void 0 : _a.status) === "COMPLETED";
    }).length;
    const totalCount = subjectTopics.length;
    const percentage = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
    return {
      name: subject,
      score: percentage,
      fill: subject === "Physics" ? "#8884d8" : subject === "Chemistry" ? "#82ca9d" : "#ffc658"
    };
  });
  const scoreTrendData = testAttempts.map((attempt) => ({
    date: new Date(attempt.date).toLocaleDateString(void 0, { month: "short", day: "numeric" }),
    score: attempt.score,
    total: attempt.totalMarks
  })).slice(-10);
  const getQuestionVolumeData = () => {
    const volumes = { "Physics": 0, "Chemistry": 0, "Maths": 0 };
    Object.values(progress).forEach((p) => {
      var _a;
      const topic = SYLLABUS_DATA.find((t) => t.id === p.topicId);
      if (topic) {
        const solved = (p.ex1Solved || 0) + (p.ex2Solved || 0) + (p.ex3Solved || 0) + (p.ex4Solved || 0) + (((_a = p.solvedQuestions) == null ? void 0 : _a.length) || 0);
        const subjectKey = topic.subject;
        if (volumes[subjectKey] !== void 0) {
          volumes[subjectKey] += solved;
        }
      }
    });
    return [
      { name: "Physics", questions: volumes["Physics"] },
      { name: "Chemistry", questions: volumes["Chemistry"] },
      { name: "Maths", questions: volumes["Maths"] }
    ];
  };
  const questionVolumeData = getQuestionVolumeData();
  const getWeakAreas = () => {
    const errorCounts = {};
    testAttempts.forEach((attempt) => {
      if (attempt.detailedResults) {
        attempt.detailedResults.forEach((res) => {
          if (res.status === "INCORRECT" || res.status === "UNATTEMPTED") {
            let label = res.subjectId;
            if (res.topicId) {
              const t = SYLLABUS_DATA.find((x) => x.id === res.topicId);
              if (t) label = t.name;
            } else {
              label = res.subjectId === "phys" ? "Physics" : res.subjectId === "chem" ? "Chemistry" : "Maths";
            }
            errorCounts[label] = (errorCounts[label] || 0) + 1;
          }
        });
      }
      if (attempt.topicId && attempt.accuracy_percent < 50) {
        const t = SYLLABUS_DATA.find((x) => x.id === attempt.topicId);
        if (t) {
          errorCounts[t.name] = (errorCounts[t.name] || 0) + 5;
        }
      }
    });
    return Object.entries(errorCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, count]) => ({ name, count }));
  };
  const weakAreas = getWeakAreas();
  const chapterMastery = testAttempts.filter((a) => a.topicId).slice(-5).map((a) => {
    const t = SYLLABUS_DATA.find((x) => x.id === a.topicId);
    return {
      name: t ? t.name : "Unknown",
      score: a.accuracy_percent,
      difficulty: a.difficulty || "MIXED"
    };
  });
  const showDemoData = testAttempts.length === 0;
  const displayTrendData = showDemoData ? [
    { date: "Test 1", score: 120 },
    { date: "Test 2", score: 145 },
    { date: "Test 3", score: 132 },
    { date: "Test 4", score: 160 },
    { date: "Test 5", score: 185 }
  ] : scoreTrendData;
  const displayUserName = viewingStudentName || (user ? user.name.split(" ")[0] : "Student");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-8 h-8 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Performance Analytics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-200 text-lg opacity-90 max-w-2xl", children: "Deep dive into study metrics, question volume, and test score trends." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    viewingStudentName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5 text-blue-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-800 font-bold text-sm", children: [
        "Viewing Report for: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg ml-1", children: viewingStudentName })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 mr-2 text-green-500" }),
          " Syllabus Coverage"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full -ml-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadialBarChart, { cx: "50%", cy: "50%", innerRadius: "10%", outerRadius: "80%", barSize: 20, data: subjectStats, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RadialBar,
            {
              label: { position: "insideStart", fill: "#fff" },
              background: true,
              dataKey: "score"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { iconSize: 10, layout: "vertical", verticalAlign: "middle", wrapperStyle: { right: 0 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 mr-2 text-blue-500" }),
          " Score Trajectory"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: displayTrendData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "score", stroke: "#2563eb", strokeWidth: 3, activeDot: { r: 8 } })
        ] }) }) }),
        showDemoData && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-slate-400 mt-2 italic", children: "Showing demo data. Take a test to see real trends!" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-2 flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 mr-2 text-purple-500" }),
        " Chapter-wise Question Volume"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mb-6", children: "Total problems solved per subject (Exercises 1-4 combined)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "80%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: questionVolumeData, layout: "horizontal", margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { cursor: { fill: "#f8fafc" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "questions", fill: "#8b5cf6", radius: [4, 4, 0, 0], barSize: 50, name: "Questions Solved" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 bg-red-50 border border-red-100 rounded-xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-red-800 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 mr-2" }),
          " Weak Areas"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600 mb-4", children: "Top chapters needing revision based on test errors." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: weakAreas.length > 0 ? weakAreas.map((area, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-lg border border-red-100 flex justify-between items-center shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-700 text-sm", children: area.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold", children: [
            area.count,
            " Issues"
          ] })
        ] }, idx)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-red-400 text-sm", children: "No error data available yet." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 bg-white border border-slate-200 rounded-xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "w-5 h-5 mr-2 text-indigo-600" }),
          " Recent Chapter Tests"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: chapterMastery.length > 0 ? chapterMastery.map((test, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-700 text-sm truncate w-32", children: test.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 uppercase", children: test.difficulty })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `block font-bold ${test.score > 80 ? "text-green-600" : test.score > 50 ? "text-yellow-600" : "text-red-600"}`, children: [
              test.score,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "Score" })
          ] })
        ] }, idx)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 text-center py-4", children: "No chapter tests taken recently." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-8 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-32 h-32" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg mb-4 flex items-center gap-2 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-500 p-1 rounded text-xs", children: "AI" }),
          " Smart Insights"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 relative z-10 text-sm text-indigo-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "• ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Consistency:" }),
            " ",
            displayUserName,
            "'s test frequency is ",
            testAttempts.length > 2 ? "good" : "low",
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "• ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Syllabus Pace:" }),
            " Based on current completion rate, ensure Mechanics is finished by next month."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "• ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Revision Alert:" }),
            " Regular revision cycles are key. Check the Revision tab for pending topics."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-indigo-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "italic text-xs opacity-75", children: `"Success doesn't come from what you do occasionally, it comes from what you do consistently."` }) })
        ] })
      ] })
    ] })
  ] });
};
export {
  AnalyticsScreen
};
