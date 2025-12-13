import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import BookOpen from "../node_modules/lucide-react/dist/esm/icons/book-open.js";
import X from "../node_modules/lucide-react/dist/esm/icons/x.js";
import ChevronLeft from "../node_modules/lucide-react/dist/esm/icons/chevron-left.js";
import ChevronRight from "../node_modules/lucide-react/dist/esm/icons/chevron-right.js";
const BookReader = ({ title, pages, onClose }) => {
  const [currentPage, setCurrentPage] = reactExports.useState(0);
  const [isFlipping, setIsFlipping] = reactExports.useState(false);
  const handleNext = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 200);
    }
  };
  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 200);
    }
  };
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, pages.length]);
  const progressPercentage = (currentPage + 1) / pages.length * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex flex-col bg-slate-900/95 backdrop-blur-md animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 text-white bg-slate-900 border-b border-slate-800 z-20 shrink-0 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base md:text-lg leading-tight truncate max-w-[200px] md:max-w-md text-white", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400 font-medium", children: "Chapter Notes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-800 h-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300 ease-out",
        style: { width: `${progressPercentage}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden relative flex justify-center items-start pt-4 pb-24 md:pb-8 px-2 md:px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handlePrev,
          disabled: currentPage === 0,
          className: `hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-0 disabled:cursor-default hover:scale-110 z-10 backdrop-blur-sm`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-8 h-8" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleNext,
          disabled: currentPage === pages.length - 1,
          className: `hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-0 disabled:cursor-default hover:scale-110 z-10 backdrop-blur-sm`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-8 h-8" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `
                bg-white w-full max-w-3xl h-full md:h-[95%] rounded-xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative
                transition-all duration-300 transform-style-3d origin-bottom
                ${isFlipping ? "opacity-80 scale-[0.98] translate-y-2 blur-[1px]" : "opacity-100 scale-100 translate-y-0 blur-0"}
            `,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 text-slate-800 leading-relaxed page-content bg-[#ffffff]", children: [
              pages.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  dangerouslySetInnerHTML: { __html: pages[currentPage] },
                  className: "blog-content"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 mb-2 opacity-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No content available." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 md:h-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 border-t border-slate-100 px-6 py-3 hidden md:flex justify-between items-center text-xs text-slate-400 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "IITGEEPrep Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Page ",
                currentPage + 1,
                " of ",
                pages.length
              ] })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe flex justify-between items-center z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-pb", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handlePrev,
          disabled: currentPage === 0,
          className: "flex items-center gap-1 px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm disabled:opacity-30 disabled:bg-slate-50 active:bg-slate-200 active:scale-95 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" }),
            " Prev"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-slate-800", children: [
          "Page ",
          currentPage + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-medium text-slate-400 uppercase tracking-wide", children: [
          "of ",
          pages.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleNext,
          disabled: currentPage === pages.length - 1,
          className: "flex items-center gap-1 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm disabled:opacity-30 disabled:bg-slate-300 active:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200",
          children: [
            "Next ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .page-content p { margin-bottom: 1.2em; font-size: 1.05rem; line-height: 1.7; color: #334155; }
        .page-content h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-top: 0.5em; margin-bottom: 0.5em; line-height: 1.2; letter-spacing: -0.02em; }
        .page-content h2 { font-size: 1.4rem; font-weight: 700; color: #334155; margin-top: 1.5em; margin-bottom: 0.5em; letter-spacing: -0.01em; }
        .page-content h3 { font-size: 1.2rem; font-weight: 600; color: #475569; margin-top: 1.2em; margin-bottom: 0.5em; }
        .page-content ul, .page-content ol { padding-left: 1.5em; margin-bottom: 1.2em; }
        .page-content li { margin-bottom: 0.5em; }
        .page-content blockquote { border-left: 4px solid #3b82f6; padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: #475569; background: #f8fafc; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; }
        .page-content pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1.5rem; font-size: 0.9rem; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; }
        .page-content strong { color: #0f172a; font-weight: 700; }
        .page-content .bg-yellow-100 { background-color: #fef9c3; padding: 0.2em 0.4em; border-radius: 0.2em; }
      ` })
  ] });
};
export {
  BookReader
};
