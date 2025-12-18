import { r as reactExports, j as jsxRuntimeExports, a as BookOpen, ao as Search, a8 as CheckCircle2, c as ChevronRight, s as ArrowLeft, A as AlertCircle, bo as StickyNote, Y as Youtube } from "../vendor.js";
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
  onToggleQuestion,
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
  reactExports.useMemo(() => {
    const totalTopics = subjects.length;
    const completed = subjects.filter((t) => {
      var _a;
      return ((_a = progress[t.id]) == null ? void 0 : _a.status) === "COMPLETED";
    }).length;
    const percent = totalTopics > 0 ? Math.round(completed / totalTopics * 100) : 0;
    return { total: totalTopics, completed, percent };
  }, [subjects, progress]);
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
    const topicData = getTopicProgress(topic.id);
    const topicQuestions = reactExports.useMemo(
      () => questionBank.filter((q) => q.topicId === topic.id),
      [topic.id, questionBank]
    );
    const videoLesson = videoMap[topic.id];
    const chapterNote = chapterNotes[topic.id];
    const solvedCount = ((_a = topicData.solvedQuestions) == null ? void 0 : _a.length) || 0;
    const totalCount = topicQuestions.length;
    const solvedPercent = totalCount > 0 ? Math.round(solvedCount / totalCount * 100) : 0;
    const [selectedAnswers, setSelectedAnswers] = reactExports.useState({});
    const [showResults, setShowResults] = reactExports.useState({});
    const handleCheckAnswer = (qId, optionIdx, correctIdx) => {
      if (showResults[qId]) return;
      setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
      setShowResults((prev) => ({ ...prev, [qId]: true }));
      if (optionIdx === correctIdx && onToggleQuestion) {
        onToggleQuestion(topic.id, qId);
      }
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
        !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-slate-100 flex justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-8", children: ["PRACTICE", "NOTES", "VIDEOS"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActiveTab(tab),
          className: `py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`,
          children: tab
        },
        tab
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-4 md:p-8 space-y-8", children: [
        activeTab === "PRACTICE" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Chapter Question Bank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
                "Challenge yourself with ",
                totalCount,
                " practice problems."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black text-blue-600", children: [
                solvedPercent,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "Mastery" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 pb-20", children: topicQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed", children: "No questions available for this topic yet." }) : topicQuestions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded", children: [
                "QUESTION ",
                idx + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-1 rounded uppercase ${q.difficulty === "HARD" ? "bg-red-50 text-red-600" : q.difficulty === "MEDIUM" ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`, children: q.difficulty })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-800 font-medium leading-relaxed", children: q.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: q.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[q.id] === oIdx;
              const isCorrect = oIdx === q.correctOptionIndex;
              const revealed = showResults[q.id];
              let btnStyle = "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100";
              if (revealed) {
                if (isCorrect) btnStyle = "bg-green-100 border-green-500 text-green-800 ring-2 ring-green-500/20";
                else if (isSelected) btnStyle = "bg-red-100 border-red-500 text-red-800";
                else btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
              } else if (isSelected) {
                btnStyle = "bg-blue-600 border-blue-600 text-white";
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleCheckAnswer(q.id, oIdx, q.correctOptionIndex),
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
            showResults[q.id] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${selectedAnswers[q.id] === q.correctOptionIndex ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`, children: selectedAnswers[q.id] === q.correctOptionIndex ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }),
              " Correct Answer!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4" }),
              " Incorrect. The right answer is ",
              String.fromCharCode(65 + q.correctOptionIndex),
              "."
            ] }) })
          ] }, q.id)) })
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
