import { r as reactExports, j as jsxRuntimeExports, c as BookOpen, at as Search, a8 as CheckCircle2, e as ChevronRight, u as ArrowLeft, ag as Clock, as as Save, S as Sparkles, L as Loader2, b as Send, bh as StickyNote } from "../vendor.js";
import { B as BookReader } from "../components/BookReader.js";
import { S as SyncStatusBadge } from "../components/SyncStatusBadge.js";
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
const TopicDetailView = ({
  topic,
  onClose,
  topicData,
  topicQuestions,
  videoLesson,
  chapterNote,
  readOnly,
  onUpdateProgress,
  addTestAttempt,
  currentAnswers,
  currentResultsVisible,
  currentTime,
  onAnswerQuestion,
  onUpdateTestAnswer,
  onOpenNoteReader,
  syncStatus,
  showIndicators
}) => {
  const [activeTab, setActiveTab] = reactExports.useState("PRACTICE");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [localStatus, setLocalStatus] = reactExports.useState(topicData.status);
  const isDirty = localStatus !== topicData.status;
  const handleManualSave = async () => {
    onUpdateProgress(topic.id, { status: localStatus });
  };
  const handleSubmitChapterTest = async () => {
    const answeredCount = Object.keys(currentAnswers).length;
    if (answeredCount === 0) {
      alert("Please answer at least one question before submitting.");
      return;
    }
    if (answeredCount < topicQuestions.length) {
      if (!confirm(`Wait! You have only answered ${answeredCount} out of ${topicQuestions.length} questions. Submit and save results anyway?`)) return;
    }
    setIsSubmitting(true);
    const results = topicQuestions.map((q) => ({
      questionId: q.id,
      subjectId: q.subjectId,
      topicId: q.topicId,
      status: currentAnswers[q.id] === void 0 ? "UNATTEMPTED" : currentAnswers[q.id] === q.correctOptionIndex ? "CORRECT" : "INCORRECT",
      selectedOptionIndex: currentAnswers[q.id]
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
      timeTakenSeconds: currentTime
    };
    if (addTestAttempt) {
      try {
        await addTestAttempt(attempt);
        alert(`Test Successfully Submitted!
Final Score: ${score}/${totalMarks}
Results are now saved to your dashboard analytics.`);
        onClose();
      } catch (e) {
        alert("Error saving test result. Please try again.");
      }
    }
    setIsSubmitting(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-right-4 duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: topic.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: topic.chapter }),
            showIndicators && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 text-slate-200", children: "|" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SyncStatusBadge, { status: isDirty ? "ERROR" : syncStatus, show: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-900 leading-tight", children: topic.name })
        ] })
      ] }),
      activeTab === "TEST" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-blue-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", children: [
          Math.floor(currentTime / 60),
          ":",
          (currentTime % 60).toString().padStart(2, "0")
        ] })
      ] }),
      !readOnly && activeTab !== "TEST" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden md:block", children: "Preparation Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: localStatus,
            onChange: (e) => setLocalStatus(e.target.value),
            className: `px-4 py-2 rounded-xl text-xs font-bold border outline-none transition-all ${statusColors[localStatus || "NOT_STARTED"]}`,
            children: Object.entries(statusLabels).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: val, className: "bg-white text-slate-800", children: label }, val))
          }
        ),
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleManualSave,
            className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-200 animate-in zoom-in-95 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
              " Save Chapter Progress"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-slate-100 flex justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 md:gap-8 overflow-x-auto no-scrollbar", children: ["PRACTICE", "TEST", "NOTES", "VIDEOS"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setActiveTab(tab),
        className: `py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`,
        children: tab === "TEST" ? "🔥 Formal Test" : tab
      },
      tab
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-4 md:p-8 space-y-8", children: [
      (activeTab === "PRACTICE" || activeTab === "TEST") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 rounded-2xl border flex items-center justify-between transition-all ${activeTab === "TEST" ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-slate-200 shadow-sm"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: activeTab === "TEST" ? "Assessment Mode Active" : "Practice Bank" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs mt-1 ${activeTab === "TEST" ? "text-slate-400" : "text-slate-500"}`, children: activeTab === "TEST" ? "Timed attempt. Your final score will be saved to your dashboard scorecard." : `Explore ${topicQuestions.length} practice problems to build confidence.` })
          ] }),
          activeTab === "TEST" && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "text-amber-400 animate-pulse" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-32", children: [
          topicQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed", children: "No questions available for this topic." }) : topicQuestions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white p-6 rounded-2xl border transition-all ${currentAnswers[q.id] !== void 0 ? "border-blue-200" : "border-slate-200 shadow-sm"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded", children: [
              "QUESTION ",
              idx + 1
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-800 font-medium mb-4", children: q.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: q.options.map((opt, oIdx) => {
              const isSelected = currentAnswers[q.id] === oIdx;
              const isCorrect = oIdx === q.correctOptionIndex;
              const revealed = activeTab === "PRACTICE" && currentResultsVisible[q.id];
              let btnStyle = "bg-slate-50 border-slate-100 text-slate-600";
              if (revealed) {
                if (isCorrect) btnStyle = "bg-green-100 border-green-500 text-green-800 font-bold";
                else if (isSelected) btnStyle = "bg-red-100 border-red-500 text-red-800";
              } else if (isSelected) {
                btnStyle = "bg-blue-600 border-blue-600 text-white shadow-lg";
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    if (activeTab === "PRACTICE") onAnswerQuestion(q.id, oIdx, q.correctOptionIndex);
                    else onUpdateTestAnswer(q.id, oIdx);
                  },
                  className: `p-4 rounded-xl border text-left text-sm transition-all active:scale-[0.98] ${btnStyle}`,
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
            }) })
          ] }, q.id)),
          activeTab === "TEST" && topicQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center pt-8 pb-20 border-t border-slate-200 mt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6 max-w-sm text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800 font-bold", children: "Done with the assessment? Click below to save your score." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleSubmitChapterTest,
                disabled: isSubmitting,
                className: "bg-slate-900 text-white px-16 py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-4 active:scale-95 disabled:opacity-50",
                children: [
                  isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 24 }),
                  "Save & Submit Test"
                ]
              }
            )
          ] })
        ] })
      ] }),
      activeTab === "NOTES" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: chapterNote ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-12 h-12 text-blue-500 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Detailed Chapter Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mb-6", children: "Expert-curated revision sheets for this topic." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onOpenNoteReader(topic.name, chapterNote.pages),
            className: "bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center mx-auto gap-2",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 rounded-xl border border-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 font-medium", children: videoLesson.description || "Video Lecture for this topic." }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed", children: "Video lessons are coming soon." }) })
    ] }) })
  ] });
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
  testAttempts = [],
  showIndicators = false,
  syncStatus = "IDLE"
}) => {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeSubjectFilter, setActiveSubjectFilter] = reactExports.useState("ALL");
  const [activeTopic, setActiveTopic] = reactExports.useState(null);
  const [activeNote, setActiveNote] = reactExports.useState(null);
  const [testAnswers, setTestAnswers] = reactExports.useState({});
  const [testResultsVisible, setTestResultsVisible] = reactExports.useState({});
  const [testTimers, setTestTimers] = reactExports.useState({});
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
  const handleAnswerQuestion = (topicId, qId, optionIdx, correctIdx) => {
    if (readOnly) return;
    setTestAnswers((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], [qId]: optionIdx }
    }));
    setTestResultsVisible((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], [qId]: true }
    }));
    if (optionIdx === correctIdx) {
      const topicData = getTopicProgress(topicId);
      const currentSolved = topicData.solvedQuestions || [];
      if (!currentSolved.includes(qId)) {
        onUpdateProgress(topicId, { solvedQuestions: [...currentSolved, qId] });
      }
    }
  };
  const handleUpdateTestAnswer = (topicId, qId, optionIdx) => {
    setTestAnswers((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], [qId]: optionIdx }
    }));
  };
  reactExports.useEffect(() => {
    let interval;
    if (activeTopic) {
      interval = setInterval(() => {
        setTestTimers((prev) => ({
          ...prev,
          [activeTopic.id]: (prev[activeTopic.id] || 0) + 1
        }));
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [activeTopic]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 font-inter animate-in fade-in slide-in-from-bottom-4 relative", children: [
    activeTopic && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TopicDetailView,
      {
        topic: activeTopic,
        onClose: () => setActiveTopic(null),
        topicData: getTopicProgress(activeTopic.id),
        topicQuestions: questionBank.filter((q) => q.topicId === activeTopic.id),
        videoLesson: videoMap[activeTopic.id],
        chapterNote: chapterNotes[activeTopic.id],
        readOnly,
        onUpdateProgress,
        addTestAttempt,
        currentAnswers: testAnswers[activeTopic.id] || {},
        currentResultsVisible: testResultsVisible[activeTopic.id] || {},
        currentTime: testTimers[activeTopic.id] || 0,
        onAnswerQuestion: (qId, opt, corr) => handleAnswerQuestion(activeTopic.id, qId, opt, corr),
        onUpdateTestAnswer: (qId, opt) => handleUpdateTestAnswer(activeTopic.id, qId, opt),
        onOpenNoteReader: (title, pages) => setActiveNote({ title, pages }),
        syncStatus,
        showIndicators
      }
    ),
    activeNote && /* @__PURE__ */ jsxRuntimeExports.jsx(BookReader, { title: activeNote.title, pages: activeNote.pages, onClose: () => setActiveNote(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: summaryOnly ? "Syllabus Summary" : "Detailed Syllabus Tracker" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-lg opacity-90 max-w-2xl", children: summaryOnly ? `Reviewing current preparation depth for ${viewingStudentName || user.name}.` : "Track completion, watch lectures, and solve chapter-wise problems." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SyncStatusBadge, { status: syncStatus, show: showIndicators })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${subject.id === "phys" ? "bg-purple-50" : subject.id === "chem" ? "bg-amber-50" : "bg-blue-50"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-slate-700 uppercase tracking-wide", children: chapter.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: chapter.topics.map((topic) => {
        var _a;
        const topicData = getTopicProgress(topic.id);
        const qBankFiltered = questionBank || [];
        const qCount = qBankFiltered.filter((q) => q.topicId === topic.id).length;
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
