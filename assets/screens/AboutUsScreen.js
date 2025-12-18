import { j as jsxRuntimeExports, q as TrendingUp, a as BookOpen, a4 as Target, a5 as CalendarClock, a6 as BarChart, a7 as BookX, H as Heart, a8 as CheckCircle2, f as Brain, m as Users, a9 as Globe } from "../vendor.js";
const AboutUsScreen = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white pt-20 pb-24 px-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-12 opacity-5 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-96 h-96 text-blue-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6", children: [
          "Master Your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400", children: "IIT JEE Preparation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed", children: "IITGEEPrep provides the digital infrastructure for serious engineering aspirants. We combine an advanced syllabus tracker, high-yield mock tests, and data-driven insights." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 -mt-16 relative z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-xl transition-transform hover:-translate-y-1 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-black text-blue-600 block mb-2", children: "IIT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs text-slate-500 uppercase font-bold tracking-widest block mb-3", children: "Targeting Excellence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-700 leading-relaxed", children: [
            "Focused on the rigor required for the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Indian Institutes of Technology" }),
            ". We provide the depth needed for JEE Advanced."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-xl transition-transform hover:-translate-y-1 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-black text-orange-500 block mb-2", children: "GEE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs text-slate-500 uppercase font-bold tracking-widest block mb-3", children: "General Engineering" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-700 leading-relaxed", children: [
            "Beyond IITs, we cover all major ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "entrance exams" }),
            " like BITSAT, VITEEE, and MET to ensure you have options."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl border border-slate-200 shadow-xl transition-transform hover:-translate-y-1 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-black text-green-600 block mb-2", children: "Prep" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs text-slate-500 uppercase font-bold tracking-widest block mb-3", children: "Strategic Preparation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-700 leading-relaxed", children: [
            "Moving beyond rote learning. We use ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "analytics and study planners" }),
            " to optimize your routine for maximum output."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12 mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-slate-900 mb-4", children: "Tools for Engineering Success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600", children: "Our platform is built around the core pillars of effective exam preparation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-blue-600" }),
              bg: "bg-blue-50",
              title: "Syllabus Tracker",
              desc: "Granular tracking for Physics, Chemistry, and Maths. Visualize your coverage instantly."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6 text-orange-600" }),
              bg: "bg-orange-50",
              title: "Mock Tests",
              desc: "Realistic practice with pattern-based mock tests and a vast question bank."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-6 h-6 text-purple-600" }),
              bg: "bg-purple-50",
              title: "Smart Timetable",
              desc: "Personalized study schedules based on your school hours and sleep cycle."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart, { className: "w-6 h-6 text-indigo-600" }),
              bg: "bg-indigo-50",
              title: "Analytics",
              desc: "Identify weak areas with detailed subject-wise performance reports."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookX, { className: "w-6 h-6 text-red-600" }),
              bg: "bg-red-50",
              title: "Mistake Notebook",
              desc: "Log incorrect answers and review them systematically to prevent repetition."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-pink-600" }),
              bg: "bg-pink-50",
              title: "Wellness",
              desc: "Guided breathing exercises and focus sounds to maintain peak mental health."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-100 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-slate-900", children: "Why IITGEEPrep?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 leading-relaxed", children: [
            "The journey to an IIT or NIT is a marathon, not a sprint. Most students fail not due to a lack of effort, but due to a lack of ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "structured planning" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 leading-relaxed", children: "We empower students with data. By tracking every hour spent and every question solved, we turn the chaotic JEE preparation process into a measurable, manageable science." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 pt-2", children: [
            "Designed by Engineers for Aspirants",
            "Supports JEE Main, Advanced, BITSAT & More",
            "Free Access to Premium Tracking Tools"
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center text-slate-800 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-5 h-5 text-green-500 mr-3" }),
            " ",
            item
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-full shadow-lg border border-slate-200 text-center w-64 h-64 flex flex-col justify-center items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-16 h-16 text-purple-500 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800 mb-1", children: "Focus on Concepts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: `"Don't just memorize. Understand."` })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-10 text-white shadow-xl mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/20 p-6 rounded-full shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-3", children: "Empowering Parents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-teal-50 leading-relaxed text-lg", children: [
            "Preparation is a family effort. IITGEEPrep allows parents to securely connect to their child's account to view ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "real-time progress reports" }),
            ", syllabus coverage, and mock test scores—without needing to nag. Support your child with data, not pressure."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-t border-slate-200 pt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 px-6 py-3 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-slate-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-600", children: [
            "Official Website: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "iitgeeprep.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-4 max-w-lg mx-auto", children: "IITGEEPrep is an independent educational platform and is not affiliated with the official IIT Joint Entrance Examination board, NTA, or any specific coaching institute." })
      ] })
    ] })
  ] });
};
const FeatureCard = ({ icon, bg, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all hover:shadow-md group", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`, children: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors", children: title }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 leading-relaxed", children: desc })
] });
export {
  AboutUsScreen
};
