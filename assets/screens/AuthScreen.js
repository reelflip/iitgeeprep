import { r as reactExports, j as jsxRuntimeExports, q as TrendingUp, U as User, m as Users, aU as Shield, aw as Mail, aD as Lock, aV as WifiOff, a8 as CheckCircle2, L as Loader2, ay as Book, aW as Calculator, P as PenTool } from "../vendor.js";
const EducationSketchBackground = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-slate-50", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[100px]" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-[100px]" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-purple-100/20 blur-[80px]" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[5%] left-[5%] transform -rotate-12 text-slate-300 opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Book, { size: 96, strokeWidth: 1 }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[15%] right-[10%] transform rotate-12 text-blue-200 opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { size: 80, strokeWidth: 1 }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[10%] left-[8%] transform rotate-45 text-indigo-200 opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { size: 88, strokeWidth: 1 }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.4]", style: { backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`, backgroundSize: "30px 30px" } })
] });
const AuthScreen = ({ onLogin }) => {
  var _a;
  const [view, setView] = reactExports.useState("LOGIN");
  const [role] = reactExports.useState("STUDENT");
  const [error, setError] = reactExports.useState("");
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [googleConfig, setGoogleConfig] = reactExports.useState(null);
  const googleBtnRef = reactExports.useRef(null);
  const showDemo = ((_a = window.IITJEE_CONFIG) == null ? void 0 : _a.enableDemoLogin) ?? false;
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    password: ""
  });
  reactExports.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const [enabledRes, clientIdRes] = await Promise.all([
          fetch("/api/manage_settings.php?key=google_auth_enabled"),
          fetch("/api/manage_settings.php?key=google_client_id")
        ]);
        const enabledData = await enabledRes.json();
        const clientIdData = await clientIdRes.json();
        if ((enabledData == null ? void 0 : enabledData.value) === "1" && (clientIdData == null ? void 0 : clientIdData.value)) {
          setGoogleConfig({
            enabled: true,
            clientId: clientIdData.value
          });
        }
      } catch (e) {
      }
    };
    fetchConfig();
  }, []);
  reactExports.useEffect(() => {
    if ((googleConfig == null ? void 0 : googleConfig.enabled) && googleConfig.clientId && window.google) {
      window.google.accounts.id.initialize({
        client_id: googleConfig.clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          width: googleBtnRef.current.offsetWidth,
          text: view === "REGISTER" ? "signup_with" : "signin_with",
          shape: "rectangular"
        });
      }
      if (view === "LOGIN") {
        window.google.accounts.id.prompt();
      }
    }
  }, [googleConfig, view]);
  const handleGoogleCredentialResponse = async (response) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/google_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google authentication failed.");
      onLogin({
        ...data.user,
        id: String(data.user.id),
        role: (data.user.role || "STUDENT").toUpperCase(),
        isVerified: data.user.is_verified == 1
      });
    } catch (err) {
      setError(err.message || "Google Login failed.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDemoLogin = (selectedRole) => {
    const demoUser = {
      id: `demo_${selectedRole.toLowerCase()}`,
      name: `Demo ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}`,
      email: `${selectedRole.toLowerCase()}@demo.local`,
      targetExam: "JEE Main & Advanced",
      role: selectedRole,
      isVerified: true
    };
    onLogin(demoUser);
  };
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const endpoint = view === "REGISTER" ? "/api/register.php" : "/api/login.php";
      const payload = view === "REGISTER" ? {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role
      } : {
        email: formData.email,
        password: formData.password
      };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed.");
      if (view === "REGISTER") {
        setView("LOGIN");
        setSuccessMessage("Registration successful! Please log in.");
      } else {
        onLogin({
          ...data.user,
          id: String(data.user.id),
          role: (data.user.role || "STUDENT").toUpperCase(),
          isVerified: data.user.is_verified == 1
        });
      }
    } catch (err) {
      setError(err.message || "Connection failed.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-inter relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EducationSketchBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/90 backdrop-blur-xl w-full max-w-[480px] rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative z-10 my-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-8 pb-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center ring-4 ring-slate-50 shadow-lg relative mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-blue-400 relative z-10", strokeWidth: 2.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: [
          "IIT",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "GEE" }),
          "Prep"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 uppercase tracking-widest mt-1", children: "Platform v12.22" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pb-10 flex-1 overflow-y-auto max-h-[75vh]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-6 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-slate-800", children: view === "REGISTER" ? "Create Account" : "Welcome Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setView(view === "LOGIN" ? "REGISTER" : "LOGIN");
            setError("");
          }, className: "text-sm font-medium text-blue-600 hover:text-blue-800", children: view === "REGISTER" ? "Back to Login" : "Create Account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          (googleConfig == null ? void 0 : googleConfig.enabled) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: googleBtnRef, className: "w-full min-h-[40px]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow border-t border-slate-200" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest", children: "or use email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow border-t border-slate-200" })
            ] })
          ] }),
          showDemo && view === "LOGIN" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("STUDENT"), className: "flex flex-col items-center justify-center p-2 rounded-xl border border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase", children: "Student" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("PARENT"), className: "flex flex-col items-center justify-center p-2 rounded-xl border border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100 transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, className: "mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase", children: "Parent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("ADMIN"), className: "flex flex-col items-center justify-center p-2 rounded-xl border border-purple-100 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16, className: "mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase", children: "Admin" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAuth, className: "space-y-5", children: [
            view === "REGISTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase ml-1", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-3.5 text-slate-400 w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Full Name", className: "w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase ml-1", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3.5 text-slate-400 w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "email@example.com", className: "w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase ml-1", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3.5 text-slate-400 w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", placeholder: "••••••••", className: "w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100", value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), required: true })
              ] })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-4 h-4" }),
              " ",
              error
            ] }),
            successMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-green-50 text-green-600 text-xs rounded-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }),
              " ",
              successMessage
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : view === "REGISTER" ? "Create Account" : "Sign In" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center relative z-10 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[10px] font-mono text-slate-300 tracking-widest", children: "STABLE RELEASE • v12.22" }) })
  ] });
};
export {
  AuthScreen
};
