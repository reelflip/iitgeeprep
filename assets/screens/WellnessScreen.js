import { r as reactExports, j as jsxRuntimeExports, br as Wind, bp as Sun, bs as Music, bd as Pause, bt as CloudRain, bu as Trees, bv as Waves, bw as Radio, bx as Volume2, bo as Moon } from "../vendor.js";
const WellnessScreen = () => {
  const [breathingActive, setBreathingActive] = reactExports.useState(false);
  const [breathPhase, setBreathPhase] = reactExports.useState("IDLE");
  const [timer, setTimer] = reactExports.useState(0);
  const [activeSound, setActiveSound] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let interval;
    if (breathingActive) {
      const loop = () => {
        setBreathPhase("INHALE");
        setTimeout(() => {
          if (!breathingActive) return;
          setBreathPhase("HOLD");
          setTimeout(() => {
            if (!breathingActive) return;
            setBreathPhase("EXHALE");
            setTimeout(() => {
              if (!breathingActive) return;
              setBreathPhase("HOLD");
            }, 4e3);
          }, 4e3);
        }, 4e3);
      };
      loop();
      interval = window.setInterval(loop, 16e3);
    } else {
      setBreathPhase("IDLE");
    }
    return () => clearInterval(interval);
  }, [breathingActive]);
  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
    if (breathingActive) setBreathPhase("IDLE");
  };
  const sounds = [
    { id: "rain", label: "Rain", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { className: "w-5 h-5" }) },
    { id: "forest", label: "Forest", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trees, { className: "w-5 h-5" }) },
    { id: "ocean", label: "Ocean", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "w-5 h-5" }) },
    { id: "lofi", label: "Lo-Fi", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-5 h-5" }) },
    { id: "white", label: "White Noise", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5" }) },
    { id: "night", label: "Night", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-5 h-5" }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-6 h-6" }) }),
          "Wellness Corner"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-50 mt-2 opacity-90 max-w-xl", children: "Take a deep breath. Your mental health is just as important as your physics formulas." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8 text-slate-500 font-bold uppercase tracking-wider text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-4 h-4" }),
          " Box Breathing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64 h-64 flex items-center justify-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `absolute inset-0 bg-blue-100 rounded-full transition-all duration-[4000ms] ease-in-out ${breathPhase === "INHALE" ? "scale-100 opacity-100" : breathPhase === "EXHALE" ? "scale-50 opacity-80" : breathPhase === "HOLD" ? "scale-90 opacity-90" : "scale-75 opacity-50"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center shadow-sm border border-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-lg font-bold transition-all duration-300 ${breathingActive ? "text-blue-600" : "text-slate-400"}`, children: breathPhase === "IDLE" ? "Ready" : breathPhase }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleBreathing,
            className: `px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 ${breathingActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-blue-600 text-white hover:bg-blue-700"}`,
            children: breathingActive ? "Stop Session" : "Start Breathing"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 border border-orange-100 rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-orange-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-5 h-5 text-orange-600" }),
            " 5-Minute Desk Yoga"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-orange-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Neck Rolls:" }),
                " Slowly roll your head in circles, 5 times each direction."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-orange-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Shoulder Shrugs:" }),
                " Lift shoulders to ears, hold for 3s, drop heavily."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-orange-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Seated Twist:" }),
                " Twist torso to the left, hold chair back, then right."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-orange-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Palming:" }),
                " Rub palms together until warm, place over closed eyes."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 border border-purple-100 rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-purple-900 mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-5 h-5 text-purple-600" }),
            " Ambient Focus Sounds"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-purple-700 mb-4 opacity-80", children: "Listening to binaural beats or white noise can reduce anxiety." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: sounds.map((sound) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveSound(activeSound === sound.id ? null : sound.id),
              className: `flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeSound === sound.id ? "bg-white border-purple-300 shadow-md text-purple-700 scale-95 ring-1 ring-purple-200" : "bg-white/50 border-purple-100 text-purple-600 hover:bg-white hover:border-purple-200"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-1 transition-colors ${activeSound === sound.id ? "text-purple-600" : "text-purple-400"}`, children: activeSound === sound.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-5 h-5 fill-current" }) : sound.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: sound.label })
              ]
            },
            sound.id
          )) })
        ] })
      ] })
    ] })
  ] });
};
export {
  WellnessScreen
};
