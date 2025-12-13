import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import { BookReader } from "../components/BookReader.js";
import BookOpen from "../node_modules/lucide-react/dist/esm/icons/book-open.js";
import Clock from "../node_modules/lucide-react/dist/esm/icons/clock.js";
import LayoutGrid from "../node_modules/lucide-react/dist/esm/icons/layout-grid.js";
import Search from "../node_modules/lucide-react/dist/esm/icons/search.js";
import Loader2 from "../node_modules/lucide-react/dist/esm/icons/loader-2.js";
import Save from "../node_modules/lucide-react/dist/esm/icons/save.js";
import PlayCircle from "../node_modules/lucide-react/dist/esm/icons/play-circle.js";
import StickyNote from "../node_modules/lucide-react/dist/esm/icons/sticky-note.js";
import ChevronDown from "../node_modules/lucide-react/dist/esm/icons/chevron-down.js";
import CheckCircle2 from "../node_modules/lucide-react/dist/esm/icons/check-circle-2.js";
import Filter from "../node_modules/lucide-react/dist/esm/icons/filter.js";
import Youtube from "../node_modules/lucide-react/dist/esm/icons/youtube.js";
import X from "../node_modules/lucide-react/dist/esm/icons/x.js";
import Info from "../node_modules/lucide-react/dist/esm/icons/info.js";
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
  chapterNotes = {}
}) => {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeSubjectFilter, setActiveSubjectFilter] = reactExports.useState("ALL");
  const [expandedTopicId, setExpandedTopicId] = reactExports.useState(null);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [showSaveToast, setShowSaveToast] = reactExports.useState(false);
  const [activeVideo, setActiveVideo] = reactExports.useState(null);
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
  const handleSave = () => {
    if (readOnly) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2e3);
    }, 800);
  };
  const stats = reactExports.useMemo(() => {
    const totalTopics = subjects.length;
    const completed = subjects.filter((t) => {
      var _a;
      return ((_a = progress[t.id]) == null ? void 0 : _a.status) === "COMPLETED";
    }).length;
    const targetDate = /* @__PURE__ */ new Date(user.targetYear ? `${user.targetYear}-06-01` : "2025-06-01");
    const today = /* @__PURE__ */ new Date();
    const diffTime = Math.abs(targetDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays % 365 / 30);
    const remainingDays = Math.floor(diffDays % 365 % 30);
    return {
      total: totalTopics,
      completed,
      percent: totalTopics > 0 ? Math.round(completed / totalTopics * 100) : 0,
      timeRemaining: `${years} Yr ${months} Mo ${remainingDays} Days`
    };
  }, [subjects, progress, user.targetYear]);
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
      ex1Solved: 0,
      ex1Total: 30,
      ex2Solved: 0,
      ex2Total: 20,
      ex3Solved: 0,
      ex3Total: 15,
      ex4Solved: 0,
      ex4Total: 10
    };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 font-inter animate-in fade-in slide-in-from-bottom-4 relative", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Comprehensive Syllabus Tracker" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-lg opacity-90 max-w-2xl", children: "Track your completion status, exercise progress, and revision cycles chapter by chapter." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 bg-white p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col justify-center", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-slate-400 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "Time Remaining" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-slate-800", children: stats.timeRemaining }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-slate-400", children: [
          "Target: ",
          user.targetExam || "IIT JEE",
          " ",
          user.targetYear || 2025
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col justify-center", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-600 h-full rounded-full transition-all duration-1000", style: { width: `${stats.percent}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 mt-2 text-right", children: "based on syllabus completion" })
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-2 w-full md:w-auto", children: [
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
        }) }),
        !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleSave,
            disabled: isSaving,
            className: "hidden md:flex items-center justify-center space-x-2 px-6 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px]",
            children: [
              isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isSaving ? "Saving..." : "Save Progress" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      filteredData.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: subject.chapters.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-4 pb-2 border-b border-slate-200/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${subject.id === "phys" ? "bg-purple-500" : subject.id === "chem" ? "bg-amber-500" : "bg-blue-500"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-slate-700 uppercase tracking-wide", children: chapter.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: chapter.topics.map((topic) => {
          const topicData = getProgress(topic.id);
          const totalQuestions = (topicData.ex1Total || 0) + (topicData.ex2Total || 0) + (topicData.ex3Total || 0) + (topicData.ex4Total || 0);
          const solvedQuestions = (topicData.ex1Solved || 0) + (topicData.ex2Solved || 0) + (topicData.ex3Solved || 0) + (topicData.ex4Solved || 0);
          const qPercent = totalQuestions > 0 ? Math.round(solvedQuestions / totalQuestions * 100) : 0;
          const isExpanded = expandedTopicId === topic.id;
          const videoLesson = videoMap[topic.id];
          const chapterNote = chapterNotes[topic.id];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${subject.id === "phys" ? "bg-purple-100 text-purple-700" : subject.id === "chem" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`, children: subject.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "Est. 8 Hours" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-800", children: topic.name }),
                  videoLesson && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        setActiveVideo({
                          url: videoLesson.videoUrl,
                          title: topic.name,
                          desc: videoLesson.description
                        });
                      },
                      className: "flex items-center space-x-1.5 px-2 py-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors border border-red-100 group",
                      title: "Watch Video Lesson",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PlayCircle, { className: "w-3.5 h-3.5 fill-red-100 group-hover:fill-red-200" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wide", children: "Watch" })
                      ]
                    }
                  ),
                  chapterNote && chapterNote.pages && chapterNote.pages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        setActiveNote({
                          title: topic.name,
                          pages: chapterNote.pages
                        });
                      },
                      className: "flex items-center space-x-1.5 px-2 py-1 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-100 transition-colors border border-amber-100 group",
                      title: "Read Chapter Notes",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-3.5 h-3.5 fill-amber-100 group-hover:fill-amber-200" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wide", children: "Notes" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center space-x-3 w-full md:w-64", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-slate-400 rounded-full", style: { width: `${qPercent}%` } }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500 font-medium", children: [
                    qPercent,
                    "% Questions"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 self-end md:self-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      value: topicData.status || "PENDING",
                      onChange: (e) => onUpdateProgress(topic.id, { status: e.target.value }),
                      className: `appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer transition-colors ${statusColors[topicData.status || "PENDING"]} ${readOnly ? "opacity-70 pointer-events-none" : ""}`,
                      disabled: readOnly,
                      children: Object.entries(statusLabels).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: key, children: label }, key))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none ${topicData.status === "NOT_STARTED" ? "text-slate-400" : "text-current opacity-60"}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setExpandedTopicId(isExpanded ? null : topic.id),
                    className: "text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline px-2",
                    children: isExpanded ? "Close" : "Details"
                  }
                )
              ] })
            ] }),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-slate-500 uppercase mb-3 flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 mr-1.5" }),
                " Exercise Tracking"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((num) => {
                const solvedKey = `ex${num}Solved`;
                const totalKey = `ex${num}Total`;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-2 rounded-lg border border-slate-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-slate-400", children: [
                    "EXERCISE ",
                    num
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        value: topicData[solvedKey] || 0,
                        onChange: (e) => onUpdateProgress(topic.id, { [solvedKey]: parseInt(e.target.value) || 0 }),
                        className: "w-full text-xs p-1 rounded border border-slate-200 focus:border-blue-400 focus:ring-0 outline-none text-center font-medium text-slate-700",
                        disabled: readOnly
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "/" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        value: topicData[totalKey] || 0,
                        onChange: (e) => onUpdateProgress(topic.id, { [totalKey]: parseInt(e.target.value) || 0 }),
                        className: "w-full text-xs p-1 rounded border border-slate-200 focus:border-blue-400 focus:ring-0 outline-none text-center font-medium text-slate-500 bg-slate-100",
                        disabled: readOnly
                      }
                    )
                  ] })
                ] }, num);
              }) }),
              !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: handleSave,
                  disabled: isSaving,
                  className: "text-xs font-bold text-green-600 hover:text-green-700 flex items-center bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 hover:bg-green-100 transition-colors",
                  children: [
                    isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-3 h-3 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }),
                    isSaving ? "Saving" : "Save"
                  ]
                }
              ) })
            ] })
          ] }, topic.id);
        }) })
      ] }, chapter.id)) }, subject.id)),
      filteredData.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-12 h-12 text-slate-200 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-slate-500 font-medium", children: "No topics found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mt-1", children: "Try adjusting your search or filters" })
      ] })
    ] }),
    showSaveToast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-5 h-5 text-green-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: "Progress Saved!" })
    ] }),
    activeVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 bg-slate-900 text-white border-b border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-6 h-6 text-red-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 uppercase font-bold tracking-wider", children: "Video Lesson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: activeVideo.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveVideo(null),
            className: "text-slate-400 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative pt-[56.25%] bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          className: "absolute inset-0 w-full h-full",
          src: activeVideo.url,
          title: activeVideo.title,
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-900 text-slate-300 text-xs border-t border-slate-800 flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-blue-400 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "About this lesson:" }),
          " ",
          activeVideo.desc || "No detailed description available."
        ] })
      ] })
    ] }) })
  ] });
};
export {
  SyllabusScreen
};
