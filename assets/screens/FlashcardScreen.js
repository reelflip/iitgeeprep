import { r as reactExports, j as jsxRuntimeExports, l as Layers, R as RotateCw, a as Brain, Z as Zap, b8 as ThumbsUp, b9 as Star, t as ArrowLeft, aj as ArrowRight } from "../vendor.js";
const DEMO_CARDS = [
  { id: 1, front: "Newton's Second Law", back: "F = ma\n(Force equals mass times acceleration)", subjectId: "Physics" },
  { id: 2, front: "∫ sin(x) dx", back: "-cos(x) + C", subjectId: "Maths" },
  { id: 3, front: "Avogadro's Number", back: "6.022 × 10²³", subjectId: "Chemistry" },
  { id: 4, front: "Derivative of ln(x)", back: "1/x", subjectId: "Maths" },
  { id: 5, front: "First Law of Thermodynamics", back: "ΔU = Q - W\n(Energy conservation)", subjectId: "Physics" }
];
const FlashcardScreen = ({ flashcards }) => {
  const cards = flashcards && flashcards.length > 0 ? flashcards : DEMO_CARDS;
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isFlipped, setIsFlipped] = reactExports.useState(false);
  const [direction, setDirection] = reactExports.useState(null);
  const handleNext = reactExports.useCallback(() => {
    setDirection("next");
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setDirection(null);
    }, 300);
  }, [cards.length]);
  const handlePrev = reactExports.useCallback(() => {
    setDirection("prev");
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setDirection(null);
    }, 300);
  }, [cards.length]);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);
  const handleResponse = (difficulty, e) => {
    e.stopPropagation();
    handleNext();
  };
  const currentCard = cards[currentIndex];
  const progress = (currentIndex + 1) / cards.length * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12 max-w-4xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6 text-white" }) }),
          "Active Recall Deck"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 mt-2 opacity-90 max-w-xl text-sm md:text-base", children: "Mastery comes from testing yourself. Flip, rate, and repeat to strengthen neural pathways." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm font-bold text-slate-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Card ",
            currentIndex + 1,
            " of ",
            cards.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Math.round(progress),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-slate-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-blue-600 transition-all duration-300 ease-out rounded-full",
            style: { width: `${progress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg aspect-[3/2] perspective-1000", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm transform translate-y-4 scale-[0.92] z-0 rotate-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-slate-100 rounded-3xl border border-slate-200 shadow-sm transform translate-y-2 scale-[0.96] z-10 -rotate-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative w-full h-full cursor-pointer transition-all duration-700 preserve-3d z-20 ${isFlipped ? "rotate-y-180" : ""} ${direction === "next" ? "translate-x-full opacity-0" : direction === "prev" ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`,
            style: { transformStyle: "preserve-3d" },
            onClick: () => setIsFlipped(!isFlipped),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 backface-hidden bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col items-center justify-center p-8 text-center hover:border-blue-200 transition-colors",
                  style: { backfaceVisibility: "hidden" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-6 left-6 right-6 flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100", children: currentCard.subjectId || "General" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { size: 20 }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-bold text-slate-800 leading-tight select-none", children: currentCard.front }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-6 text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2 animate-pulse", children: "Tap to Flip" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-3xl shadow-xl flex flex-col items-center justify-between p-8 text-center text-white border border-slate-700",
                  style: { backfaceVisibility: "hidden", transform: "rotateY(180deg)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex justify-between items-center opacity-50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: "Answer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 18 })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center w-full overflow-y-auto custom-scrollbar my-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl font-medium text-slate-100 leading-relaxed whitespace-pre-wrap select-none", children: currentCard.back }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-3 gap-3 pt-2", onClick: (e) => e.stopPropagation(), children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          onClick: (e) => handleResponse("hard", e),
                          className: "flex flex-col items-center justify-center p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all active:scale-95 group",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-red-400 mb-1 group-hover:text-red-300" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-red-200 uppercase", children: "Hard" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          onClick: (e) => handleResponse("good", e),
                          className: "flex flex-col items-center justify-center p-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 transition-all active:scale-95 group",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-5 h-5 text-blue-400 mb-1 group-hover:text-blue-300" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-blue-200 uppercase", children: "Good" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          onClick: (e) => handleResponse("easy", e),
                          className: "flex flex-col items-center justify-center p-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 transition-all active:scale-95 group",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-green-400 mb-1 group-hover:text-green-300" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-green-200 uppercase", children: "Easy" })
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-8 w-full max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handlePrev,
            className: "group flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-800 hover:border-slate-300 shadow-sm transition-all active:scale-95",
            title: "Previous Card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20, className: "group-hover:-translate-x-0.5 transition-transform" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-400 font-medium text-center", children: [
          "Press ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 font-mono text-slate-500 mx-1", children: "Space" }),
          " to flip"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleNext,
            className: "group flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all active:scale-95",
            title: "Next Card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20, className: "group-hover:translate-x-0.5 transition-transform" })
          }
        )
      ] })
    ] })
  ] });
};
export {
  FlashcardScreen
};
