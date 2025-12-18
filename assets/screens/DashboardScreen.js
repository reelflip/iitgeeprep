import { r as reactExports, j as jsxRuntimeExports, m as Users, as as ArrowRight, ab as Clock, a4 as Target, a$ as Trophy, A as AlertCircle } from "../vendor.js";
import { S as SYLLABUS_DATA } from "../shared-core.js";
const DashboardScreen = ({ user, viewingStudentName, progress, testAttempts, goals, toggleGoal, addGoal, setScreen }) => {
  const [newGoalText, setNewGoalText] = reactExports.useState("");
  const totalTopics = SYLLABUS_DATA.length;
  const completedTopics = Object.values(progress).filter((p) => p.status === "COMPLETED").length;
  const progressPercent = Math.round(completedTopics / totalTopics * 100);
  const today = /* @__PURE__ */ new Date();
  const examDate = new Date(today.getFullYear() + 1, 0, 24);
  const diffTime = Math.abs(examDate.getTime() - today.getTime());
  const daysRemaining = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  const recentTest = testAttempts.length > 0 ? testAttempts[testAttempts.length - 1] : null;
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      addGoal(newGoalText);
      setNewGoalText("");
    }
  };
  if (user.role === "PARENT" && !user.linkedStudentId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-4", children: "Welcome to Parent Portal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 max-w-xl text-lg leading-relaxed", children: "Monitor your child's JEE preparation journey with real-time analytics, mock test scores, and psychometric insights." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-blue-200 p-10 text-center shadow-lg max-w-2xl mx-auto mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-2", children: "Connect with your Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mb-8 max-w-md mx-auto", children: "To see preparation data, you must link your account with your child's 6-digit Student ID." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setScreen("family"),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center mx-auto gap-2 group",
            children: [
              "Find Student ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
            ]
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: viewingStudentName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-blue-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Tracking: ",
              viewingStudentName
            ] })
          ] }) : `Hello, ${user.name.split(" ")[0]}! 👋` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-100 italic text-sm md:text-base max-w-xl", children: [
            viewingStudentName ? "Monitoring progress across Physics, Chemistry, and Maths for the upcoming JEE exam." : '"Success is the sum of small efforts, repeated day in and day out."',
            !viewingStudentName && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            !viewingStudentName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-75 font-semibold not-italic mt-1 block", children: "- ROBERT COLLIER" })
          ] })
        ] }),
        !viewingStudentName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🔥" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "12 Day Streak" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-500 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold uppercase tracking-wider", children: [
              "Target: JEE ",
              today.getFullYear() + 1
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-5xl font-bold text-slate-800", children: [
              "-",
              daysRemaining
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-500", children: "Days Remaining" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 rounded-full h-2 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-500 h-2 rounded-full w-2/3" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-500 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: "Syllabus" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-bold text-slate-800", children: [
            progressPercent,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Overall Completion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setScreen("syllabus"),
              className: "text-blue-600 text-xs font-bold mt-3 hover:underline",
              children: user.role === "PARENT" ? "Review Progress →" : "View Tracker →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full relative bg-slate-100", style: { background: `conic-gradient(#3b82f6 ${progressPercent}%, #f1f5f9 0)` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 bg-white rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "DONE" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-500 mb-4 w-full justify-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: "Recent Test" })
        ] }),
        recentTest ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800 truncate", children: recentTest.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-3xl font-bold text-blue-600", children: [
            recentTest.score,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-slate-400", children: [
              "/",
              recentTest.totalMarks
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded inline-block", children: [
            recentTest.accuracy_percent,
            "% Accuracy"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-3", children: "No tests taken yet." }),
          !viewingStudentName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setScreen("tests"),
              className: "text-blue-600 font-bold text-sm hover:underline",
              children: "Go to Test Center"
            }
          )
        ] })
      ] })
    ] }),
    !viewingStudentName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-100 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl text-blue-600", children: "🎯" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-700 uppercase tracking-wider text-sm", children: "Today's Goals" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-400", children: [
          goals.filter((g) => g.completed).length,
          "/",
          goals.length
        ] })
      ] }),
      goals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm italic mb-4", children: "No goals set for today." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: goals.map((goal) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => toggleGoal(goal.id),
            className: `w-5 h-5 rounded border flex items-center justify-center transition-colors ${goal.completed ? "bg-blue-500 border-blue-500 text-white" : "border-slate-300 text-transparent hover:border-blue-400"}`,
            children: "✓"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm ${goal.completed ? "text-slate-400 line-through" : "text-slate-700"}`, children: goal.text })
      ] }, goal.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddGoal, className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Add new goal...",
            className: "flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none",
            value: newGoalText,
            onChange: (e) => setNewGoalText(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-lg font-bold hover:bg-blue-100 transition",
            children: "+"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-900 rounded-xl p-6 text-white shadow-lg flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold mb-1", children: "Student Performance Insights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm", children: "Review subject-wise readiness and psychometric analysis." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setScreen("family"),
          className: "bg-white text-blue-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors",
          children: "Analyze Readiness"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 p-6 rounded-xl border border-yellow-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 text-orange-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-yellow-800 text-sm", children: viewingStudentName ? "System Observations" : "Notice Board" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-yellow-700 italic", children: "No important notifications at the moment." })
    ] })
  ] });
};
export {
  DashboardScreen
};
