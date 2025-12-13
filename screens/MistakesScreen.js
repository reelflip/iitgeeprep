import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import AlertCircle from "../node_modules/lucide-react/dist/esm/icons/alert-circle.js";
const MistakesScreen = ({ mistakes, addMistake }) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ question: "", subject: "Physics", note: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    addMistake(form);
    setForm({ question: "", subject: "Physics", note: "" });
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-6 h-6 text-white" }) }),
          "Mistake Analysis Log"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-100 mt-2 opacity-90 max-w-xl text-sm md:text-base", children: "The smartest way to improve is to analyze why you got it wrong. Track your conceptual gaps and silly errors here to ensure they aren't repeated." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800", children: "Your Logs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setIsOpen(true),
          className: "bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-red-700 transition",
          children: "+ Log New Mistake"
        }
      )
    ] }),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-red-100 shadow-sm animate-in fade-in zoom-in-95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4 text-slate-800", children: "Log a New Error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "w-full p-2 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-red-100 outline-none",
              value: form.subject,
              onChange: (e) => setForm({ ...form, subject: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Physics" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chemistry" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maths" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Question / Concept" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              className: "w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 outline-none",
              placeholder: "e.g. Rotational Motion Moment of Inertia of Disc",
              value: form.question,
              onChange: (e) => setForm({ ...form, question: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Why did I get it wrong?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              required: true,
              className: "w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 outline-none",
              placeholder: "e.g. Calculation error, Forgot formula 1/2MR^2...",
              rows: 3,
              value: form.note,
              onChange: (e) => setForm({ ...form, note: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors", children: "Save" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsOpen(false), className: "bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors", children: "Cancel" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: mistakes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed", children: "No mistakes logged yet. That's either very good or you need to analyze your tests better!" }) : mistakes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-xl border border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: m.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: new Date(m.date).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 mb-2", children: m.question }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-600 bg-red-50 p-3 rounded-lg border border-red-100 italic", children: [
        '"',
        m.note,
        '"'
      ] })
    ] }, m.id)) })
  ] });
};
export {
  MistakesScreen
};
