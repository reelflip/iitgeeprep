import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import { PsychometricScreen } from "./PsychometricScreen.js";
import Brain from "../node_modules/lucide-react/dist/esm/icons/brain.js";
const ParentFamilyScreen = ({ user, onSendRequest, linkedData }) => {
  const [searchId, setSearchId] = reactExports.useState("");
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [viewingPsychReport, setViewingPsychReport] = reactExports.useState(false);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setLoading(true);
    setStatusMsg(null);
    setTimeout(async () => {
      const result = await onSendRequest(searchId);
      setStatusMsg({
        type: result.success ? "success" : "error",
        text: result.message
      });
      setLoading(false);
    }, 1e3);
  };
  const completedTopics = linkedData ? Object.values(linkedData.progress).filter((p) => p.status === "COMPLETED").length : 0;
  const recentTest = linkedData && linkedData.tests.length > 0 ? linkedData.tests[linkedData.tests.length - 1] : null;
  if (viewingPsychReport && user.linkedStudentId) {
    const studentUser = { ...user, id: user.linkedStudentId, role: "STUDENT" };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setViewingPsychReport(false),
          className: "text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2",
          children: "← Back to Family Dashboard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PsychometricScreen, { user: studentUser })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Family Connections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500", children: "Manage connected student accounts." })
    ] }),
    user.linkedStudentId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold", children: linkedData == null ? void 0 : linkedData.studentName.charAt(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-blue-900", children: linkedData == null ? void 0 : linkedData.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-blue-600", children: [
              "ID: ",
              user.linkedStudentId
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full", children: "Connected" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-slate-50 rounded-lg border border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-3xl font-bold text-slate-800", children: completedTopics }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 uppercase font-bold", children: "Topics Completed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-slate-50 rounded-lg border border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-3xl font-bold text-slate-800", children: recentTest ? `${recentTest.score}/${recentTest.totalMarks}` : "N/A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 uppercase font-bold", children: "Recent Test Score" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setViewingPsychReport(true),
            className: "flex-1 bg-violet-600 text-white font-bold py-3 rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5" }),
              " View Psychometric Profile"
            ]
          }
        ) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl", children: "🔍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-slate-800 mb-2", children: "Connect to Student" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mb-6 max-w-md mx-auto", children: "Enter your child's 6-digit Student ID to send a connection request. They must accept the request in their Profile settings." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "max-w-sm mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: searchId,
              onChange: (e) => setSearchId(e.target.value),
              className: "flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none",
              placeholder: "Student ID (e.g. 123456)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50",
              children: loading ? "Sending..." : "Invite"
            }
          )
        ] }),
        statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-3 text-sm font-medium ${statusMsg.type === "success" ? "text-green-600" : "text-red-600"}`, children: statusMsg.text })
      ] })
    ] })
  ] });
};
export {
  ParentFamilyScreen
};
