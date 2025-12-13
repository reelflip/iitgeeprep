import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import { TARGET_EXAMS } from "../lib/constants.js";
import Camera from "../node_modules/lucide-react/dist/esm/icons/camera.js";
import Target from "../node_modules/lucide-react/dist/esm/icons/target.js";
import Save from "../node_modules/lucide-react/dist/esm/icons/save.js";
import User from "../node_modules/lucide-react/dist/esm/icons/user.js";
import Bell from "../node_modules/lucide-react/dist/esm/icons/bell.js";
import Mail from "../node_modules/lucide-react/dist/esm/icons/mail.js";
import Shield from "../node_modules/lucide-react/dist/esm/icons/shield.js";
import CheckCircle2 from "../node_modules/lucide-react/dist/esm/icons/check-circle-2.js";
const ProfileScreen = ({ user, onAcceptRequest, onUpdateUser, linkedStudentName }) => {
  var _a;
  const requests = ((_a = user.notifications) == null ? void 0 : _a.filter((n) => n.type === "connection_request")) || [];
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    school: user.school || "",
    targetYear: user.targetYear || 2025,
    targetExam: user.targetExam || "JEE Main & Advanced",
    phone: user.phone || "",
    notifications: {
      email: true,
      push: true
    }
  });
  const handleSave = () => {
    if (onUpdateUser) {
      onUpdateUser({
        school: formData.school,
        targetYear: formData.targetYear,
        targetExam: formData.targetExam,
        phone: formData.phone
      });
    }
    setIsEditing(false);
  };
  const regenerateAvatar = () => {
    if (onUpdateUser) {
      const randomSeed = Math.random().toString(36).substring(7);
      const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
      onUpdateUser({ avatarUrl: newAvatar });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col md:flex-row items-center md:items-end gap-6 mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
              alt: "Profile",
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: regenerateAvatar,
              className: "absolute bottom-2 right-2 p-2 bg-slate-900 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors",
              title: "Change Avatar",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-slate-900", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 font-medium", children: user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full border border-blue-100", children: user.role }),
            user.role === "STUDENT" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-slate-100 text-slate-600 text-xs font-mono font-bold rounded-full border border-slate-200", children: [
                "ID: ",
                user.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 12 }),
                " ",
                user.targetExam
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsEditing(true),
            className: "bg-white border border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-all text-sm",
            children: "Edit Profile"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleSave,
            className: "bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all text-sm flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
              " Save Changes"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 border-b border-slate-100 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-50 text-blue-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Personal Details" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            user.role === "STUDENT" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Target Exam" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    disabled: !isEditing,
                    value: formData.targetExam,
                    onChange: (e) => setFormData({ ...formData, targetExam: e.target.value }),
                    className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-75 disabled:bg-slate-50",
                    children: TARGET_EXAMS.map((exam) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: exam, children: exam }, exam))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 mt-1", children: "Mock tests will be filtered based on this selection." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "School / Institute" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    disabled: !isEditing,
                    value: formData.school,
                    onChange: (e) => setFormData({ ...formData, school: e.target.value }),
                    className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-75 disabled:bg-slate-50",
                    placeholder: "Enter School Name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Target Year" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    disabled: !isEditing,
                    value: formData.targetYear,
                    onChange: (e) => setFormData({ ...formData, targetYear: parseInt(e.target.value) }),
                    className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-75 disabled:bg-slate-50",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2024, children: "2024" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2025, children: "2025" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2026, children: "2026" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2027, children: "2027" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: user.role === "PARENT" ? "md:col-span-2" : "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  disabled: !isEditing,
                  value: formData.phone,
                  onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                  className: "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-75 disabled:bg-slate-50",
                  placeholder: "+91 98765 43210"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 border-b border-slate-100 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-purple-50 text-purple-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Notification Preferences" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "text-slate-400", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-700", children: "Email Notifications" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Receive weekly progress reports and alerts." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "sr-only peer",
                    checked: formData.notifications.email,
                    onChange: () => setFormData({ ...formData, notifications: { ...formData.notifications, email: !formData.notifications.email } }),
                    disabled: !isEditing
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "text-slate-400", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-700", children: "Security Alerts" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Get notified about new logins and password changes." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "sr-only peer",
                    checked: formData.notifications.push,
                    onChange: () => setFormData({ ...formData, notifications: { ...formData.notifications, push: !formData.notifications.push } }),
                    disabled: !isEditing
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 space-y-6", children: [
        (user.parentId || user.linkedStudentId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 rounded-xl border border-green-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-green-200 rounded-full text-green-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { size: 16 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-green-900 text-sm uppercase tracking-wide", children: user.role === "STUDENT" ? "Parent Linked" : "Student Linked" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-800 font-bold text-lg mt-2", children: user.role === "STUDENT" ? `Parent ID: ${user.parentId}` : linkedStudentName || `ID: ${user.linkedStudentId}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-600 text-xs mt-1", children: "Data sync is active." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-slate-100 bg-slate-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 text-sm uppercase tracking-wide", children: user.role === "STUDENT" ? "Connection Requests" : "Family Status" }) }),
          user.role === "STUDENT" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-slate-100", children: [
            requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-6 h-6 text-slate-300" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No pending requests." })
            ] }) : requests.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 hover:bg-slate-50 transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs", children: req.fromName.charAt(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800", children: req.fromName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500", children: "Wants to connect" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => onAcceptRequest(req.id),
                    className: "flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors",
                    children: "Accept"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors", children: "Ignore" })
              ] })
            ] }, req.id)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-blue-50 border-t border-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-blue-700 leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tip:" }),
              " Share your ID ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono bg-blue-100 px-1 rounded", children: user.id }),
              " with your parent so they can send you a request."
            ] }) })
          ] }) : (
            // Parent View for this card
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
              "To connect with a student, go to the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Family" }),
              " tab and search for their ID."
            ] }) })
          )
        ] })
      ] })
    ] })
  ] });
};
export {
  ProfileScreen
};
