import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import { BookReader } from "../components/BookReader.js";
import BookOpen from "../node_modules/lucide-react/dist/esm/icons/book-open.js";
import LayoutGrid from "../node_modules/lucide-react/dist/esm/icons/layout-grid.js";
import Search from "../node_modules/lucide-react/dist/esm/icons/search.js";
import CheckCircle2 from "../node_modules/lucide-react/dist/esm/icons/check-circle-2.js";
import ArrowLeft from "../node_modules/lucide-react/dist/esm/icons/arrow-left.js";
import Filter from "../node_modules/lucide-react/dist/esm/icons/filter.js";
import ChevronDown from "../node_modules/lucide-react/dist/esm/icons/chevron-down.js";
import Target from "../node_modules/lucide-react/dist/esm/icons/target.js";
import CheckSquare from "../node_modules/lucide-react/dist/esm/icons/check-square.js";
import Youtube from "../node_modules/lucide-react/dist/esm/icons/youtube.js";
import Video from "../node_modules/lucide-react/dist/esm/icons/video.js";
import StickyNote from "../node_modules/lucide-react/dist/esm/icons/sticky-note.js";
import FileText from "../node_modules/lucide-react/dist/esm/icons/file-text.js";
import AlertCircle from "../node_modules/lucide-react/dist/esm/icons/alert-circle.js";
const statusColors = {
  "NOT_STARTED": "bg-slate-100 text-slate-600 border-slate-200",
  "IN_PROGRESS": "bg-blue-50 text-blue-700 border-blue-200",
  "COMPLETED": "bg-green-50 text-green-700 border-green-200",
  "REVISE": "bg-amber-50 text-amber-700 border-amber-200",
  "PENDING": "bg-slate-100 text-slate-600 border-slate-200",
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
  subjects,
  progress,
  onUpdateProgress,
  readOnly = false,
  videoMap = {},
  chapterNotes = {},
  questionBank = [],
  onToggleQuestion,
  addTestAttempt
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
  const stats = reactExports.useMemo(() => {
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
  const getProgress = (topicId) => {
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
    const [tab, setTab] = reactExports.useState("PRACTICE");
    const topicData = getProgress(topic.id);
    const [isTesting, setIsTesting] = reactExports.useState(false);
    const [testAnswers, setTestAnswers] = reactExports.useState({});
    const [testSubmitted, setTestSubmitted] = reactExports.useState(false);
    const [testScore, setTestScore] = reactExports.useState(0);
    const [difficultyFilter, setDifficultyFilter] = reactExports.useState("ALL");
    const topicQuestions = reactExports.useMemo(
      () => questionBank.filter((q) => q.topicId === topic.id),
      [topic.id]
    );
    const filteredQuestions = topicQuestions.filter((q) => difficultyFilter === "ALL" || q.difficulty === difficultyFilter);
    const solvedCount = ((_a = topicData.solvedQuestions) == null ? void 0 : _a.length) || 0;
    const totalCount = topicQuestions.length;
    const solvedPercent = totalCount > 0 ? Math.round(solvedCount / totalCount * 100) : 0;
    const videoLesson = videoMap[topic.id];
    const chapterNote = chapterNotes[topic.id];
    if (topicQuestions.length === 0 && tab === "PRACTICE") setTab("OVERVIEW");
    const startTest = () => {
      setIsTesting(true);
      setTestSubmitted(false);
      setTestAnswers({});
      setTestScore(0);
    };
    const submitTest = () => {
      if (!isTesting) return;
      let correct = 0;
      let incorrect = 0;
      let unattempted = 0;
      const total = filteredQuestions.length;
      filteredQuestions.forEach((q) => {
        const ans = testAnswers[q.id];
        if (ans === void 0) {
          unattempted++;
        } else if (ans === q.correctOptionIndex) {
          correct++;
          if (onToggleQuestion && (!topicData.solvedQuestions || !topicData.solvedQuestions.includes(q.id))) {
            onToggleQuestion(topic.id, q.id);
          }
        } else {
          incorrect++;
        }
      });
      const score = correct * 4 - incorrect * 1;
      setTestScore(score);
      setTestSubmitted(true);
      if (addTestAttempt) {
        addTestAttempt({
          id: Date.now().toString(),
          date: (/* @__PURE__ */ new Date()).toISOString(),
          title: `Chapter Practice: ${topic.name}`,
          testId: `chapter_${topic.id}_${Date.now()}`,
          score,
          totalMarks: total * 4,
          accuracy: 0,
          accuracy_percent: correct + incorrect > 0 ? Math.round(correct / (correct + incorrect) * 100) : 0,
          totalQuestions: total,
          correctCount: correct,
          incorrectCount: incorrect,
          unattemptedCount: unattempted
        });
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-bottom-10 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 rounded-full transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-6 h-6 text-slate-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${topic.subject === "Physics" ? "bg-purple-50 text-purple-700 border-purple-200" : topic.subject === "Chemistry" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: topic.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-medium tracking-wide uppercase", children: topic.chapter })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-slate-800 leading-tight", children: topic.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: topicData.status || "PENDING",
              onChange: (e) => onUpdateProgress(topic.id, { status: e.target.value }),
              className: `appearance-none pl-4 pr-10 py-2 rounded-lg text-sm font-bold border outline-none cursor-pointer transition-colors ${statusColors[topicData.status || "PENDING"]} ${readOnly ? "opacity-70 pointer-events-none" : ""}`,
              disabled: readOnly,
              children: Object.entries(statusLabels).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: key, children: label }, key))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto p-4 md:p-8 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-100 text-blue-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-700", children: "Question Bank" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-slate-800", children: totalCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-500 mb-1", children: "Total Questions" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-green-100 text-green-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckSquare, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-700", children: "Completion" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-slate-800", children: solvedCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-500 mb-1", children: "Solved" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-500 h-full rounded-full transition-all", style: { width: `${solvedPercent}%` } }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center gap-3", children: [
            videoLesson ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: videoLesson.videoUrl, target: "_blank", rel: "noreferrer", className: "flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors border border-red-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: "Watch Video Lesson" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: "No Video Assigned" })
            ] }),
            chapterNote ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveNote({ title: topic.name, pages: chapterNote.pages }), className: "flex items-center gap-3 p-3 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors border border-amber-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: "Read Chapter Notes" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: "No Notes Available" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-slate-200 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setTab("PRACTICE"),
                className: `px-6 py-3 text-sm font-bold border-b-2 transition-colors ${tab === "PRACTICE" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
                children: "Practice Problems"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setTab("OVERVIEW"),
                className: `px-6 py-3 text-sm font-bold border-b-2 transition-colors ${tab === "OVERVIEW" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
                children: "Chapter Overview"
              }
            )
          ] }),
          tab === "OVERVIEW" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-slate-800 mb-4", children: "About this Chapter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-slate prose-sm max-w-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 leading-relaxed", children: [
                "This chapter covers fundamental concepts essential for JEE preparation. Mastery of ",
                topic.name,
                " requires understanding both the theoretical underpinnings and their application in complex problem-solving scenarios."
              ] }),
              videoLesson && videoLesson.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-blue-800 font-bold mb-2 text-xs uppercase", children: "Video Lesson Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-700", children: videoLesson.description })
              ] })
            ] })
          ] }),
          tab === "PRACTICE" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in", children: [
            !isTesting && !testSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-800 mb-2", children: "Start Chapter Test" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 mb-8 max-w-md mx-auto", children: [
                "Test your knowledge with ",
                filteredQuestions.length,
                " practice questions. Answers are hidden until you submit. Results will be saved to your analytics."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-4 mb-8", children: ["ALL", "EASY", "MEDIUM", "HARD"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setDifficultyFilter(d),
                  className: `px-4 py-2 rounded-lg text-xs font-bold transition-all border ${difficultyFilter === d ? "bg-slate-800 text-white border-slate-800 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
                  children: d.charAt(0) + d.slice(1).toLowerCase()
                },
                d
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: startTest,
                  disabled: filteredQuestions.length === 0,
                  className: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
                  children: [
                    "Begin Test (",
                    filteredQuestions.length,
                    " Qs)"
                  ]
                }
              )
            ] }),
            (isTesting || testSubmitted) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              testSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-6 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row justify-between items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-1", children: "Test Completed!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "Your results have been saved to Analytics." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black text-blue-400", children: testScore }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-slate-500", children: "Score" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-slate-700 h-10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-black text-green-400", children: [
                      Math.round(Object.entries(testAnswers).filter(
                        ([id, ans]) => {
                          var _a2;
                          return ((_a2 = filteredQuestions.find((q) => q.id === id)) == null ? void 0 : _a2.correctOptionIndex) === ans;
                        }
                      ).length / filteredQuestions.length * 100),
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-slate-500", children: "Accuracy" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                  setIsTesting(false);
                  setTestSubmitted(false);
                }, className: "bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-bold text-sm transition-colors", children: "Close" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: filteredQuestions.map((q, idx) => {
                const selected = testAnswers[q.id];
                const isCorrect = testSubmitted && selected === q.correctOptionIndex;
                const isWrong = testSubmitted && selected !== void 0 && selected !== q.correctOptionIndex;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-white p-6 rounded-xl border transition-all ${isCorrect ? "border-green-300 bg-green-50/20" : isWrong ? "border-red-300 bg-red-50/20" : "border-slate-200"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-slate-500 shrink-0", children: idx + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded border ${q.difficulty === "HARD" ? "bg-red-50 text-red-700 border-red-100" : q.difficulty === "EASY" ? "bg-green-50 text-green-700 border-green-100" : "bg-orange-50 text-orange-700 border-orange-100"}`, children: q.difficulty }),
                      testSubmitted && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 text-xs font-bold flex items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }),
                        " Correct"
                      ] }),
                      testSubmitted && isWrong && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-600 text-xs font-bold flex items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-3 h-3 mr-1" }),
                        " Incorrect"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-800 font-medium mb-4 leading-relaxed", children: q.text }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: q.options.map((opt, i) => {
                      let optionClass = "border-slate-200 bg-white hover:bg-slate-50";
                      if (testSubmitted) {
                        if (i === q.correctOptionIndex) optionClass = "border-green-500 bg-green-50 text-green-800 font-bold ring-1 ring-green-500";
                        else if (i === selected && i !== q.correctOptionIndex) optionClass = "border-red-300 bg-red-50 text-red-800";
                        else optionClass = "border-slate-100 bg-slate-50 opacity-60";
                      } else if (selected === i) {
                        optionClass = "border-blue-500 bg-blue-50 text-blue-800 ring-1 ring-blue-500";
                      }
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          onClick: () => !testSubmitted && setTestAnswers((prev) => ({ ...prev, [q.id]: i })),
                          className: `p-3 rounded-lg border text-sm transition-all cursor-pointer flex items-center ${optionClass}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full border mr-3 flex items-center justify-center text-[10px] ${selected === i || testSubmitted && i === q.correctOptionIndex ? "border-current" : "border-slate-300"}`, children: String.fromCharCode(65 + i) }),
                            opt
                          ]
                        },
                        i
                      );
                    }) })
                  ] })
                ] }) }, q.id);
              }) }),
              !testSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky bottom-4 z-20 flex justify-center pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: submitTest,
                  className: "bg-slate-900 text-white font-bold py-3 px-12 rounded-full shadow-xl hover:bg-slate-800 hover:scale-105 transition-all active:scale-95",
                  children: "Submit Test"
                }
              ) })
            ] })
          ] })
        ] })
      ] }) })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 font-inter animate-in fade-in slide-in-from-bottom-4 relative", children: [
    activeTopic && /* @__PURE__ */ jsxRuntimeExports.jsx(TopicDetailView, { topic: activeTopic, onClose: () => setActiveTopic(null) }),
    activeNote && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookReader,
      {
        title: activeNote.title,
        pages: activeNote.pages,
        onClose: () => setActiveNote(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Detailed Syllabus Tracker" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-lg opacity-90 max-w-2xl", children: "Track completion, watch lectures, and solve chapter-wise problems." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-slate-900 mb-1", children: [
          "Student Overview: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: user.name.split(" ")[0] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
          user.name.split(" ")[0],
          " has completed ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-700", children: stats.completed }),
          " out of ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-700", children: stats.total }),
          " major topics."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-slate-900", children: "Overall Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-slate-800 mt-1", children: [
              stats.percent,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-normal text-slate-400 ml-1", children: "%" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "text-slate-200 w-8 h-8" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-600 h-full rounded-full transition-all duration-1000", style: { width: `${stats.percent}%` } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 md:top-4 z-30 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-96", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search topics...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder:text-slate-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-1 w-full md:w-auto overflow-x-auto no-scrollbar", children: ["ALL", "phys", "chem", "math"].map((filter) => {
        const labels = { "ALL": "All", "phys": "Physics", "chem": "Chemistry", "math": "Maths" };
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveSubjectFilter(filter),
            className: `px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeSubjectFilter === filter ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"}`,
            children: labels[filter]
          },
          filter
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      filteredData.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: subject.chapters.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-4 pb-2 border-b border-slate-200/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${subject.id === "phys" ? "bg-purple-500" : subject.id === "chem" ? "bg-amber-500" : "bg-blue-500"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-slate-700 uppercase tracking-wide", children: chapter.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: chapter.topics.map((topic) => {
          var _a;
          const topicData = getProgress(topic.id);
          const qCount = questionBank.filter((q) => q.topicId === topic.id).length;
          const solvedCount = ((_a = topicData.solvedQuestions) == null ? void 0 : _a.length) || 0;
          const qPercent = qCount > 0 ? Math.round(solvedCount / qCount * 100) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => setActiveTopic(topic),
              className: "bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group relative overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${subject.id === "phys" ? "bg-purple-100 text-purple-700" : subject.id === "chem" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`, children: subject.name }),
                    topicData.status === "COMPLETED" && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 text-green-500" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors", children: topic.name })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      qCount,
                      " Questions"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                      solvedCount,
                      " Solved"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-blue-500 rounded-full", style: { width: `${qPercent}%` } }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-slate-100 flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold uppercase tracking-wider ${topicData.status === "COMPLETED" ? "text-green-600" : topicData.status === "IN_PROGRESS" ? "text-blue-600" : "text-slate-400"}`, children: statusLabels[topicData.status || "NOT_STARTED"] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-blue-600 flex items-center group-hover:underline", children: [
                    "View Chapter ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3 h-3 ml-1 rotate-180" })
                  ] })
                ] })
              ]
            },
            topic.id
          );
        }) })
      ] }, chapter.id)) }, subject.id)),
      filteredData.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-12 h-12 text-slate-200 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-slate-500 font-medium", children: "No topics found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mt-1", children: "Try adjusting your search or filters" })
      ] })
    ] })
  ] });
};
export {
  SyllabusScreen
};
