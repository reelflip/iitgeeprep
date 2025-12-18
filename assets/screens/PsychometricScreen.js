import { r as reactExports, j as jsxRuntimeExports, f as Brain, av as RefreshCw, m as Users, ac as ResponsiveContainer, bg as RadarChart, bh as PolarGrid, bi as PolarAngleAxis, bj as PolarRadiusAxis, bk as Radar, ah as Tooltip, b0 as Sparkles, F as FileText, aN as CheckCircle, au as AlertTriangle, o as Activity, bl as HeartPulse, as as ArrowRight, c as ChevronRight, H as Heart, b1 as Zap, l as Lightbulb } from "../vendor.js";
import { P as PSYCHOMETRIC_QUESTIONS, c as generatePsychometricReport } from "../shared-core.js";
const PsychometricScreen = ({ user, reportData: initialReport }) => {
  const [started, setStarted] = reactExports.useState(false);
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const [responses, setResponses] = reactExports.useState({});
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  const [report, setReport] = reactExports.useState(initialReport || null);
  const [fetchError, setFetchError] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const isParent = user.role === "PARENT";
  reactExports.useEffect(() => {
    if (!report && !started) {
      const checkReport = async () => {
        setLoading(true);
        try {
          const targetId = isParent && user.linkedStudentId ? user.linkedStudentId : user.id;
          if (!targetId) return;
          const res = await fetch(`/api/get_psychometric.php?user_id=${targetId}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.report) {
              setReport(data.report);
            } else {
              if (!isParent) {
                const saved = localStorage.getItem(`psych_report_${user.id}`);
                if (saved) setReport(JSON.parse(saved));
              }
            }
          } else {
            setFetchError(true);
          }
        } catch (e) {
          setFetchError(true);
        } finally {
          setLoading(false);
        }
      };
      checkReport();
    }
  }, [user.id, isParent, user.linkedStudentId]);
  const handleStart = () => setStarted(true);
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
    setTimeout(async () => {
      const generatedReport = generatePsychometricReport(responses);
      try {
        await fetch("/api/save_psychometric.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id, report: generatedReport })
        });
        localStorage.setItem(`psych_report_${user.id}`, JSON.stringify(generatedReport));
        setReport(generatedReport);
      } catch (e) {
        console.error("Save failed", e);
        alert("Failed to save report to server. Please check connection.");
      } finally {
        setAnalyzing(false);
      }
    }, 2e3);
  };
  const handleRetake = () => {
    if (confirm("Are you sure? This will overwrite your previous assessment analysis.")) {
      setReport(null);
      setResponses({});
      setCurrentStep(0);
      setStarted(false);
    }
  };
  const getParentTipIcon = (tip) => {
    if (tip.includes("Stress") || tip.includes("Burnout")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-rose-500" });
    if (tip.includes("Study Support") || tip.includes("Strategy")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-blue-500" });
    if (tip.includes("Focus") || tip.includes("Habits")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-amber-500" });
    if (tip.includes("Motivation") || tip.includes("Mindset")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-purple-500" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-5 h-5 text-slate-500" });
  };
  if (analyzing || loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[70vh] animate-in fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-4 border-violet-200 rounded-full animate-ping opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-10 h-10 text-violet-600 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-2", children: loading ? "Loading Profile..." : "Analyzing your psyche..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-center max-w-md", children: loading ? "Fetching your assessment history." : "Our AI expert is evaluating your stress levels, study patterns, and exam temperament." })
    ] });
  }
  if (report) {
    const radarData = Object.entries(report.scores).map(([dim, score]) => ({
      subject: dim.split(" ")[0],
      // Shorten name
      A: score,
      fullMark: 100
    }));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-8 h-8 text-violet-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Psychometric Assessment" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 max-w-xl", children: [
            "Assessment Date: ",
            new Date(report.date).toLocaleDateString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-violet-300 mr-2", children: "Archetype:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: report.profileType })
          ] })
        ] }),
        !isParent && !initialReport && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleRetake,
            className: "relative z-10 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              " Retake Test"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" })
      ] }),
      isParent && report.parentTips && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8 shadow-sm animate-in slide-in-from-top-4 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-amber-100 rounded-lg text-amber-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-amber-900 text-xl", children: "Parental Guidance Zone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-800/80 text-sm", children: "Actionable ways you can support your child based on their specific psychological profile." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: report.parentTips.map((tip, idx) => {
            const parts = tip.split(":");
            const title = parts.length > 1 ? parts[0] : "General Tip";
            const content = parts.length > 1 ? parts.slice(1).join(":") : parts[0];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex gap-4 transition-all hover:shadow-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-1", children: getParentTipIcon(tip) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 text-sm mb-1 uppercase tracking-wide", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 leading-relaxed", children: content })
              ] })
            ] }, idx);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-10 -mt-10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-500 uppercase tracking-wider mb-2", children: "Overall Exam Readiness" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32 mx-auto flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full transform -rotate-90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "64", cy: "64", r: "60", stroke: "#f1f5f9", strokeWidth: "8", fill: "transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "64", cy: "64", r: "60", stroke: report.overallScore > 70 ? "#10b981" : report.overallScore > 40 ? "#f59e0b" : "#ef4444", strokeWidth: "8", fill: "transparent", strokeDasharray: 377, strokeDashoffset: 377 - 377 * report.overallScore / 100, strokeLinecap: "round" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute text-3xl font-black text-slate-800", children: [
                report.overallScore,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-center text-sm font-bold text-slate-500 mb-2", children: "Dimensional Balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { cx: "50%", cy: "50%", outerRadius: "70%", data: radarData, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { dataKey: "subject", tick: { fontSize: 10, fill: "#64748b" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PolarRadiusAxis, { angle: 30, domain: [0, 100], tick: false }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { name: "Student", dataKey: "A", stroke: "#8b5cf6", fill: "#8b5cf6", fillOpacity: 0.5 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-violet-50 p-6 rounded-xl border border-violet-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-violet-900 mb-3 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 mr-2" }),
              " Executive Summary"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-800 leading-relaxed text-sm", children: report.summary })
          ] }),
          report.detailedAnalysis && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 text-lg mb-4 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 mr-2 text-indigo-600" }),
              " Deep Breakdown"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-700 leading-relaxed whitespace-pre-wrap", children: report.detailedAnalysis })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 text-lg", children: "Key Insights" }),
            report.insights.map((insight, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-xl border flex gap-4 ${insight.status === "GOOD" ? "bg-green-50 border-green-200" : insight.status === "POOR" ? "bg-red-50 border-red-200" : "bg-slate-50 border-slate-200"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 p-1.5 rounded-full h-fit shrink-0 ${insight.status === "GOOD" ? "bg-green-200 text-green-700" : insight.status === "POOR" ? "bg-red-200 text-red-700" : "bg-slate-200 text-slate-600"}`, children: insight.status === "GOOD" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-4 h-4" }) : insight.status === "POOR" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `text-sm font-bold uppercase mb-1 ${insight.status === "GOOD" ? "text-green-800" : insight.status === "POOR" ? "text-red-800" : "text-slate-700"}`, children: insight.dimension }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm leading-relaxed ${insight.status === "GOOD" ? "text-green-700" : insight.status === "POOR" ? "text-red-700" : "text-slate-600"}`, children: insight.text })
              ] })
            ] }, idx))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 p-6 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 text-lg mb-4 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 mr-2 text-blue-600" }),
              isParent ? "Student's Action Plan" : "Your Personalized Action Plan"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: report.actionPlan.map((action, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5", children: idx + 1 }),
              action
            ] }, idx)) })
          ] })
        ] })
      ] })
    ] });
  }
  if (isParent && !report) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto py-12 px-4 animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-slate-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-900 mb-2", children: "Assessment Pending" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mb-6 max-w-md mx-auto", children: "The student has not taken the psychometric assessment yet. Once they complete it, you will see a detailed breakdown of their learning style, stress levels, and specific tips for how you can support them." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 mr-2" }),
        " Waiting for student action"
      ] })
    ] }) });
  }
  if (!started) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-center p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "w-12 h-12 text-violet-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-slate-900 mb-4", children: "Psychometric Assessment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed", children: "Success in JEE isn't just about Physics, Chemistry, and Maths. It's about your mindset, stress management, and strategy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-xl border border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mb-2 block", children: "🧘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 text-sm", children: "Stress Analysis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Identify burnout risks before they affect your score." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-xl border border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mb-2 block", children: "🧠" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 text-sm", children: "Learning Style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Are you a rote learner or a conceptual thinker?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-xl border border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mb-2 block", children: "🎯" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 text-sm", children: "Exam Temperament" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: "How well do you handle exam-hall pressure?" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleStart,
          className: "bg-violet-600 hover:bg-violet-700 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg shadow-violet-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center mx-auto gap-2",
          children: [
            "Start Assessment ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-4", children: "Takes approx 5-7 minutes • 45 Questions" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto py-8 animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-slate-800", children: [
          "Section ",
          currentStep + 1,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-500 font-medium", children: [
          Math.round(Object.keys(responses).length / PSYCHOMETRIC_QUESTIONS.length * 100),
          "% Completed"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-slate-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-violet-600 transition-all duration-500 ease-out",
          style: { width: `${Object.keys(responses).length / PSYCHOMETRIC_QUESTIONS.length * 100}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: currentQuestions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-slate-800 mb-4", children: q.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-slate-400 w-16 text-center", children: "Strongly Disagree" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-between bg-slate-50 p-1 rounded-full border border-slate-100", children: [1, 2, 3, 4, 5].map((val) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleAnswer(q.id, val),
            className: `w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all transform hover:scale-110 ${responses[q.id] === val ? "bg-violet-600 text-white shadow-md ring-2 ring-violet-200" : "bg-white text-slate-500 hover:bg-violet-50"}`,
            children: val
          },
          val
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-slate-400 w-16 text-center", children: "Strongly Agree" })
      ] })
    ] }, q.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleNext,
        disabled: currentQuestions.some((q) => !responses[q.id]),
        className: "bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all",
        children: [
          currentStep < totalPages - 1 ? "Next Section" : "Analyze Results",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
        ]
      }
    ) })
  ] });
};
export {
  PsychometricScreen
};
