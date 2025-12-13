import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import Bot from "../node_modules/lucide-react/dist/esm/icons/bot.js";
import Loader2 from "../node_modules/lucide-react/dist/esm/icons/loader-2.js";
import Send from "../node_modules/lucide-react/dist/esm/icons/send.js";
import ChevronDown from "../node_modules/lucide-react/dist/esm/icons/chevron-down.js";
import X from "../node_modules/lucide-react/dist/esm/icons/x.js";
const AITutorChat = ({ isFullScreen = false }) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [enabled, setEnabled] = reactExports.useState(true);
  const [modelName, setModelName] = reactExports.useState("gemini-2.5-flash");
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isFullScreen) {
      setIsOpen(true);
    }
  }, [isFullScreen]);
  const loadConfig = () => {
    const localConfig = localStorage.getItem("iitjee_ai_config");
    if (localConfig) {
      try {
        const config = JSON.parse(localConfig);
        setEnabled(config.enabled);
        setModelName(config.model || "gemini-2.5-flash");
        if (config.enabled && messages.length === 0) {
          setMessages([{ id: "welcome", role: "model", text: "Hi! I'm your AI Tutor. Ask me anything about Physics, Chem, or Maths!", timestamp: /* @__PURE__ */ new Date() }]);
        }
        return;
      } catch (e) {
      }
    }
    fetch("/api/manage_settings.php?key=ai_config").then((res) => res.ok ? res.text() : Promise.reject()).then((text) => {
      if (!text || !text.trim()) return;
      const data = JSON.parse(text);
      if (data && data.value) {
        const config = JSON.parse(data.value);
        setEnabled(config.enabled);
        setModelName(config.model || "gemini-2.5-flash");
        if (config.enabled && messages.length === 0) {
          setMessages([{ id: "welcome", role: "model", text: "Hi! I'm your AI Tutor. Ask me anything!", timestamp: /* @__PURE__ */ new Date() }]);
        }
      }
    }).catch(() => {
      if (messages.length === 0) {
        setMessages([{ id: "welcome", role: "model", text: "Hi! I'm your AI Tutor. Ask me anything!", timestamp: /* @__PURE__ */ new Date() }]);
      }
    });
  };
  reactExports.useEffect(() => {
    loadConfig();
    const handleStorageChange = () => loadConfig();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  reactExports.useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { id: Date.now().toString(), role: "user", text: input, timestamp: /* @__PURE__ */ new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const history = messages.slice(-5).map((m) => `${m.role === "user" ? "User" : "Tutor"}: ${m.text}`).join("\n");
      let systemInstruction = "You are an expert IIT JEE Tutor. Be concise, encouraging, and focus on Physics, Chemistry, and Math.";
      const SIMULATED_PERSONAS = {
        "llama-3-70b": "Adopt the persona of Llama-3 70B. Your strength is general reasoning and theory. Provide very detailed, comprehensive conceptual explanations.",
        "deepseek-r1": "Adopt the persona of DeepSeek R1. Your strength is multi-step reasoning. Break down every answer into rigorous logical steps. Focus on derivations.",
        "qwen-2.5-math-72b": "Adopt the persona of Qwen 2.5 Math. You are a pure mathematics specialist. Be extremely precise with notation, calculus, and algebra.",
        "phi-3-medium": "Adopt the persona of Phi-3 Medium. Be lightweight and fast. Provide short, punchy, step-wise breakdowns."
      };
      if (SIMULATED_PERSONAS[modelName]) {
        systemInstruction += " " + SIMULATED_PERSONAS[modelName];
      }
      const fullPrompt = `${systemInstruction}

Context:
${history}

User: ${input}
Tutor:`;
      const encodedPrompt = encodeURIComponent(fullPrompt);
      const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const text = await response.text();
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "model", text: text || "I'm having trouble thinking right now.", timestamp: /* @__PURE__ */ new Date() }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "model", text: "Connection error. Please try again.", timestamp: /* @__PURE__ */ new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };
  if (!enabled) return null;
  if (isFullScreen) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col bg-slate-50 h-full animate-in fade-in pb-20 md:pb-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-violet-100 text-violet-700 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-800", children: "AI Tutor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Immersive Learning Mode" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-6", children: [
        messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `max-w-[85%] md:max-w-[80%] rounded-2xl p-4 text-sm md:text-base shadow-sm ${msg.role === "user" ? "bg-violet-600 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap leading-relaxed", children: msg.text }) }) }, msg.id)),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-5 h-5 text-violet-500 animate-bounce" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-500", children: "Thinking..." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-white border-t border-slate-200 sticky bottom-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSend(),
            placeholder: "Ask a question...",
            className: "w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-full text-base focus:ring-2 focus:ring-violet-200 outline-none shadow-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSend,
            disabled: !input.trim() || isLoading,
            className: "absolute right-3 top-3 p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-all disabled:opacity-50 active:scale-95",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" })
          }
        )
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex fixed bottom-6 right-6 z-[9999] flex-col items-end", children: [
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 origin-bottom-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex justify-between items-center text-white shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm", children: "AI Tutor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-80", children: "Always here to help" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsOpen(false), className: "p-1.5 hover:bg-white/10 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50", children: [
        messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${msg.role === "user" ? "bg-violet-600 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap leading-relaxed", children: msg.text }) }) }, msg.id)),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-violet-500 animate-bounce" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: "Thinking..." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-white border-t border-slate-100 shrink-0 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleSend(), placeholder: "Ask a question...", className: "w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-violet-200 outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSend, disabled: !input.trim() || isLoading, className: "absolute right-5 top-5 p-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all disabled:opacity-50 active:scale-95", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: `w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-[9999] ${isOpen ? "bg-slate-700 text-white rotate-90" : "bg-gradient-to-br from-violet-600 to-indigo-600 text-white"}`,
        children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-7 h-7" })
      }
    )
  ] });
};
export {
  AITutorChat
};
