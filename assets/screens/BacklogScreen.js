import { r as reactExports, j as jsxRuntimeExports, m as ListTodo, a6 as CircleCheck, aV as Flame, a9 as CalendarClock, ah as Trash2 } from "../vendor.js";
const BacklogScreen = ({ backlogs, onAddBacklog, onToggleBacklog, onDeleteBacklog }) => {
  const [topic, setTopic] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("Physics");
  const [priority, setPriority] = reactExports.useState("High");
  const [deadline, setDeadline] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic || !deadline) return;
    onAddBacklog({ topic, subject, priority, deadline });
    setTopic("");
    setPriority("High");
    setDeadline("");
  };
  const pendingCount = backlogs.filter((b) => b.status === "PENDING").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-rose-600 to-orange-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ListTodo, { className: "w-8 h-8 text-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Backlog Manager" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-rose-100 text-lg opacity-90 max-w-2xl", children: "Track and clear pending topics to ensure you stay on top of your preparation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center bg-white/20 p-3 rounded-xl border border-white/20 backdrop-blur-sm hidden md:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-3xl font-bold text-white", children: pendingCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white uppercase font-bold tracking-wider", children: "Pending Tasks" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1 h-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-6 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl mr-2", children: "+" }),
          " Add New Backlog"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Topic / Chapter Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "e.g. Rotational Motion Ex-2",
                className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100",
                value: topic,
                onChange: (e) => setTopic(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Subject" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none",
                  value: subject,
                  onChange: (e) => setSubject(e.target.value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Physics" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chemistry" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maths" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Priority" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none",
                  value: priority,
                  onChange: (e) => setPriority(e.target.value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "High", children: "High 🔥" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Medium", children: "Medium ⚡" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Low", children: "Low 💤" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-1", children: "Target Deadline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "date",
                className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100",
                value: deadline,
                onChange: (e) => setDeadline(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors shadow-md active:scale-95",
              children: "Add to List"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col", children: backlogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-slate-300" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-slate-600 font-medium text-lg", children: "No backlogs! Great job." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mt-1", children: "Add tasks on the left to start tracking." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: backlogs.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 flex items-center justify-between group transition-colors ${item.status === "COMPLETED" ? "bg-slate-50" : "hover:bg-blue-50/30"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onToggleBacklog(item.id),
              className: `mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${item.status === "COMPLETED" ? "bg-green-500 border-green-500 text-white" : "border-slate-300 text-transparent hover:border-green-400"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `font-bold text-base ${item.status === "COMPLETED" ? "text-slate-400 line-through" : "text-slate-800"}`, children: item.topic }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${item.subject === "Physics" ? "bg-purple-50 text-purple-700 border-purple-100" : item.subject === "Chemistry" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-blue-50 text-blue-700 border-blue-100"}`, children: item.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center text-xs font-medium px-2 py-0.5 rounded ${item.priority === "High" ? "text-red-600 bg-red-50" : item.priority === "Medium" ? "text-orange-600 bg-orange-50" : "text-green-600 bg-green-50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 mr-1" }),
                " ",
                item.priority
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-3 h-3 mr-1" }),
                new Date(item.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onDeleteBacklog(item.id),
            className: "p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100",
            title: "Delete Backlog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5" })
          }
        )
      ] }, item.id)) }) }) })
    ] })
  ] });
};
export {
  BacklogScreen
};
