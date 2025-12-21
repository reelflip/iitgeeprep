import { r as reactExports, j as jsxRuntimeExports, U as Users, Y as CircleCheck, a as Brain, a1 as Search, L as LoaderCircle, W as TriangleAlert, b0 as UserPlus } from "../vendor.js";
import { PsychometricScreen } from "./PsychometricScreen.js";
import "../shared-core.js";
const ParentFamilyScreen = ({ user, onSendRequest, linkedData }) => {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const [sendingTo, setSendingTo] = reactExports.useState(null);
  const [viewingPsychReport, setViewingPsychReport] = reactExports.useState(false);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setStatusMsg(null);
    setSearchResults([]);
    try {
      const res = await fetch(`/api/search_students.php?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
        if (Array.isArray(data) && data.length === 0) {
          setStatusMsg({ type: "error", text: "No matching students found. Ensure you have the correct 6-digit ID." });
        }
      } else {
        setStatusMsg({ type: "error", text: "Search failed. Please try again." });
      }
    } catch (e2) {
      setStatusMsg({ type: "error", text: "Connection error. Check your server." });
    } finally {
      setIsSearching(false);
    }
  };
  const handleSendInvite = async (studentId) => {
    setSendingTo(studentId);
    setStatusMsg(null);
    const result = await onSendRequest(studentId);
    setSendingTo(null);
    setStatusMsg({
      type: result.success ? "success" : "error",
      text: result.message
    });
  };
  const completedTopics = linkedData ? Object.values(linkedData.progress).filter((p) => p.status === "COMPLETED").length : 0;
  const recentTest = linkedData && linkedData.tests.length > 0 ? linkedData.tests[linkedData.tests.length - 1] : null;
  if (viewingPsychReport && user.linkedStudentId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setViewingPsychReport(false),
          className: "text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2",
          children: "← Back to Family Dashboard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PsychometricScreen, { user })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Family Dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-100 text-lg opacity-90 max-w-2xl", children: "Connect with your child's account to view progress reports and provide support." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
          " Connected"
        ] })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setViewingPsychReport(true), className: "w-full bg-violet-600 text-white font-bold py-3 rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5" }),
          " View Psychometric Profile & Suggestions"
        ] })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 p-8 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-slate-800 mb-2", children: "Find Your Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 max-w-md mx-auto", children: "Enter the Student Name or their unique 6-digit Student ID to send a connection request." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "flex gap-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3 text-slate-400 w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none", placeholder: "Student Name or ID..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSearching, className: "bg-blue-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors", children: isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : "Search" })
        ] }),
        statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 rounded-lg mb-6 flex items-center gap-2 text-sm font-medium ${statusMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`, children: [
          statusMsg.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          statusMsg.text
        ] }),
        searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-slate-50/50 shadow-inner", children: searchResults.map((student) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between hover:bg-white transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold", children: student.name.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 text-sm", children: student.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
                "ID: ",
                student.id
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSendInvite(student.id), disabled: sendingTo === student.id, className: "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50", children: [
            sendingTo === student.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3 h-3" }),
            " Send Invite"
          ] })
        ] }, student.id)) })
      ] })
    ] })
  ] });
};
export {
  ParentFamilyScreen
};
