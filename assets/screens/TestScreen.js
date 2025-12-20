import { r as reactExports, j as jsxRuntimeExports, A as AlertCircle, X, ae as Clock, L as Loader2, b as Send, d as ChevronLeft, e as ChevronRight, F as FileText, a7 as Target, bk as PlayCircle, b2 as Trophy, bl as RotateCcw } from "../vendor.js";
const TestScreen = ({ user, addTestAttempt, history, availableTests = [] }) => {
  const isParent = user.role === "PARENT";
  const [activeTab, setActiveTab] = reactExports.useState(isParent ? "history" : "practice");
  const [runningTest, setRunningTest] = reactExports.useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = reactExports.useState(0);
  const [userAnswers, setUserAnswers] = reactExports.useState({});
  const [timeLeft, setTimeLeft] = reactExports.useState(0);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [testStartTime, setTestStartTime] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (isParent) setActiveTab("history");
  }, [isParent]);
  const handleSubmit = reactExports.useCallback(async (isAuto = false) => {
    if (!runningTest) return;
    if (!isAuto && Object.keys(userAnswers).length < runningTest.questions.length) {
      if (!confirm(`You have only answered ${Object.keys(userAnswers).length} out of ${runningTest.questions.length} questions. Submit anyway?`)) return;
    }
    setIsSubmitting(true);
    const questions = runningTest.questions;
    const results = questions.map((q) => ({
      questionId: q.id,
      subjectId: q.subjectId,
      topicId: q.topicId,
      status: userAnswers[q.id] === void 0 ? "UNATTEMPTED" : userAnswers[q.id] === q.correctOptionIndex ? "CORRECT" : "INCORRECT",
      selectedOptionIndex: userAnswers[q.id]
    }));
    const correctCount = results.filter((r) => r.status === "CORRECT").length;
    const incorrectCount = results.filter((r) => r.status === "INCORRECT").length;
    const unattemptedCount = results.filter((r) => r.status === "UNATTEMPTED").length;
    const score = correctCount * 4 - incorrectCount * 1;
    const totalMarks = questions.length * 4;
    const accuracy = Math.round(correctCount / (correctCount + incorrectCount || 1) * 100);
    const timeTaken = Math.floor((Date.now() - testStartTime) / 1e3);
    const attempt = {
      id: `att_${Date.now()}`,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      title: runningTest.title,
      score,
      totalMarks,
      accuracy,
      accuracy_percent: accuracy,
      testId: runningTest.id,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unattemptedCount,
      detailedResults: results,
      timeTakenSeconds: timeTaken
    };
    try {
      await addTestAttempt(attempt);
      setIsSubmitting(false);
      setRunningTest(null);
      setActiveTab("history");
      alert(`Mock Test Submitted!
Score: ${score}/${totalMarks}
Accuracy: ${accuracy}%`);
    } catch (e) {
      alert("Submission failed. Please check your internet connection.");
      setIsSubmitting(false);
    }
  }, [runningTest, userAnswers, testStartTime, addTestAttempt]);
  reactExports.useEffect(() => {
    let interval;
    if (runningTest && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      }), 1e3);
    }
    return () => clearInterval(interval);
  }, [runningTest, timeLeft, handleSubmit]);
  const startTest = (test) => {
    if (!test.questions || test.questions.length === 0) {
      alert("This test has no questions available. Please select another.");
      return;
    }
    setRunningTest(test);
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setTimeLeft(test.durationMinutes * 60);
    setTestStartTime(Date.now());
  };
  const handleExit = () => {
    if (confirm("Are you sure you want to exit? Your progress will be lost and no result will be saved.")) {
      setRunningTest(null);
    }
  };
  const handleSelectOption = (qId, idx) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: idx
    }));
  };
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  if (runningTest) {
    const questions = runningTest.questions;
    if (!questions || questions.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-16 h-16 text-red-500 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Engine Initialization Error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mt-2", children: "No valid questions found for this test." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleExit, className: "mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold", children: "Back to Menu" })
      ] });
    }
    const currentQ = questions[currentQuestionIdx];
    const progress = (currentQuestionIdx + 1) / questions.length * 100;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-xl shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleExit, className: "p-2 hover:bg-white/10 rounded-lg text-white", title: "Exit Test", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-slate-700 mx-1 hidden md:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold truncate max-w-xs md:max-w-md", children: runningTest.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-[10px] font-bold text-slate-400 uppercase", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                questions.length,
                " Questions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "JEE Standard" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 px-6 py-2 rounded-xl border transition-colors ${timeLeft < 300 ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" : "bg-slate-800 border-slate-700 text-blue-400"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-black", children: formatTime(timeLeft) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mr-4 hidden md:block", children: "Navigation:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest", children: "Active Test Engine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-slate-500", children: [
          "Progress: ",
          currentQuestionIdx + 1,
          " / ",
          questions.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-200 h-1.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-blue-500 transition-all duration-300", style: { width: `${progress}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col md:flex-row overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 md:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-8 pb-32", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-4 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-500 uppercase", children: [
              "Question ",
              currentQuestionIdx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-3 py-1 rounded text-[10px] font-black uppercase ${currentQ.difficulty === "HARD" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`, children: currentQ.difficulty || "MEDIUM" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl md:text-2xl text-slate-800 font-bold leading-relaxed", children: currentQ.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: currentQ.options.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => handleSelectOption(currentQ.id, idx),
              className: `p-5 rounded-2xl border-2 text-left transition-all group flex items-center gap-4 ${userAnswers[currentQ.id] === idx ? "border-blue-600 bg-blue-50 ring-4 ring-blue-500/10" : "border-slate-100 hover:border-blue-200 bg-white hover:bg-slate-50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 rounded-full border-2 flex items-center justify-center font-black transition-colors ${userAnswers[currentQ.id] === idx ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-400 group-hover:border-blue-400 group-hover:text-blue-600"}`, children: String.fromCharCode(65 + idx) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-lg ${userAnswers[currentQ.id] === idx ? "text-blue-900 font-bold" : "text-slate-600 font-medium"}`, children: opt })
              ]
            },
            idx
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex w-80 bg-white border-l border-slate-200 p-6 flex-col overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-slate-400 text-[10px] uppercase tracking-widest mb-6", children: "Question Palette" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: questions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setCurrentQuestionIdx(idx),
              className: `h-10 w-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center border-2 ${currentQuestionIdx === idx ? "border-blue-600 bg-blue-600 text-white shadow-lg" : userAnswers[q.id] !== void 0 ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-slate-50 border-slate-100 text-slate-400"}`,
              children: idx + 1
            },
            q.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto space-y-4 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Answered" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600", children: Object.keys(userAnswers).length })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: questions.length - Object.keys(userAnswers).length })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => handleSubmit(),
                disabled: isSubmitting,
                className: "w-full bg-slate-900 text-white py-4 rounded-xl font-black shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50",
                children: [
                  isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 18 }),
                  " Finish Test"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleExit, className: "w-full text-slate-400 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors", children: "Discard & Exit" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden bg-white border-t border-slate-200 p-4 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] safe-area-pb", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: currentQuestionIdx === 0,
            onClick: () => setCurrentQuestionIdx((prev) => prev - 1),
            className: "flex-1 py-4 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-500 disabled:opacity-30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleSubmit(),
            disabled: isSubmitting,
            className: "flex-[2] bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-2",
            children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin w-4 h-4" }) : "Submit"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: currentQuestionIdx === questions.length - 1,
            onClick: () => setCurrentQuestionIdx((prev) => prev + 1),
            className: "flex-1 py-4 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-500 disabled:opacity-30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {})
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: isParent ? "Student Performance" : "Mock Test Center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 mt-1 opacity-90", children: isParent ? "Viewing performance history of your child." : "Challenge yourself with exam-pattern mock tests." })
      ] }),
      !isParent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-white/20 p-1 rounded-xl backdrop-blur-sm border border-white/10 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("practice"), className: `px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "practice" ? "bg-white text-blue-700 shadow-lg" : "text-white hover:bg-white/10"}`, children: "Assessments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("history"), className: `px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "history" ? "bg-white text-blue-700 shadow-lg" : "text-white hover:bg-white/10"}`, children: "Result History" })
      ] })
    ] }),
    activeTab === "practice" && !isParent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pb-20", children: availableTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full py-20 text-center bg-white rounded-3xl border border-dashed text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold uppercase tracking-widest text-xs", children: "No Mock Tests Assigned" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Check the Syllabus tab for chapter-wise assessments." })
    ] }) : availableTests.map((test) => {
      var _a;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${test.difficulty === "ADVANCED" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`, children: test.difficulty })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors", children: test.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs font-bold text-slate-400 mb-8 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
            " ",
            test.durationMinutes,
            " mins"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3.5 h-3.5" }),
            " ",
            ((_a = test.questions) == null ? void 0 : _a.length) || 0,
            " Qs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => startTest(test),
            className: "w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-blue-600 hover:shadow-blue-200 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlayCircle, { size: 20 }),
              " Start Mock Test"
            ]
          }
        )
      ] }, test.id);
    }) }),
    activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-amber-500" }),
          "Performance Records"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-white border px-3 py-1 rounded-full text-slate-400", children: [
          "COUNT: ",
          history.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-20 text-center text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-16 h-16 mx-auto mb-4 opacity-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-600 text-lg", children: "No assessment history found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-xs mx-auto mt-2", children: "Take your first test in the 'Practice' tab to see your progress here." })
      ] }) : history.map((attempt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${attempt.accuracy_percent >= 75 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-800 text-base", children: attempt.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(attempt.date).toLocaleDateString(void 0, { day: "numeric", month: "short", year: "numeric" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-slate-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: attempt.timeTakenSeconds ? `${Math.floor(attempt.timeTakenSeconds / 60)}m ${attempt.timeTakenSeconds % 60}s` : "Standard Duration" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 md:mt-0 flex items-center gap-8 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-black text-slate-900", children: [
              attempt.score,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 text-sm font-normal", children: [
                "/",
                attempt.totalMarks
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400", children: "Total Score" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-lg font-black ${attempt.accuracy_percent >= 75 ? "text-green-600" : attempt.accuracy_percent >= 50 ? "text-blue-600" : "text-red-600"}`, children: [
              attempt.accuracy_percent,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400", children: "Accuracy" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2 bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16 }) }) })
        ] })
      ] }, attempt.id)) })
    ] })
  ] });
};
export {
  TestScreen
};
