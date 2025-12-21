import { r as reactExports, j as jsxRuntimeExports, $ as TrendingUp, aL as Info, l as Layers, c as BookOpen, P as PenTool, aM as MessageSquare, X, aN as Menu, aO as WifiOff, Y as CircleCheck, aP as GraduationCap, o as Users, U as User, ad as Mail, aQ as Building, a0 as Target, i as Calendar, al as Lock, av as Shield, ao as Key, L as LoaderCircle, ab as ArrowRight } from "../vendor.js";
import { T as TARGET_YEARS, a as TARGET_EXAMS, C as COACHING_INSTITUTES } from "../shared-core.js";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = reactExports.useState(false);
  const showDemo = ((_a = window.IITJEE_CONFIG) == null ? void 0 : _a.enableDemoLogin) ?? false;
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institute: COACHING_INSTITUTES[0],
    targetExam: TARGET_EXAMS[0],
    targetYear: TARGET_YEARS[0],
    dob: "",
    gender: "",
    securityQuestion: SECURITY_QUESTIONS[0],
    securityAnswer: ""
  });
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (view === "REGISTER") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!formData.securityAnswer) {
        setError("Security answer is required for recovery.");
        return;
      }
    }
    setIsLoading(true);
    try {
      const endpoint = view === "REGISTER" ? "/api/register.php" : "/api/login.php";
      const payload = view === "REGISTER" ? { ...formData, role } : { email: formData.email, password: formData.password };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }
      if (view === "REGISTER") {
        setView("LOGIN");
        setSuccessMessage("Account created successfully! Please log in with your credentials.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        if (!data.user) {
          throw new Error("Server returned success but no user data found.");
        }
        onLogin({
          ...data.user,
          id: String(data.user.id),
          role: (data.user.role || "STUDENT").toUpperCase(),
          isVerified: data.user.is_verified == 1
        });
      }
    } catch (err) {
      setError(err.message || "Connection failed. Please check your internet or server settings.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDemoLogin = (selectedRole) => {
    onLogin({ id: `demo_${selectedRole.toLowerCase()}`, name: `Demo ${selectedRole}`, email: `${selectedRole.toLowerCase()}@demo.local`, targetExam: "JEE Main & Advanced", role: selectedRole, isVerified: true });
  };
  const navLinks = [
    { label: "About", screen: "about", icon: Info },
    { label: "Features", screen: "features", icon: Layers },
    { label: "Exam Guide", screen: "exams", icon: BookOpen },
    { label: "Blog", screen: "blog", icon: PenTool },
    { label: "Contact", screen: "contact", icon: MessageSquare }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 flex flex-col font-inter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-blue-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-xl text-slate-900 tracking-tighter uppercase", children: [
            "IIT",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "GEE" }),
            "Prep"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-8", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onNavigate(link.screen),
            className: "text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest",
            children: link.label
          },
          link.screen
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setView(view === "LOGIN" ? "REGISTER" : "LOGIN"),
              className: "hidden sm:block text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800",
              children: view === "LOGIN" ? "Create Account" : "Back to Login"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              className: "lg:hidden p-2 text-slate-500",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {})
            }
          )
        ] })
      ] }),
      isMobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden bg-white border-t border-slate-100 p-4 absolute w-full shadow-xl animate-in slide-in-from-top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            onNavigate(link.screen);
            setIsMobileMenuOpen(false);
          },
          className: "flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { size: 16, className: "text-blue-500" }),
            link.label
          ]
        },
        link.screen
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center p-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full ${view === "REGISTER" ? "max-w-3xl" : "max-w-[480px]"} space-y-8`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-blue-600", strokeWidth: 3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-black text-slate-900 tracking-tighter uppercase", children: [
            "IIT",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "GEE" }),
            "Prep"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase", children: "v13.5 Ultimate Sync Core" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-12 animate-in fade-in zoom-in-95 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-slate-900", children: view === "REGISTER" ? "Restored Registration" : "Welcome Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setView(view === "LOGIN" ? "REGISTER" : "LOGIN"), className: "text-sm font-bold text-blue-600 hover:text-blue-800", children: view === "LOGIN" ? "Register Now" : "Sign In" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAuth, className: "space-y-8", children: [
          view === "REGISTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Account Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-100 p-1 rounded-2xl border border-slate-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setRole("STUDENT"),
                    className: `flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${role === "STUDENT" ? "bg-white text-blue-600 shadow-md" : "text-slate-400"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 16 }),
                      " Aspirant"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setRole("PARENT"),
                    className: `flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${role === "PARENT" ? "bg-white text-teal-600 shadow-md" : "text-slate-400"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 }),
                      " Guardian"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-3.5 text-slate-300", size: 18 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "John Doe", className: "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), required: true })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3.5 text-slate-300", size: 18 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "student@example.com", className: "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), required: true })
                ] })
              ] })
            ] }),
            role === "STUDENT" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Institute" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "absolute left-3 top-3.5 text-slate-300", size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm outline-none appearance-none", value: formData.institute, onChange: (e) => setFormData({ ...formData, institute: e.target.value }), children: COACHING_INSTITUTES.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i, children: i }, i)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Target Exam" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "absolute left-3 top-3.5 text-slate-300", size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm outline-none appearance-none", value: formData.targetExam, onChange: (e) => setFormData({ ...formData, targetExam: e.target.value }), children: TARGET_EXAMS.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: ex, children: ex }, ex)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Target Year" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "absolute left-3 top-3.5 text-slate-300", size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm outline-none appearance-none", value: formData.targetYear, onChange: (e) => setFormData({ ...formData, targetYear: parseInt(e.target.value) }), children: TARGET_YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y)) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Birth Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: "w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm", value: formData.dob, onChange: (e) => setFormData({ ...formData, dob: e.target.value }), required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Gender" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm outline-none", value: formData.gender, onChange: (e) => setFormData({ ...formData, gender: e.target.value }), required: true, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Gender" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MALE", children: "Male" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "FEMALE", children: "Female" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "OTHER", children: "Other" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3.5 text-slate-300", size: 18 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", placeholder: "••••••••", className: "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all", value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), required: true })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Confirm Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3.5 text-slate-300", size: 18 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", placeholder: "••••••••", className: "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all", value: formData.confirmPassword, onChange: (e) => setFormData({ ...formData, confirmPassword: e.target.value }), required: true })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-4 border-t border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 14 }),
                " Account Recovery Setup"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Security Question" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none", value: formData.securityQuestion, onChange: (e) => setFormData({ ...formData, securityQuestion: e.target.value }), children: SECURITY_QUESTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: q, children: q }, q)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Answer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "absolute left-3 top-3.5 text-slate-300", size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Your Answer", className: "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100", value: formData.securityAnswer, onChange: (e) => setFormData({ ...formData, securityAnswer: e.target.value }), required: true })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          view === "LOGIN" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3.5 text-slate-300", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "student@example.com", className: "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3.5 text-slate-300", size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", placeholder: "••••••••", className: "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all", value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), required: true })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            view === "REGISTER" ? "Initialize v13.5 Account" : "Secure Entry",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
          ] }) })
        ] }),
        showDemo && view === "LOGIN" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-8 border-t border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center", children: "Quick Access Simulator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("STUDENT"), className: "flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-white transition-all group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "text-slate-400 group-hover:text-blue-600", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase text-slate-500 group-hover:text-blue-900", children: "Student" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("PARENT"), className: "flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-teal-500 hover:bg-white transition-all group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "text-slate-400 group-hover:text-teal-600", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase text-slate-500 group-hover:text-teal-900", children: "Parent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDemoLogin("ADMIN"), className: "flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-purple-500 hover:bg-white transition-all group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "text-slate-400 group-hover:text-purple-600", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase text-slate-500 group-hover:text-purple-900", children: "Admin" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 font-medium", children: [
        "Need help? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("contact"), className: "text-blue-600 font-bold hover:underline", children: "Contact Support" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "w-full border-t border-slate-200 bg-white p-6 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " IITGEEPrep • ULTIMATE v13.5 MASTER SYNC"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("privacy"), className: "text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600", children: "Privacy Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase tracking-widest text-slate-300", children: "Terms of Service" })
      ] })
    ] }) })
  ] });
};
export {
  AuthScreen
};
