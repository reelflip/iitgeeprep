import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import { Button } from "../components/Button.js";
import { PageHeader } from "../components/PageHeader.js";
import Filter from "../node_modules/lucide-react/dist/esm/icons/filter.js";
import Clock from "../node_modules/lucide-react/dist/esm/icons/clock.js";
import PlayCircle from "../node_modules/lucide-react/dist/esm/icons/play-circle.js";
import FileText from "../node_modules/lucide-react/dist/esm/icons/file-text.js";
const TestScreen = ({ user, addTestAttempt, history, availableTests = [] }) => {
  const isParent = (user == null ? void 0 : user.role) === "PARENT";
  const [activeTab, setActiveTab] = reactExports.useState("practice");
  const [activeTest, setActiveTest] = reactExports.useState(null);
  const [showAllTests, setShowAllTests] = reactExports.useState(false);
  const [isManualEntry, setIsManualEntry] = reactExports.useState(false);
  const [manualForm, setManualForm] = reactExports.useState({ title: "", score: "", totalMarks: "300" });
  reactExports.useEffect(() => {
    if (isParent) {
      setActiveTab("history");
    } else if (history.length === 0) {
      setActiveTab("practice");
    }
  }, [history.length, isParent]);
  const handleManualSubmit = (e) => {
    e.preventDefault();
    const scoreVal = parseInt(manualForm.score) || 0;
    const totalVal = parseInt(manualForm.totalMarks) || 300;
    const accuracyVal = totalVal > 0 ? Math.round(scoreVal / totalVal * 100) : 0;
    const attempt = {
      id: Date.now().toString(),
      date: (/* @__PURE__ */ new Date()).toISOString(),
      title: manualForm.title || "Untitled Mock Test",
      score: scoreVal,
      totalMarks: totalVal,
      accuracy: accuracyVal,
      mistakes: [],
      testId: "manual_" + Date.now(),
      totalQuestions: 0,
      correctCount: 0,
      incorrectCount: 0,
      unattemptedCount: 0,
      accuracy_percent: accuracyVal
    };
    addTestAttempt(attempt);
    setIsManualEntry(false);
    setManualForm({ title: "", score: "", totalMarks: "300" });
    setActiveTab("history");
  };
  const filteredTests = reactExports.useMemo(() => {
    if (showAllTests || !user) return availableTests;
    const target = user.targetExam || "JEE Main & Advanced";
    return availableTests.filter((test) => {
      if (target.includes("JEE") && test.examType === "JEE") return true;
      if (target.includes("BITSAT") && test.examType === "BITSAT") return true;
      if (target.includes("VITEEE") && test.examType === "VITEEE") return true;
      if (target.includes("MHT-CET") && test.examType === "OTHER") return true;
      return false;
    });
  }, [availableTests, user, showAllTests]);
  const displayTests = filteredTests.length > 0 ? filteredTests : showAllTests ? [] : availableTests;
  if (activeTest) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActiveTestSession,
      {
        test: activeTest,
        onFinish: (result) => {
          addTestAttempt(result);
          setActiveTest(null);
          setActiveTab("history");
        },
        onCancel: () => setActiveTest(null)
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: isParent ? "Student Test Records" : "Test Center",
        subtitle: isParent ? "Detailed history of mock tests taken by the student." : "Attempt new mock tests or analyze your past performance.",
        action: !isParent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-100 p-1 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("practice"), className: `px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === "practice" ? "bg-white text-blue-600 shadow" : "text-slate-500"}`, children: "Practice Zone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("history"), className: `px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === "history" ? "bg-white text-blue-600 shadow" : "text-slate-500"}`, children: "History" })
        ] })
      }
    ),
    activeTab === "practice" && !isParent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-4 h-4 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-blue-800 uppercase tracking-wide", children: [
            "Showing: ",
            showAllTests ? "All Available Tests" : `Recommended for ${(user == null ? void 0 : user.targetExam) || "You"}`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${!showAllTests ? "text-slate-400" : "text-blue-600"}`, children: "All" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowAllTests(!showAllTests),
              className: `w-10 h-5 rounded-full p-1 transition-colors ${!showAllTests ? "bg-blue-600" : "bg-slate-300"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${!showAllTests ? "translate-x-5" : "translate-x-0"}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${!showAllTests ? "text-blue-600" : "text-slate-400"}`, children: "Recommended" })
        ] })
      ] }),
      displayTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 font-medium", children: "No matching tests found for your target exam." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowAllTests(true), className: "text-xs text-blue-600 font-bold mt-2 hover:underline", children: "Show all available tests" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: displayTests.map((test) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200", children: test.examType || "GENERIC" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase font-bold px-2 py-1 rounded border ${test.difficulty === "ADVANCED" ? "bg-red-50 text-red-700 border-red-100" : test.difficulty === "MAINS" ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-slate-50 text-slate-700 border-slate-100"}`, children: test.difficulty })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-slate-800 leading-tight", children: test.title })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-slate-500 mb-6 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14, className: "mr-1" }),
            " ",
            test.durationMinutes,
            " mins"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            test.questions.length,
            " Questions"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setActiveTest(test), className: "w-full group-hover:bg-blue-700", children: [
          "Start Test ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlayCircle, { size: 16, className: "ml-2 group-hover:translate-x-1 transition-transform" })
        ] })
      ] }, test.id)) })
    ] }),
    activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      !isManualEntry && !isParent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setIsManualEntry(true), children: "+ Log Manual Result" }) }),
      isManualEntry && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-6 rounded-xl border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 mb-4", children: "Log External Test Result" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleManualSubmit, className: "flex flex-col md:flex-row gap-4 items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: manualForm.title, onChange: (e) => setManualForm({ ...manualForm, title: e.target.value }), className: "w-full p-2 border rounded", placeholder: "e.g. Allen Major Test 1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", value: manualForm.score, onChange: (e) => setManualForm({ ...manualForm, score: e.target.value }), className: "w-full p-2 border rounded" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", value: manualForm.totalMarks, onChange: (e) => setManualForm({ ...manualForm, totalMarks: e.target.value }), className: "w-full p-2 border rounded" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "flex-1 md:flex-none", children: "Save" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setIsManualEntry(false), className: "flex-1 md:flex-none", children: "Cancel" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        history.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-slate-300" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 font-medium", children: "No test history found." }),
          isParent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Once the student attempts a test, results will appear here." })
        ] }),
        [...history].reverse().map((attempt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-all gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg text-slate-800", children: attempt.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-slate-500 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "📅 ",
                new Date(attempt.date).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                attempt.totalQuestions || 0,
                " Questions"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-slate-400 uppercase tracking-wider", children: "Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-black text-slate-800", children: [
                attempt.score,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-slate-400", children: [
                  "/",
                  attempt.totalMarks
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-slate-400 uppercase tracking-wider", children: "Accuracy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-lg font-bold ${attempt.accuracy_percent > 80 ? "text-green-600" : attempt.accuracy_percent > 50 ? "text-yellow-600" : "text-red-600"}`, children: [
                attempt.accuracy_percent,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-px bg-slate-200 hidden md:block" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-slate-400 uppercase tracking-wider", children: "Mistakes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-red-500", children: attempt.incorrectCount })
            ] })
          ] })
        ] }, attempt.id))
      ] })
    ] })
  ] });
};
const ActiveTestSession = ({ test, onFinish, onCancel }) => {
  const [timeLeft, setTimeLeft] = reactExports.useState(test.durationMinutes * 60);
  const [answers, setAnswers] = reactExports.useState({});
  const [currentQ, setCurrentQ] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const handleSubmit = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    const detailedResults = [];
    test.questions.forEach((q) => {
      const ans = answers[q.id];
      let status = "UNATTEMPTED";
      if (ans === void 0) {
        unattempted++;
      } else if (ans === q.correctOptionIndex) {
        score += 4;
        correct++;
        status = "CORRECT";
      } else {
        score -= 1;
        incorrect++;
        status = "INCORRECT";
      }
      detailedResults.push({
        questionId: q.id,
        subjectId: q.subjectId,
        topicId: q.topicId,
        status,
        selectedOptionIndex: ans
      });
    });
    const totalQs = test.questions.length;
    const attempt = {
      id: Date.now().toString(),
      testId: test.id,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      title: test.title,
      score,
      totalMarks: totalQs * 4,
      accuracy: 0,
      // Legacy field
      accuracy_percent: correct + incorrect > 0 ? Number((correct / (correct + incorrect) * 100).toFixed(2)) : 0,
      totalQuestions: totalQs,
      correctCount: correct,
      incorrectCount: incorrect,
      unattemptedCount: unattempted,
      detailedResults
    };
    onFinish(attempt);
  };
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const question = test.questions[currentQ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)] md:h-[600px] mt-0 md:mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm md:text-base", children: test.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
          "Question ",
          currentQ + 1,
          " / ",
          test.questions.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-mono text-lg font-bold ${timeLeft < 300 ? "text-red-400 animate-pulse" : ""}`, children: formatTime(timeLeft) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 md:p-8 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block", children: question.subjectId }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg font-medium text-slate-800 mb-8", children: question.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: question.options.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => setAnswers((prev) => ({ ...prev, [question.id]: idx })),
          className: `p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center ${answers[question.id] === idx ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-100 hover:border-slate-300"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center text-xs shrink-0 ${answers[question.id] === idx ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300"}`, children: String.fromCharCode(65 + idx) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm md:text-base", children: opt })
          ]
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t bg-slate-50 flex justify-between items-center sticky bottom-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          onClick: () => setCurrentQ((prev) => Math.max(0, prev - 1)),
          disabled: currentQ === 0,
          size: "sm",
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onCancel, className: "text-red-500 hover:text-red-600 hover:bg-red-50", size: "sm", children: "Quit" }),
        currentQ < test.questions.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setCurrentQ((prev) => prev + 1), size: "sm", children: "Next" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSubmit, className: "bg-green-600 hover:bg-green-700", size: "sm", children: "Submit Test" })
      ] })
    ] })
  ] });
};
export {
  TestScreen
};
