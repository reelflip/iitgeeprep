import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import TrendingUp from "../node_modules/lucide-react/dist/esm/icons/trending-up.js";
import ArrowLeft from "../node_modules/lucide-react/dist/esm/icons/arrow-left.js";
import LogIn from "../node_modules/lucide-react/dist/esm/icons/log-in.js";
import Instagram from "../node_modules/lucide-react/dist/esm/icons/instagram.js";
import Facebook from "../node_modules/lucide-react/dist/esm/icons/facebook.js";
import Twitter from "../node_modules/lucide-react/dist/esm/icons/twitter.js";
import Youtube from "../node_modules/lucide-react/dist/esm/icons/youtube.js";
import Linkedin from "../node_modules/lucide-react/dist/esm/icons/linkedin.js";
const PublicLayout = ({ children, onNavigate, currentScreen, socialConfig }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 font-inter flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-white border-b border-slate-200 sticky top-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 cursor-pointer", onClick: () => onNavigate("dashboard"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-lg text-slate-900 tracking-tight", children: [
          "IIT",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "JEE" }),
          "Prep"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("about"), className: `hover:text-blue-600 transition-colors ${currentScreen === "about" ? "text-blue-600 font-bold" : ""}`, children: "About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("exams"), className: `hover:text-blue-600 transition-colors ${currentScreen === "exams" ? "text-blue-600 font-bold" : ""}`, children: "Exam Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("blog"), className: `hover:text-blue-600 transition-colors ${currentScreen === "blog" || currentScreen === "public-blog" ? "text-blue-600 font-bold" : ""}`, children: "Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("contact"), className: `hover:text-blue-600 transition-colors ${currentScreen === "contact" ? "text-blue-600 font-bold" : ""}`, children: "Contact" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onNavigate("dashboard"),
            className: "text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
              " Back"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onNavigate("dashboard"),
            className: "hidden md:flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 mr-1.5" }),
              " Login"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-slate-900 text-slate-400 py-12 border-t border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-4 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-xl", children: "IITGEEPrep" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed max-w-xs text-slate-500", children: "The ultimate companion for IIT JEE and other engineering entrance aspirants. Track, Test, Revise, Conquer." }),
          (socialConfig == null ? void 0 : socialConfig.enabled) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-6", children: [
            socialConfig.instagram && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: socialConfig.instagram, target: "_blank", rel: "noopener noreferrer", className: "hover:text-pink-500 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 18 }) }),
            socialConfig.facebook && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: socialConfig.facebook, target: "_blank", rel: "noopener noreferrer", className: "hover:text-blue-500 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 18 }) }),
            socialConfig.twitter && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: socialConfig.twitter, target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { size: 18 }) }),
            socialConfig.youtube && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: socialConfig.youtube, target: "_blank", rel: "noopener noreferrer", className: "hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { size: 18 }) }),
            socialConfig.linkedin && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: socialConfig.linkedin, target: "_blank", rel: "noopener noreferrer", className: "hover:text-blue-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { size: 18 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-bold mb-4 uppercase tracking-wider text-xs", children: "Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("about"), className: "hover:text-blue-400 transition-colors", children: "About Us" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("exams"), className: "hover:text-blue-400 transition-colors", children: "Exam Guide" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("blog"), className: "hover:text-blue-400 transition-colors", children: "Blog & Insights" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-bold mb-4 uppercase tracking-wider text-xs", children: "Support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("contact"), className: "hover:text-blue-400 transition-colors", children: "Contact Us" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("privacy"), className: "hover:text-blue-400 transition-colors", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 cursor-default", children: "Terms of Service" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs border-t border-slate-800 pt-8 text-slate-600", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " IITGEEPrep. All rights reserved."
      ] })
    ] })
  ] });
};
export {
  PublicLayout
};
