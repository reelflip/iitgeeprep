import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import Layers from "../node_modules/lucide-react/dist/esm/icons/layers.js";
import RotateCw from "../node_modules/lucide-react/dist/esm/icons/rotate-cw.js";
import ArrowLeft from "../node_modules/lucide-react/dist/esm/icons/arrow-left.js";
import ArrowRight from "../node_modules/lucide-react/dist/esm/icons/arrow-right.js";
const DEMO_CARDS = [
  { id: 1, front: "Newton's Second Law", back: "F = ma\n(Force equals mass times acceleration)" },
  { id: 2, front: "∫ sin(x) dx", back: "-cos(x) + C" },
  { id: 3, front: "Avogadro's Number", back: "6.022 × 10²³" },
  { id: 4, front: "Derivative of ln(x)", back: "1/x" },
  { id: 5, front: "First Law of Thermodynamics", back: "ΔU = Q - W\n(Energy cannot be created or destroyed)" }
];
const FlashcardScreen = ({ flashcards }) => {
  const cards = flashcards && flashcards.length > 0 ? flashcards : DEMO_CARDS;
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isFlipped, setIsFlipped] = reactExports.useState(false);
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
  }, []);
  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };
  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };
  const handleResponse = (difficulty) => {
    handleNext();
  };
  const currentCard = cards[currentIndex];
  const progress = (currentIndex + 1) / cards.length * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6 text-white" }) }),
          "Active Recall Deck"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 mt-2 opacity-90 max-w-xl text-sm md:text-base", children: "Mastery comes from testing yourself, not just reading. Flip, test, repeat." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 w-12 text-right", children: "Start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-slate-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-blue-500 transition-all duration-300 ease-out",
            style: { width: `${progress}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 w-12", children: "End" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group perspective-1000 w-full max-w-md aspect-[3/2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-3xl shadow-sm border border-slate-200 transform translate-y-3 scale-95 opacity-50 z-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-3xl shadow-sm border border-slate-200 transform translate-y-6 scale-90 opacity-25 z-[-1]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative w-full h-full cursor-pointer transition-transform duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`,
            onClick: () => setIsFlipped(!isFlipped),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-8 text-center hover:shadow-2xl transition-shadow", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider", children: "Question" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 right-6 text-slate-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { size: 20 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-bold text-slate-800 leading-tight select-none", children: currentCard.front }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-6 text-xs text-slate-400 font-medium animate-pulse", children: "Tap to flip or press Space" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white border border-slate-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-wider", children: "Answer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl font-medium text-slate-100 leading-relaxed whitespace-pre-wrap select-none", children: currentCard.back })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-8 w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handlePrev,
            className: "p-4 rounded-full bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95",
            title: "Previous Card (Left Arrow)",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 24 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-slate-700 mb-1", children: [
            "Card ",
            currentIndex + 1,
            " / ",
            cards.length
          ] }),
          isFlipped && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2 animate-in fade-in slide-in-from-top-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleResponse(), className: "px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors", children: "Hard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleResponse(), className: "px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-200 transition-colors", children: "Good" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleResponse(), className: "px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg hover:bg-green-200 transition-colors", children: "Easy" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleNext,
            className: "p-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all active:scale-95",
            title: "Next Card (Right Arrow)",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 24 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-400 font-medium", children: [
        "Pro Tip: Use ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-slate-100 border border-slate-300 rounded px-1 font-mono text-slate-500", children: "Space" }),
        " to flip and ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-slate-100 border border-slate-300 rounded px-1 font-mono text-slate-500", children: "Arrows" }),
        " to navigate."
      ] })
    ] })
  ] });
};
export {
  FlashcardScreen
};
