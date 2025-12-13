import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import ShieldCheck from "../node_modules/lucide-react/dist/esm/icons/shield-check.js";
import Database from "../node_modules/lucide-react/dist/esm/icons/database.js";
import Eye from "../node_modules/lucide-react/dist/esm/icons/eye.js";
import Lock from "../node_modules/lucide-react/dist/esm/icons/lock.js";
import FileText from "../node_modules/lucide-react/dist/esm/icons/file-text.js";
const PrivacyPolicyScreen = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white py-16 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-12 h-12 text-green-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Privacy Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Your data belongs to you. We just help you analyze it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 mt-2", children: "Last Updated: October 2024" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 -mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-lg border border-slate-200 space-y-10 text-slate-700 leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-slate-900 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-5 h-5 mr-2 text-blue-600" }),
          " 1. Data Collection"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm", children: "We collect the minimum information required to provide our study tracking services:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Personal Information:" }),
            " Name, Email Address, Target Year, Coaching Institute (for profile customization)."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Academic Data:" }),
            " Mock test scores, syllabus completion status, study logs, and mistake records."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Usage Data:" }),
            " Time spent in Focus Zone and feature access logs for diagnostics."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-slate-900 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5 mr-2 text-blue-600" }),
          " 2. How We Use Your Data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Your data is strictly used for the following purposes:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 text-sm mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To generate personalized analytics, progress reports, and study timetables." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To provide parents with read-only access to their child's performance (only upon your explicit approval via ID linking)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To improve the accuracy of our study algorithms and topic recommendations." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-slate-900 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 mr-2 text-blue-600" }),
          " 3. Data Security"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "We take security seriously. All passwords are encrypted using strong hashing algorithms (Bcrypt) before storage. We use HTTPS encryption for all data transmission between your browser and our servers.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "We do not sell your personal data" }),
          " to third-party advertisers or coaching institutes."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-slate-900 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 mr-2 text-blue-600" }),
          " 4. Your Rights"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "You have the right to request a copy of your data or request deletion of your account at any time. You can manage your profile settings directly within the app or contact support for assistance." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-800", children: [
        "For any privacy-related concerns, please contact our Data Protection Officer at ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:privacy@iitjeeprep.com", className: "underline font-bold", children: "privacy@iitjeeprep.com" }),
        "."
      ] })
    ] }) })
  ] });
};
export {
  PrivacyPolicyScreen
};
