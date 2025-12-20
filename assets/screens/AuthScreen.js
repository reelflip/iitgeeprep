import { r as reactExports, j as jsxRuntimeExports, s as TrendingUp, aS as WifiOff, a6 as CircleCheck, aT as GraduationCap, o as Users, aU as Building, b as ChevronDown, a8 as Target, i as Calendar, U as User, al as Mail, as as Lock, aC as Shield, av as Key, L as LoaderCircle, aj as ArrowRight } from "../vendor.js";
import { C as COACHING_INSTITUTES, T as TARGET_EXAMS, a as TARGET_YEARS } from "../shared-core.js";
const SECURITY_QUESTIONS = [
  "What is the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "In what city were you born?",
  "What is your favorite book?"
];
const FormLabel = ({ children, optional }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1", children: [
  children,
  " ",
  optional && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lowercase font-normal opacity-70", children: "(optional)" })
] });
const AuthScreen = ({ onLogin, onNavigate }) => {
  var _a;
  const [view, setView] = reactExports.useState("LOGIN");
  const [role, setRole] = reactExports.useState("STUDENT");
  const [error, setError] = reactExports.useState("");
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [googleConfig, setGoogleConfig] = reactExports.useState(null);
  const googleBtnRef = reactExports.useRef(null);
  const showDemo = ((_a = window.IITJEE_CONFIG) == null ? void 0 : _a.enableDemoLogin) ?? false;
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institute: "",
    targetExam: "JEE Main & Advanced",
    targetYear: 2025,
    dob: "",
    gender: "",
    securityQuestion: SECURITY_QUESTIONS[0],
    securityAnswer: ""
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
          setGoogleConfig({ enabled: true, clientId: clientIdData.value });
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
          width: 400,
          text: "signin_with",
          shape: "rectangular"
        });
      }
      if (view === "LOGIN") window.google.accounts.id.prompt();
    }
  }, [googleConfig, view, role]);
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
      onLogin({ ...data.user, id: String(data.user.id), role: (data.user.role || "STUDENT").toUpperCase(), isVerified: data.user.is_verified == 1 });
    } catch (err) {
      setError(err.message || "Google Login failed.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (view === "REGISTER" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const endpoint = view === "REGISTER" ? "/api/register.php" : "/api/login.php";
      const payload = view === "REGISTER" ? {
        ...formData,
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
        setSuccessMessage(`${role === "PARENT" ? "Parent" : "Student"} registration successful! Please log in.`);
      } else {
        onLogin({ ...data.user, id: String(data.user.id), role: (data.user.role || "STUDENT").toUpperCase(), isVerified: data.user.is_verified == 1 });
      }
    } catch (err) {
      setError(err.message || "Connection failed.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDemoLogin = (selectedRole) => {
    onLogin({
      id: `demo_${selectedRole.toLowerCase()}`,
      name: `Demo ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}`,
      email: `${selectedRole.toLowerCase()}@demo.local`,
      targetExam: "JEE Main & Advanced",
      role: selectedRole,
      isVerified: true
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 flex flex-col font-inter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center p-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[480px] space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-blue-600", strokeWidth: 3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-black text-slate-900 tracking-tighter uppercase", children: [
            "IIT",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "GEE" }),
            "Prep"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase", children: "Your Journey. Your Data." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10 animate-in fade-in zoom-in-95 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-slate-900", children: view === "REGISTER" ? "Create Account" : "Welcome Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setView(view === "LOGIN" ? "REGISTER" : "LOGIN");
                setError("");
                setSuccessMessage("");
              },
              className: "text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors",
              children: view === "LOGIN" ? "Register Now" : "Sign In"
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-3 border border-red-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { size: 16 }),
          " ",
          error
        ] }),
        successMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-green-50 text-green-700 text-xs font-bold rounded-xl flex items-center gap-3 border border-green-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }),
          " ",
          successMessage
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-100 p-1 rounded-xl mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setRole("STUDENT"),
              className: `flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${role === "STUDENT" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 16 }),
                " Student"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setRole("PARENT"),
              className: `flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${role === "PARENT" ? "bg-white text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 }),
                " Parent"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAuth, className: "space-y-6", children: [
          view === "REGISTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in slide-in-from-top-2", children: [
            role === "STUDENT" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Institute" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "absolute left-3 top-3 text-slate-300", size: 18 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      className: "w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-blue-100 outline-none",
                      value: formData.institute,
                      onChange: (e) => setFormData({ ...formData, institute: e.target.value }),
                      required: true,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Institute" }),
                        COACHING_INSTITUTES.map((inst) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: inst, children: inst }, inst))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-3.5 text-slate-400 pointer-events-none", size: 14 })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Target Exam" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "absolute left-3 top-3 text-slate-300", size: 18 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        className: "w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-blue-100 outline-none",
                        value: formData.targetExam,
                        onChange: (e) => setFormData({ ...formData, targetExam: e.target.value }),
                        children: TARGET_EXAMS.map((exam) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: exam, children: exam }, exam))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-3 text-slate-400 pointer-events-none", size: 14 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Year" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "absolute left-3 top-3 text-slate-300", size: 18 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        className: "w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-blue-100 outline-none",
                        value: formData.targetYear,
                        onChange: (e) => setFormData({ ...formData, targetYear: parseInt(e.target.value) }),
                        children: TARGET_YEARS.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: year, children: year }, year))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-3 text-slate-400 pointer-events-none", size: 14 })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { optional: true, children: "DOB" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "date",
                      className: "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none",
                      value: formData.dob,
                      onChange: (e) => setFormData({ ...formData, dob: e.target.value })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { optional: true, children: "Gender" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-blue-100 outline-none",
                        value: formData.gender,
                        onChange: (e) => setFormData({ ...formData, gender: e.target.value }),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MALE", children: "Male" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "FEMALE", children: "Female" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "OTHER", children: "Other" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-3 text-slate-400 pointer-events-none", size: 14 })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: role === "PARENT" ? "Parent Full Name" : "Student Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-3 text-slate-300", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: role === "PARENT" ? "Parent Full Name" : "Student Full Name",
                    className: "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none",
                    value: formData.name,
                    onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                    required: true
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3 text-slate-300", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "email",
                    placeholder: "student@example.com",
                    className: "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none",
                    value: formData.email,
                    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                    required: true
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3 text-slate-300", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "password",
                    placeholder: view === "REGISTER" ? "Create password" : "••••••••",
                    className: "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none",
                    value: formData.password,
                    onChange: (e) => setFormData({ ...formData, password: e.target.value }),
                    required: true
                  }
                )
              ] })
            ] }),
            view === "REGISTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Confirm Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3 text-slate-300", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "password",
                    placeholder: "Re-enter password",
                    className: "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none",
                    value: formData.confirmPassword,
                    onChange: (e) => setFormData({ ...formData, confirmPassword: e.target.value }),
                    required: true
                  }
                )
              ] })
            ] })
          ] }),
          view === "REGISTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "text-blue-600 w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black text-blue-900 uppercase tracking-widest", children: "Account Recovery Setup" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Security Question" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "absolute left-3 top-3 text-slate-300", size: 16 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    className: "w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs appearance-none focus:ring-2 focus:ring-blue-100 outline-none",
                    value: formData.securityQuestion,
                    onChange: (e) => setFormData({ ...formData, securityQuestion: e.target.value }),
                    children: SECURITY_QUESTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: q, children: q }, q))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-3 text-slate-400 pointer-events-none", size: 12 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Answer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. Fluffy",
                  className: "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-100 outline-none",
                  value: formData.securityAnswer,
                  onChange: (e) => setFormData({ ...formData, securityAnswer: e.target.value }),
                  required: view === "REGISTER"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: isLoading,
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                view === "REGISTER" ? "Create Account" : "Sign In",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
              ] })
            }
          )
        ] }),
        (googleConfig == null ? void 0 : googleConfig.enabled) && view === "LOGIN" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow border-t border-slate-100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink mx-4 text-[10px] font-black text-slate-300 uppercase tracking-widest", children: "or continue with" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow border-t border-slate-100" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: googleBtnRef, className: "w-full flex justify-center overflow-hidden rounded-xl" })
        ] }),
        showDemo && view === "LOGIN" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center", children: "Quick Demo Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("STUDENT"), className: "flex flex-col items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 transition-all group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "text-slate-400 group-hover:text-blue-600", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase text-slate-500", children: "Student" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("PARENT"), className: "flex flex-col items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-teal-500 transition-all group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "text-slate-400 group-hover:text-teal-600", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase text-slate-500", children: "Parent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("ADMIN"), className: "flex flex-col items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-500 transition-all group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "text-slate-400 group-hover:text-purple-600", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase text-slate-500", children: "Admin" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "w-full border-t border-slate-200 bg-white p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("about"), className: "hover:text-blue-600 transition-colors", children: "About Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("features"), className: "hover:text-blue-600 transition-colors", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("blog"), className: "hover:text-blue-600 transition-colors", children: "Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("contact"), className: "hover:text-blue-600 transition-colors", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("privacy"), className: "hover:text-blue-600 transition-colors", children: "Privacy Policy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center mt-6 text-[9px] font-medium text-slate-300 uppercase tracking-[0.3em]", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " IITGEEPrep • ULTIMATE v12.41"
      ] })
    ] })
  ] });
};
export {
  AuthScreen
};
