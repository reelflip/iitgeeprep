import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import Bot from "../node_modules/lucide-react/dist/esm/icons/bot.js";
import Key from "../node_modules/lucide-react/dist/esm/icons/key.js";
import ToggleRight from "../node_modules/lucide-react/dist/esm/icons/toggle-right.js";
import ToggleLeft from "../node_modules/lucide-react/dist/esm/icons/toggle-left.js";
import Share2 from "../node_modules/lucide-react/dist/esm/icons/share-2.js";
import Instagram from "../node_modules/lucide-react/dist/esm/icons/instagram.js";
import Facebook from "../node_modules/lucide-react/dist/esm/icons/facebook.js";
import Twitter from "../node_modules/lucide-react/dist/esm/icons/twitter.js";
import Youtube from "../node_modules/lucide-react/dist/esm/icons/youtube.js";
import Linkedin from "../node_modules/lucide-react/dist/esm/icons/linkedin.js";
import BarChart3 from "../node_modules/lucide-react/dist/esm/icons/bar-chart-3.js";
import Brain from "../node_modules/lucide-react/dist/esm/icons/brain.js";
import Check from "../node_modules/lucide-react/dist/esm/icons/check.js";
import Loader2 from "../node_modules/lucide-react/dist/esm/icons/loader-2.js";
import Save from "../node_modules/lucide-react/dist/esm/icons/save.js";
import MessageSquare from "../node_modules/lucide-react/dist/esm/icons/message-square.js";
import AlertCircle from "../node_modules/lucide-react/dist/esm/icons/alert-circle.js";
import Play from "../node_modules/lucide-react/dist/esm/icons/play.js";
const MODEL_METADATA = {
  "gemini-2.5-flash": {
    name: "Gemini 2.5 Flash",
    strengths: "Balanced & Fast",
    subjects: "General Purpose",
    description: "Best for general tutoring. Good balance of speed and accuracy.",
    badge: "bg-blue-100 text-blue-800 border-blue-200"
  },
  "deepseek-r1": {
    name: "DeepSeek R1",
    strengths: "Logic & Derivations",
    subjects: "Maths, Physics",
    description: "Excellent for complex derivations and multi-step logical problems.",
    badge: "bg-purple-100 text-purple-800 border-purple-200"
  },
  "llama-3-70b": {
    name: "Llama-3 70B",
    strengths: "Detailed Theory",
    subjects: "Physics, Chemistry",
    description: "Provides verbose, textbook-style explanations for concepts.",
    badge: "bg-orange-100 text-orange-800 border-orange-200"
  },
  "qwen-2.5-math-72b": {
    name: "Qwen 2.5 Math",
    strengths: "Pure Mathematics",
    subjects: "Calculus, Algebra",
    description: "Specialized model trained specifically for advanced math problems.",
    badge: "bg-green-100 text-green-800 border-green-200"
  },
  "phi-3-medium": {
    name: "Phi-3 Medium",
    strengths: "Quick Q&A",
    subjects: "Revision",
    description: "Lightweight model for rapid fire doubt solving.",
    badge: "bg-yellow-100 text-yellow-800 border-yellow-200"
  }
};
const AdminSystemScreen = () => {
  const [config, setConfig] = reactExports.useState({ enabled: true, model: "gemini-2.5-flash" });
  const [googleClientId, setGoogleClientId] = reactExports.useState("");
  const [enableGoogleLogin, setEnableGoogleLogin] = reactExports.useState(false);
  const [gaId, setGaId] = reactExports.useState("");
  const [socialConfig, setSocialConfig] = reactExports.useState({
    enabled: false,
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    linkedin: ""
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [testPrompt, setTestPrompt] = reactExports.useState("");
  const [testResponse, setTestResponse] = reactExports.useState("");
  const [testing, setTesting] = reactExports.useState(false);
  const [testError, setTestError] = reactExports.useState("");
  reactExports.useEffect(() => {
    const loadSettings = async () => {
      try {
        const localConfig = localStorage.getItem("iitjee_ai_config");
        if (localConfig) {
          setConfig(JSON.parse(localConfig));
        }
        const resAI = await fetch("/api/manage_settings.php?key=ai_config");
        if (resAI.ok) {
          const data = await resAI.json();
          if (data && data.value) {
            const parsed = JSON.parse(data.value);
            setConfig(parsed);
            localStorage.setItem("iitjee_ai_config", JSON.stringify(parsed));
          }
        }
        const resClient = await fetch("/api/manage_settings.php?key=google_client_id");
        if (resClient.ok) {
          const data = await resClient.json();
          if (data && data.value) setGoogleClientId(data.value);
        }
        const resLogin = await fetch("/api/manage_settings.php?key=enable_google_login");
        if (resLogin.ok) {
          const data = await resLogin.json();
          if (data && data.value !== null) {
            setEnableGoogleLogin(data.value === "true");
          }
        }
        const resGA = await fetch("/api/manage_settings.php?key=google_analytics_id");
        if (resGA.ok) {
          const data = await resGA.json();
          if (data && data.value) setGaId(data.value);
        }
        const resSocial = await fetch("/api/manage_settings.php?key=social_links");
        if (resSocial.ok) {
          const data = await resSocial.json();
          if (data && data.value) setSocialConfig(JSON.parse(data.value));
        }
      } catch (e) {
        console.debug("Config fetch failed, using defaults");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);
  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem("iitjee_ai_config", JSON.stringify(config));
      window.dispatchEvent(new Event("storage"));
      await fetch("/api/manage_settings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "ai_config", value: JSON.stringify(config) })
      });
      await fetch("/api/manage_settings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "google_client_id", value: googleClientId })
      });
      await fetch("/api/manage_settings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "enable_google_login", value: String(enableGoogleLogin) })
      });
      await fetch("/api/manage_settings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "google_analytics_id", value: gaId })
      });
      await fetch("/api/manage_settings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "social_links", value: JSON.stringify(socialConfig) })
      });
      setTimeout(() => setSaving(false), 800);
    } catch (error) {
      setTimeout(() => setSaving(false), 800);
    }
  };
  const handleTest = async () => {
    if (!testPrompt.trim()) return;
    setTesting(true);
    setTestResponse("");
    setTestError("");
    try {
      const SIMULATED_PERSONAS = {
        "llama-3-70b": "You are Llama-3 70B. Provide detailed theoretical explanations.",
        "deepseek-r1": "You are DeepSeek R1. Focus on multi-step logical derivations.",
        "qwen-2.5-math-72b": "You are Qwen Math. Focus on pure mathematical proofs and calculation.",
        "phi-3-medium": "You are Phi-3. Be short, fast, and punchy."
      };
      let systemInstruction = "You are an expert IIT JEE Tutor. Be concise and helpful.";
      if (SIMULATED_PERSONAS[config.model]) {
        systemInstruction = SIMULATED_PERSONAS[config.model] + " " + systemInstruction;
      }
      const fullPrompt = `${systemInstruction}

User: ${testPrompt}`;
      const encodedPrompt = encodeURIComponent(fullPrompt);
      const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`);
      if (!response.ok) throw new Error("API Connection Failed");
      const text = await response.text();
      text ? setTestResponse(text) : setTestError("No text returned.");
    } catch (err) {
      setTestError(err.message || "Failed.");
    } finally {
      setTesting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-8 h-8" }),
        " System Configuration"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-100 mt-2 opacity-90 max-w-2xl", children: "Configure AI services, Authentication, and Analytics." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-5 h-5 mr-2 text-green-500" }),
              " Login Configuration"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${enableGoogleLogin ? "text-green-600" : "text-slate-400"}`, children: enableGoogleLogin ? "Google Login Active" : "Google Login Disabled" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEnableGoogleLogin(!enableGoogleLogin), className: `text-2xl transition-colors ${enableGoogleLogin ? "text-green-500" : "text-slate-300"}`, children: enableGoogleLogin ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-8 h-8" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-8 h-8" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `transition-opacity ${enableGoogleLogin ? "opacity-100" : "opacity-50 pointer-events-none"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Google OAuth Client ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: googleClientId,
                onChange: (e) => setGoogleClientId(e.target.value),
                placeholder: "784...apps.googleusercontent.com",
                className: "w-full p-3 border border-slate-200 rounded-lg text-sm font-mono text-slate-600 focus:ring-2 focus:ring-green-100 outline-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-2", children: 'Required for "Sign in with Google". Get this from Google Cloud Console.' })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5 mr-2 text-pink-500" }),
              " Social Media Presence"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${socialConfig.enabled ? "text-green-600" : "text-slate-400"}`, children: socialConfig.enabled ? "Links Visible" : "Links Hidden" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSocialConfig((prev) => ({ ...prev, enabled: !prev.enabled })), className: `text-2xl transition-colors ${socialConfig.enabled ? "text-green-500" : "text-slate-300"}`, children: socialConfig.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-8 h-8" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-8 h-8" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${socialConfig.enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center text-xs font-bold text-slate-500 uppercase mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-3 h-3 mr-1" }),
                " Instagram URL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: socialConfig.instagram || "",
                  onChange: (e) => setSocialConfig({ ...socialConfig, instagram: e.target.value }),
                  placeholder: "https://instagram.com/...",
                  className: "w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink-100"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center text-xs font-bold text-slate-500 uppercase mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-3 h-3 mr-1" }),
                " Facebook URL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: socialConfig.facebook || "",
                  onChange: (e) => setSocialConfig({ ...socialConfig, facebook: e.target.value }),
                  placeholder: "https://facebook.com/...",
                  className: "w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center text-xs font-bold text-slate-500 uppercase mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-3 h-3 mr-1" }),
                " Twitter / X URL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: socialConfig.twitter || "",
                  onChange: (e) => setSocialConfig({ ...socialConfig, twitter: e.target.value }),
                  placeholder: "https://x.com/...",
                  className: "w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-100"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center text-xs font-bold text-slate-500 uppercase mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-3 h-3 mr-1" }),
                " YouTube URL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: socialConfig.youtube || "",
                  onChange: (e) => setSocialConfig({ ...socialConfig, youtube: e.target.value }),
                  placeholder: "https://youtube.com/...",
                  className: "w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-100"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center text-xs font-bold text-slate-500 uppercase mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-3 h-3 mr-1" }),
                " LinkedIn URL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: socialConfig.linkedin || "",
                  onChange: (e) => setSocialConfig({ ...socialConfig, linkedin: e.target.value }),
                  placeholder: "https://linkedin.com/in/...",
                  className: "w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "w-5 h-5 mr-2 text-orange-500" }),
            " Analytics Configuration"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Google Analytics Measurement ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: gaId,
                onChange: (e) => setGaId(e.target.value),
                placeholder: "G-XXXXXXXXXX",
                className: "w-full p-3 border border-slate-200 rounded-lg text-sm font-mono text-slate-600 focus:ring-2 focus:ring-orange-100 outline-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-2", children: "Enter your tag ID to enable traffic tracking." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 mr-2 text-violet-600" }),
              " AI Tutor Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${config.enabled ? "text-green-600" : "text-slate-400"}`, children: config.enabled ? "AI Tutor Active" : "AI Tutor Disabled" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfig((prev) => ({ ...prev, enabled: !prev.enabled })), className: `relative w-12 h-6 rounded-full transition-colors ${config.enabled ? "bg-green-500" : "bg-slate-300"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${config.enabled ? "translate-x-6" : "translate-x-0"}` }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.entries(MODEL_METADATA).map(([key, meta]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => setConfig((prev) => ({ ...prev, model: key })),
              className: `relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${config.model === key ? "border-violet-500 bg-violet-50/50 ring-1 ring-violet-500" : "border-slate-100 hover:border-slate-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${meta.badge}`, children: meta.strengths }),
                  config.model === key && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-violet-600 text-white rounded-full p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 text-base mb-1", children: meta.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 leading-relaxed mb-2", children: meta.description })
              ]
            },
            key
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95", children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-5 h-5" }),
          saving ? "Saving System Settings..." : "Save All Settings"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-[500px] sticky top-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 flex items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 mr-2 text-violet-600" }),
          " AI Sandbox"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-slate-50 rounded-xl border border-slate-200 p-4 mb-4 overflow-y-auto", children: testing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 animate-spin mb-2 text-violet-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold", children: [
            "Querying ",
            config.model,
            "..."
          ] })
        ] }) : testResponse ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-slate-700 whitespace-pre-wrap animate-in fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-violet-600 block mb-1", children: "AI Response:" }),
          testResponse
        ] }) : testError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-red-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-8 h-8 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs px-4", children: testError })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-10 h-10 mb-2 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs px-6", children: "Select a model on the left and test it here before deploying to students." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: testPrompt,
              onChange: (e) => setTestPrompt(e.target.value),
              placeholder: "e.g. Explain Torque",
              className: "flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200",
              onKeyDown: (e) => e.key === "Enter" && handleTest()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleTest,
              disabled: testing || !testPrompt,
              className: "bg-violet-600 hover:bg-violet-700 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current" })
            }
          )
        ] })
      ] }) })
    ] })
  ] });
};
export {
  AdminSystemScreen
};
