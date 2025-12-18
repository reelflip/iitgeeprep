import { r as reactExports, j as jsxRuntimeExports, a as BookOpen, ao as Search, a8 as CheckCircle2, c as ChevronRight, s as ArrowLeft, ab as Clock, au as AlertTriangle, L as Loader2, S as Send, bn as StickyNote, Y as Youtube } from "../vendor.js";
import { B as BookReader } from "../components/BookReader.js";
const statusColors = {
  "NOT_STARTED": "bg-slate-100 text-slate-600 border-slate-200",
  "PENDING": "bg-slate-100 text-slate-600 border-slate-200",
  "IN_PROGRESS": "bg-blue-50 text-blue-700 border-blue-200",
  "COMPLETED": "bg-green-50 text-green-700 border-green-200",
  "REVISE": "bg-amber-50 text-amber-700 border-amber-200",
  "BACKLOG": "bg-red-50 text-red-700 border-red-200"
};
const statusLabels = {
  "NOT_STARTED": "Not Started",
  "PENDING": "Not Started",
  "IN_PROGRESS": "In Progress",
  "COMPLETED": "Completed",
  "REVISE": "Revise",
  "BACKLOG": "Backlog"
};
const SyllabusScreen = ({
  user,
  viewingStudentName,
  subjects,
  progress,
  onUpdateProgress,
  readOnly = false,
  summaryOnly = false,
  videoMap = {},
  chapterNotes = {},
  questionBank = [],
  addTestAttempt,
  testAttempts = []
}) => {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeSubjectFilter, setActiveSubjectFilter] = reactExports.useState("ALL");
  const [activeTopic, setActiveTopic] = reactExports.useState(null);
  const [activeNote, setActiveNote] = reactExports.useState(null);
  const structuredSubjects = reactExports.useMemo(() => {
    const grouped = {
      "Physics": {},
      "Chemistry": {},
      "Maths": {}
    };
    subjects.forEach((topic) => {
      if (!grouped[topic.subject][topic.chapter]) {
        grouped[topic.subject][topic.chapter] = [];
      }
      grouped[topic.subject][topic.chapter].push(topic);
    });
    return Object.entries(grouped).map(([subjectName, chapters]) => ({
      id: subjectName === "Physics" ? "phys" : subjectName === "Chemistry" ? "chem" : "math",
      name: subjectName,
      chapters: Object.entries(chapters).map(([chapterName, topics]) => ({
        id: chapterName,
        name: chapterName,
        topics
      }))
    }));
  }, [subjects]);
  const filteredData = reactExports.useMemo(() => {
    return structuredSubjects.filter((s) => activeSubjectFilter === "ALL" || s.id === activeSubjectFilter).map((subject) => ({
      ...subject,
      chapters: subject.chapters.map((chapter) => ({
        ...chapter,
        topics: chapter.topics.filter(
          (topic) => topic.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter((chapter) => chapter.topics.length > 0)
    })).filter((subject) => subject.chapters.length > 0);
  }, [structuredSubjects, activeSubjectFilter, searchQuery]);
  const getTopicProgress = (topicId) => {
    return progress[topicId] || {
      topicId,
      status: "NOT_STARTED",
      lastRevised: null,
      revisionLevel: 0,
      nextRevisionDate: null,
      solvedQuestions: []
    };
  };
  const TopicDetailView = ({ topic, onClose }) => {
    var _a;
    const [activeTab, setActiveTab] = reactExports.useState("PRACTICE");
    const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
    const [timeElapsed, setTimeElapsed] = reactExports.useState(0);
    const topicData = getTopicProgress(topic.id);
    const topicQuestions = reactExports.useMemo(() => questionBank.filter((q) => q.topicId === topic.id), [topic.id, questionBank]);
    const videoLesson = videoMap[topic.id];
    const chapterNote = chapterNotes[topic.id];
    const [selectedAnswers, setSelectedAnswers] = reactExports.useState({});
    const [showResults, setShowResults] = reactExports.useState({});
    reactExports.useEffect(() => {
      let interval;
      if (activeTab === "TEST") {
        interval = setInterval(() => setTimeElapsed((prev) => prev + 1), 1e3);
      }
      return () => clearInterval(interval);
    }, [activeTab]);
    const handleCheckAnswer = (qId, optionIdx, correctIdx) => {
      if (showResults[qId] || readOnly) return;
      setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
      setShowResults((prev) => ({ ...prev, [qId]: true }));
      if (optionIdx === correctIdx) {
        const currentSolved = topicData.solvedQuestions || [];
        if (!currentSolved.includes(qId)) {
          onUpdateProgress(topic.id, { solvedQuestions: [...currentSolved, qId] });
        }
      }
    };
    const handleSubmitTest = async () => {
      if (Object.keys(selectedAnswers).length === 0) {
        if (!confirm("You haven't answered any questions. Are you sure you want to submit?")) return;
      }
      setIsSubmitting(true);
      const results = topicQuestions.map((q) => ({
        questionId: q.id,
        subjectId: q.subjectId,
        topicId: q.topicId,
        status: selectedAnswers[q.id] === void 0 ? "UNATTEMPTED" : selectedAnswers[q.id] === q.correctOptionIndex ? "CORRECT" : "INCORRECT",
        selectedOptionIndex: selectedAnswers[q.id]
      }));
      const correctCount = results.filter((r) => r.status === "CORRECT").length;
      const incorrectCount = results.filter((r) => r.status === "INCORRECT").length;
      const unattemptedCount = results.filter((r) => r.status === "UNATTEMPTED").length;
      const score = correctCount * 4 - incorrectCount * 1;
      const totalMarks = topicQuestions.length * 4;
      const attempt = {
        id: `ct_${Date.now()}`,
        date: (/* @__PURE__ */ new Date()).toISOString(),
        title: `${topic.name} - Chapter Test`,
        score,
        totalMarks,
        accuracy: Math.round(correctCount / (correctCount + incorrectCount || 1) * 100),
        accuracy_percent: Math.round(correctCount / (correctCount + incorrectCount || 1) * 100),
        testId: `ct_${topic.id}`,
        totalQuestions: topicQuestions.length,
        correctCount,
        incorrectCount,
        unattemptedCount,
        detailedResults: results,
        topicId: topic.id,
        timeTakenSeconds: timeElapsed
      };
      if (addTestAttempt) {
        try {
          await addTestAttempt(attempt);
          if (score > totalMarks / 2) {
            onUpdateProgress(topic.id, { status: "COMPLETED" });
          }
          alert(`Test Submitted Successfully! Score: ${score}/${totalMarks}`);
          onClose();
        } catch (e) {
          alert("Error saving test result. Please check your connection.");
        }
      }
      setIsSubmitting(false);
    };
    const formatTime = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-right-4 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: topic.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: topic.chapter })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-900 leading-tight", children: topic.name })
          ] })
        ] }),
        activeTab === "TEST" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-4 py-2 bg-slate-900 text-white rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold", children: formatTime(timeElapsed) })
        ] }),
        !readOnly && activeTab !== "TEST" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden md:block", children: "Update Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: topicData.status,
              onChange: (e) => onUpdateProgress(topic.id, { status: e.target.value }),
              className: `px-4 py-2 rounded-xl text-xs font-bold border outline-none transition-all ${statusColors[topicData.status || "NOT_STARTED"]}`,
              children: Object.entries(statusLabels).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: val, className: "bg-white text-slate-800", children: label }, val))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-slate-100 flex justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 md:gap-8 overflow-x-auto no-scrollbar", children: ["PRACTICE", "TEST", "NOTES", "VIDEOS"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActiveTab(tab),
          className: `py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`,
          children: tab === "TEST" ? "🔥 Chapter Test" : tab
        },
        tab
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-4 md:p-8 space-y-8", children: [
        (activeTab === "PRACTICE" || activeTab === "TEST") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: activeTab === "TEST" ? "Timed Assessment" : "Chapter Question Bank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: activeTab === "TEST" ? "Formal attempt. Results will be saved to your scorecard and visible to parents." : `Review ${topicQuestions.length} practice problems at your own pace.` })
            ] }),
            activeTab === "PRACTICE" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black text-blue-600", children: [
                Math.round((((_a = topicData.solvedQuestions) == null ? void 0 : _a.length) || 0) / (topicQuestions.length || 1) * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "Mastery" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-24", children: [
            topicQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed", children: "No questions available for this topic yet." }) : topicQuestions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white p-6 rounded-2xl border transition-all ${selectedAnswers[q.id] !== void 0 ? "border-blue-200" : "border-slate-200 shadow-sm"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded", children: [
                  "QUESTION ",
                  idx + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-1 rounded uppercase ${q.difficulty === "HARD" ? "bg-red-50 text-red-600" : q.difficulty === "MEDIUM" ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`, children: q.difficulty })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-800 font-medium leading-relaxed mb-4", children: q.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[q.id] === oIdx;
                const isCorrect = oIdx === q.correctOptionIndex;
                const revealed = showResults[q.id] || activeTab === "TEST" && isSubmitting;
                let btnStyle = "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100";
                if (activeTab === "PRACTICE" && revealed) {
                  if (isCorrect) btnStyle = "bg-green-100 border-green-500 text-green-800 ring-2 ring-green-500/20";
                  else if (isSelected) btnStyle = "bg-red-100 border-red-500 text-red-800";
                  else btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                } else if (isSelected) {
                  btnStyle = "bg-blue-600 border-blue-600 text-white shadow-lg";
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => {
                      if (activeTab === "PRACTICE") handleCheckAnswer(q.id, oIdx, q.correctOptionIndex);
                      else setSelectedAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                    },
                    className: `p-4 rounded-xl border text-left text-sm font-medium transition-all ${btnStyle}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 font-bold uppercase", children: [
                        String.fromCharCode(65 + oIdx),
                        "."
                      ] }),
                      " ",
                      opt
                    ]
                  },
                  oIdx
                );
              }) }),
              activeTab === "PRACTICE" && showResults[q.id] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-4 p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${selectedAnswers[q.id] === q.correctOptionIndex ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`, children: selectedAnswers[q.id] === q.correctOptionIndex ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }),
                " Correct!"
              ] }) : (
                /* Fix: Added AlertTriangle to imports and used here to resolve Error in file screens/SyllabusScreen.tsx on line 320 */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-4 h-4" }),
                  " The right answer is ",
                  String.fromCharCode(65 + q.correctOptionIndex),
                  "."
                ] })
              ) })
            ] }, q.id)),
            activeTab === "TEST" && topicQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center pt-8 pb-12 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "bg-white border border-slate-200 text-slate-500 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95",
                  children: "Discard"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: handleSubmitTest,
                  disabled: isSubmitting,
                  className: "bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl flex items-center gap-3 active:scale-95 disabled:opacity-50",
                  children: [
                    isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, {}),
                    "Submit Chapter Test"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        activeTab === "NOTES" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: chapterNote ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-12 h-12 text-blue-500 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Detailed Chapter Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm mb-6", children: [
            "Expert-curated theory, formulas, and diagrams for ",
            topic.name,
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveNote({ title: topic.name, pages: chapterNote.pages }),
              className: "bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center mx-auto gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }),
                " Open Reader Mode"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed", children: "Notes for this topic are currently being prepared." }) }),
        activeTab === "VIDEOS" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: videoLesson ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              src: videoLesson.videoUrl,
              className: "w-full h-full",
              allowFullScreen: true,
              title: topic.name
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-5 h-5 text-red-600" }),
              " Video Explanation"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 mt-2 leading-relaxed", children: videoLesson.description || "Comprehensive lecture covering the core concepts of this topic." })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed", children: "Video lessons are coming soon." }) })
      ] }) })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 font-inter animate-in fade-in slide-in-from-bottom-4 relative", children: [
    activeTopic && /* @__PURE__ */ jsxRuntimeExports.jsx(TopicDetailView, { topic: activeTopic, onClose: () => setActiveTopic(null) }),
    activeNote && /* @__PURE__ */ jsxRuntimeExports.jsx(BookReader, { title: activeNote.title, pages: activeNote.pages, onClose: () => setActiveNote(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: summaryOnly ? "Syllabus Summary" : "Detailed Syllabus Tracker" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-lg opacity-90 max-w-2xl", children: summaryOnly ? `Reviewing current preparation depth for ${viewingStudentName || user.name}.` : "Track completion, watch lectures, and solve chapter-wise problems." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 md:top-4 z-30 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-96", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search topics...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border-none rounded-lg outline-none text-slate-700" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-1 w-full md:w-auto overflow-x-auto no-scrollbar", children: ["ALL", "phys", "chem", "math"].map((filter) => {
        const labels = { "ALL": "All", "phys": "Physics", "chem": "Chemistry", "math": "Maths" };
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveSubjectFilter(filter), className: `px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeSubjectFilter === filter ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"}`, children: labels[filter] }, filter);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8 pb-24", children: filteredData.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: subject.chapters.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-4 pb-2 border-b border-slate-200/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${subject.id === "phys" ? "bg-purple-500" : subject.id === "chem" ? "bg-amber-500" : "bg-blue-500"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-slate-700 uppercase tracking-wide", children: chapter.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: chapter.topics.map((topic) => {
        var _a;
        const topicData = getTopicProgress(topic.id);
        const qCount = (questionBank || []).filter((q) => q.topicId === topic.id).length;
        const solvedCount = ((_a = topicData.solvedQuestions) == null ? void 0 : _a.length) || 0;
        const qPercent = qCount > 0 ? Math.round(solvedCount / qCount * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => !summaryOnly ? setActiveTopic(topic) : null, className: `bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all duration-200 group relative overflow-hidden ${!summaryOnly ? "hover:shadow-lg hover:border-blue-300 cursor-pointer" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${subject.id === "phys" ? "bg-purple-100 text-purple-700" : subject.id === "chem" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`, children: subject.name }),
              topicData.status === "COMPLETED" && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 text-green-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-800", children: topic.name })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Solved Questions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                solvedCount,
                " / ",
                qCount
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-blue-500 rounded-full transition-all duration-500", style: { width: `${qPercent}%` } }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-slate-100 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold uppercase tracking-wider ${statusColors[topicData.status || "PENDING"]}`, children: statusLabels[topicData.status || "PENDING"] }),
            !summaryOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" })
          ] })
        ] }, topic.id);
      }) })
    ] }, chapter.id)) }, subject.id)) })
  ] });
};
export {
  SyllabusScreen
};
