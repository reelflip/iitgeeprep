import { r as reactExports, j as jsxRuntimeExports, a as Brain, i as ChartNoAxesColumn, az as TrendingUp, a5 as ArrowRight, e as ChevronRight } from "../vendor.js";
import { P as PSYCHOMETRIC_QUESTIONS, e as generatePsychometricReport } from "../shared-core.js";
const PsychometricScreen = ({ user, reportData, onSaveReport }) => {
  var _a;
  const [started, setStarted] = reactExports.useState(false);
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const [responses, setResponses] = reactExports.useState({});
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  user.role === "PARENT";
  const report = reportData || null;
  const handleAnswer = (qId, value) => {
    setResponses((prev) => ({ ...prev, [qId]: value }));
  };
  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(PSYCHOMETRIC_QUESTIONS.length / QUESTIONS_PER_PAGE);
  const currentQuestions = PSYCHOMETRIC_QUESTIONS.slice(
    currentStep * QUESTIONS_PER_PAGE,
    (currentStep + 1) * QUESTIONS_PER_PAGE
  );
  const handleNext = () => {
    if (currentStep < totalPages - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      finishTest();
    }
  };
  const finishTest = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      const generatedReport = generatePsychometricReport(responses);
      if (onSaveReport) onSaveReport(generatedReport);
      setAnalyzing(false);
    }, 1500);
  };
  if (analyzing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[70vh] animate-in fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-10 h-10 text-violet-600 animate-pulse" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Synthesizing Profile..." })
    ] });
  }
  if (report) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-8 h-8 text-violet-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black uppercase tracking-tight", children: "Psychometric Results" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-200 font-medium", children: "A Behavioral Blueprint for JEE v17.1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-5xl font-black", children: [
            report.overallScore,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase text-violet-400 tracking-widest", children: "Readiness Score" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-3xl border border-slate-200 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 20 }),
              " Profile Dynamics"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: Object.entries(report.scores).map(([dim, score]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-bold uppercase text-slate-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dim }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  score,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${score > 70 ? "bg-green-500" : score > 45 ? "bg-amber-500" : "bg-rose-500"}`, style: { width: `${score}%` } }) })
            ] }, dim)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-8 rounded-3xl border border-slate-200 shadow-sm blog-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: ((_a = report.detailedAnalysis) == null ? void 0 : _a.replace(/###/g, '<h3 class="mt-8 mb-3 text-indigo-600 font-bold uppercase text-sm tracking-widest">').replace(/\n/g, "<br/>")) || "" } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 p-6 rounded-3xl text-white shadow-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-blue-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16 }),
            " Corrective Action"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: report.actionPlan.map((action, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 p-3 rounded-xl flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400 font-black", children: [
              "0",
              idx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-50 leading-relaxed", children: action })
          ] }, idx)) })
        ] }) })
      ] })
    ] });
  }
  if (!started) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto py-12 animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-12 text-center relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-violet-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 48 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black text-slate-900 mb-4", children: "Exam Ready?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-lg mb-10", children: " JEE isn't just about IQ. It's about EQ, temperament, and habits. Discover your preparation persona." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStarted(true), className: "bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-violet-600 transition-all flex items-center justify-center mx-auto gap-3", children: [
        "Start Assessment ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto py-8 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-slate-800", children: [
        "Diagnostic Phase ",
        currentStep + 1
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-violet-600 transition-all duration-500", style: { width: `${(currentStep + 1) / totalPages * 100}%` } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: currentQuestions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-3xl border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-slate-800 mb-6", children: q.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between bg-slate-50 p-1.5 rounded-2xl", children: [1, 2, 3, 4, 5].map((val) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleAnswer(q.id, val), className: `w-12 h-12 rounded-xl flex items-center justify-center font-black transition-all ${responses[q.id] === val ? "bg-violet-600 text-white" : "bg-white text-slate-400 hover:text-violet-600"}`, children: val }, val)) })
    ] }, q.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleNext, disabled: currentQuestions.some((q) => !responses[q.id]), className: "bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold disabled:opacity-30", children: [
      "Continue ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, className: "inline ml-2" })
    ] }) })
  ] });
};
export {
  PsychometricScreen
};
