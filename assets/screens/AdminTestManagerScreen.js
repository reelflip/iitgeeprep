import { r as reactExports, j as jsxRuntimeExports, a0 as Target, aq as Database, F as FileText, ae as Plus, as as Tag, a9 as Trash2, a6 as Save, at as Check } from "../vendor.js";
import { B as Button } from "../components/Button.js";
import { N as NATIONAL_EXAMS } from "../shared-core.js";
const AdminTestManagerScreen = ({
  questionBank,
  tests,
  onAddQuestion,
  onCreateTest,
  onDeleteQuestion,
  onDeleteTest,
  syllabus
}) => {
  const [activeTab, setActiveTab] = reactExports.useState("questions");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-indigo-700 to-blue-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-8 h-8 text-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Test & Question Bank" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-100 text-lg opacity-90 max-w-2xl", children: "Create new questions, assemble mock tests, and manage the examination database." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-white/20 p-1 rounded-xl backdrop-blur-sm border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("questions"), className: `flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "questions" ? "bg-white text-indigo-700 shadow-md" : "text-indigo-100 hover:bg-white/10"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
            " Question Bank"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("tests"), className: `flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "tests" ? "bg-white text-indigo-700 shadow-md" : "text-indigo-100 hover:bg-white/10"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            " Test Builder"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm min-h-[600px] p-6", children: activeTab === "questions" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuestionBankManager,
      {
        questions: questionBank,
        onAdd: onAddQuestion,
        onDelete: onDeleteQuestion,
        syllabus
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      TestBuilder,
      {
        questions: questionBank,
        tests,
        onCreate: onCreateTest,
        onDelete: onDeleteTest
      }
    ) })
  ] });
};
const QuestionBankManager = ({ questions, onAdd, onDelete, syllabus }) => {
  const [subject, setSubject] = reactExports.useState("Physics");
  const [topicId, setTopicId] = reactExports.useState("");
  const [text, setText] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState(["", "", "", ""]);
  const [correctIdx, setCorrectIdx] = reactExports.useState(0);
  const [source, setSource] = reactExports.useState(NATIONAL_EXAMS[0]);
  const [year, setYear] = reactExports.useState((/* @__PURE__ */ new Date()).getFullYear());
  const [difficulty, setDifficulty] = reactExports.useState("MEDIUM");
  const [filterSub, setFilterSub] = reactExports.useState("ALL");
  const topics = syllabus.filter((t) => t.subject === subject);
  const filteredQuestions = questions.filter((q) => filterSub === "ALL" || q.subjectId === (filterSub === "Physics" ? "phys" : filterSub === "Chemistry" ? "chem" : "math"));
  const handleAdd = () => {
    if (!topicId || !text || options.some((o) => !o.trim())) return;
    const newQ = {
      id: `q_${Date.now()}`,
      subjectId: subject === "Physics" ? "phys" : subject === "Chemistry" ? "chem" : "math",
      topicId,
      text,
      options,
      correctOptionIndex: correctIdx,
      source,
      year,
      difficulty
    };
    onAdd(newQ);
    setText("");
    setOptions(["", "", "", ""]);
    setCorrectIdx(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-4 border-r border-slate-100 pr-0 lg:pr-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
        " Add New Question"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full p-2 border rounded-lg text-sm bg-slate-50",
                value: subject,
                onChange: (e) => {
                  setSubject(e.target.value);
                  setTopicId("");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Physics" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chemistry" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maths" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Topic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full p-2 border rounded-lg text-sm bg-slate-50",
                value: topicId,
                onChange: (e) => setTopicId(e.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Topic" }),
                  topics.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.id, children: t.name }, t.id))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Difficulty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full p-2 border rounded-lg text-sm bg-white",
                value: difficulty,
                onChange: (e) => setDifficulty(e.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "EASY", children: "Easy" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MEDIUM", children: "Medium" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "HARD", children: "Hard" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Tag" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                className: "w-full p-2 border rounded-lg text-sm bg-white",
                value: source,
                onChange: (e) => setSource(e.target.value),
                children: NATIONAL_EXAMS.map((exam) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: exam, children: exam }, exam))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Year" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                className: "w-full p-2 border rounded-lg text-sm",
                placeholder: "2023",
                value: year,
                onChange: (e) => setYear(parseInt(e.target.value))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Question Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full p-2 border rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-100 outline-none",
              placeholder: "Type question here...",
              value: text,
              onChange: (e) => setText(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase", children: "Options (Select Correct)" }),
          options.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "correct",
                checked: correctIdx === idx,
                onChange: () => setCorrectIdx(idx),
                className: "cursor-pointer accent-green-600"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: `flex-1 p-2 border rounded-lg text-sm ${correctIdx === idx ? "border-green-300 bg-green-50" : ""}`,
                placeholder: `Option ${idx + 1}`,
                value: opt,
                onChange: (e) => {
                  const newOpts = [...options];
                  newOpts[idx] = e.target.value;
                  setOptions(newOpts);
                }
              }
            )
          ] }, idx))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, disabled: !text || !topicId, className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          " Add to Question Bank"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800", children: [
          "Existing Questions (",
          questions.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["ALL", "Physics", "Chemistry", "Maths"].map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setFilterSub(sub),
            className: `text-xs px-2 py-1 rounded border ${filterSub === sub ? "bg-slate-800 text-white" : "bg-white text-slate-600"}`,
            children: sub
          },
          sub
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 h-[600px] overflow-y-auto custom-scrollbar pr-2", children: [
        filteredQuestions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm italic", children: "No questions found." }),
        filteredQuestions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border rounded-lg hover:bg-slate-50 group relative bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-1.5 py-0.5 rounded uppercase border inline-block ${q.subjectId === "phys" ? "text-purple-700 bg-purple-50 border-purple-200" : q.subjectId === "chem" ? "text-amber-700 bg-amber-50 border-amber-200" : "text-blue-700 bg-blue-50 border-blue-200"}`, children: q.subjectId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-1.5 py-0.5 rounded border inline-block ${q.difficulty === "HARD" ? "text-red-700 bg-red-50 border-red-200" : q.difficulty === "MEDIUM" ? "text-orange-700 bg-orange-50 border-orange-200" : "text-green-700 bg-green-50 border-green-200"}`, children: q.difficulty || "MEDIUM" }),
              (q.source || q.year) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded border bg-indigo-50 text-indigo-700 border-indigo-200 flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 10, className: "mr-1" }),
                " ",
                q.source,
                " ",
                q.year
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete(q.id), className: "text-slate-300 hover:text-red-500 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-800 font-medium mb-2", children: q.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: q.options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs p-1.5 rounded border ${i === q.correctOptionIndex ? "bg-green-100 border-green-300 text-green-800 font-bold" : "bg-white border-slate-100 text-slate-500"}`, children: opt }, i)) })
        ] }, q.id))
      ] })
    ] })
  ] });
};
const TestBuilder = ({ questions, tests, onCreate, onDelete }) => {
  const [title, setTitle] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState(180);
  const [selectedQIds, setSelectedQIds] = reactExports.useState([]);
  const [activeSubject, setActiveSubject] = reactExports.useState("ALL");
  const handleCreate = () => {
    if (!title || selectedQIds.length === 0) return;
    const selectedQs = questions.filter((q) => selectedQIds.includes(q.id));
    const newTest = {
      id: `test_${Date.now()}`,
      title,
      durationMinutes: duration,
      questions: selectedQs,
      category: "ADMIN",
      difficulty: "CUSTOM"
    };
    onCreate(newTest);
    setTitle("");
    setSelectedQIds([]);
    alert("Test Published!");
  };
  const toggleSelection = (id) => {
    setSelectedQIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };
  const filteredQuestions = questions.filter((q) => activeSubject === "ALL" || q.subjectId === (activeSubject === "Physics" ? "phys" : activeSubject === "Chemistry" ? "chem" : "math"));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-6 rounded-xl border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-4", children: "Test Configuration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Test Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full p-2 border rounded-lg", placeholder: "e.g. Weekly Mock Test 05", value: title, onChange: (e) => setTitle(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Duration (Mins)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: "w-full p-2 border rounded-lg", value: duration, onChange: (e) => setDuration(parseInt(e.target.value)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Questions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full p-2 border rounded-lg bg-slate-200 text-slate-600 font-bold", children: [
                selectedQIds.length,
                " Selected"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreate, disabled: !title || selectedQIds.length === 0, className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
            " Publish Test"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-4", children: "Published Tests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[300px] overflow-y-auto", children: tests.filter((t) => t.category === "ADMIN").map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-800", children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
              t.questions.length,
              " Qs • ",
              t.durationMinutes,
              " min"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete(t.id), className: "text-red-400 hover:text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
        ] }, t.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[600px] border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-100 p-3 border-b flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-700 text-sm", children: "Select Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["ALL", "Physics", "Chemistry", "Maths"].map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveSubject(sub), className: `text-[10px] px-2 py-1 rounded font-bold ${activeSubject === sub ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`, children: sub }, sub)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50", children: filteredQuestions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => toggleSelection(q.id), className: `p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${selectedQIds.includes(q.id) ? "bg-blue-50 border-blue-400 ring-1 ring-blue-400" : "bg-white border-slate-200 hover:border-blue-300"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded border flex items-center justify-center shrink-0 ${selectedQIds.includes(q.id) ? "bg-blue-500 border-blue-500 text-white" : "bg-white border-slate-300"}`, children: selectedQIds.includes(q.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-bold px-1 rounded uppercase border mr-2 ${q.difficulty === "HARD" ? "text-red-700 bg-red-50" : "text-green-700 bg-green-50"}`, children: q.difficulty || "MED" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-800", children: q.text })
        ] })
      ] }, q.id)) })
    ] })
  ] });
};
export {
  AdminTestManagerScreen
};
