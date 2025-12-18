const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/screens/AuthScreen.js","assets/vendor.js","assets/screens/DashboardScreen.js","assets/shared-core.js","assets/screens/AdminDashboardScreen.js","assets/components/StatCard.js","assets/screens/SyllabusScreen.js","assets/components/BookReader.js","assets/screens/RevisionScreen.js","assets/screens/TimetableScreen.js","assets/screens/TestScreen.js","assets/screens/FlashcardScreen.js","assets/screens/MistakesScreen.js","assets/screens/AnalyticsScreen.js","assets/screens/WellnessScreen.js","assets/screens/BacklogScreen.js","assets/screens/HacksScreen.js","assets/screens/PsychometricScreen.js","assets/screens/AdminUserManagementScreen.js","assets/screens/AdminInboxScreen.js","assets/screens/AdminSyllabusScreen.js","assets/components/RichTextEditor.js","assets/screens/AdminTestManagerScreen.js","assets/components/Button.js","assets/screens/AdminAnalyticsScreen.js","assets/screens/AdminSystemScreen.js","assets/screens/DeploymentScreen.js","assets/screens/DiagnosticsScreen.js","assets/screens/ContentManagerScreen.js","assets/screens/AdminBlogScreen.js","assets/screens/PublicBlogScreen.js","assets/screens/AboutUsScreen.js","assets/screens/ExamGuideScreen.js","assets/screens/ContactUsScreen.js","assets/screens/PrivacyPolicyScreen.js","assets/screens/FeaturesScreen.js","assets/screens/ParentFamilyScreen.js","assets/screens/ProfileScreen.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as reactExports, b6 as React, j as jsxRuntimeExports, bF as createRoot } from "./vendor.js";
import { N as Navigation, M as MobileNavigation } from "./components/Navigation.js";
import { A as AITutorChat } from "./components/AITutorChat.js";
import { P as PublicLayout } from "./components/PublicLayout.js";
import { c as generateInitialQuestionBank, M as MOCK_TESTS_DATA, S as SYLLABUS_DATA, d as calculateNextRevision } from "./shared-core.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const AuthScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AuthScreen.js"), true ? __vite__mapDeps([0,1]) : void 0).then((m) => ({ default: m.AuthScreen })));
const DashboardScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DashboardScreen.js"), true ? __vite__mapDeps([2,1,3]) : void 0).then((m) => ({ default: m.DashboardScreen })));
const AdminDashboardScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminDashboardScreen.js"), true ? __vite__mapDeps([4,1,5]) : void 0).then((m) => ({ default: m.AdminDashboardScreen })));
const SyllabusScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/SyllabusScreen.js"), true ? __vite__mapDeps([6,1,7]) : void 0).then((m) => ({ default: m.SyllabusScreen })));
const RevisionScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/RevisionScreen.js"), true ? __vite__mapDeps([8,1,3]) : void 0).then((m) => ({ default: m.RevisionScreen })));
const TimetableScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/TimetableScreen.js"), true ? __vite__mapDeps([9,1,3]) : void 0).then((m) => ({ default: m.TimetableScreen })));
const TestScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/TestScreen.js"), true ? __vite__mapDeps([10,1]) : void 0).then((m) => ({ default: m.TestScreen })));
const FlashcardScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/FlashcardScreen.js"), true ? __vite__mapDeps([11,1]) : void 0).then((m) => ({ default: m.FlashcardScreen })));
const MistakesScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/MistakesScreen.js"), true ? __vite__mapDeps([12,1]) : void 0).then((m) => ({ default: m.MistakesScreen })));
const AnalyticsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AnalyticsScreen.js"), true ? __vite__mapDeps([13,1,3]) : void 0).then((m) => ({ default: m.AnalyticsScreen })));
const WellnessScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/WellnessScreen.js"), true ? __vite__mapDeps([14,1]) : void 0).then((m) => ({ default: m.WellnessScreen })));
const BacklogScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/BacklogScreen.js"), true ? __vite__mapDeps([15,1]) : void 0).then((m) => ({ default: m.BacklogScreen })));
const HacksScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/HacksScreen.js"), true ? __vite__mapDeps([16,1]) : void 0).then((m) => ({ default: m.HacksScreen })));
const PsychometricScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/PsychometricScreen.js"), true ? __vite__mapDeps([17,1,3]) : void 0).then((m) => ({ default: m.PsychometricScreen })));
const AdminUserManagementScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminUserManagementScreen.js"), true ? __vite__mapDeps([18,1]) : void 0).then((m) => ({ default: m.AdminUserManagementScreen })));
const AdminInboxScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminInboxScreen.js"), true ? __vite__mapDeps([19,1]) : void 0).then((m) => ({ default: m.AdminInboxScreen })));
const AdminSyllabusScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminSyllabusScreen.js"), true ? __vite__mapDeps([20,1,21]) : void 0).then((m) => ({ default: m.AdminSyllabusScreen })));
const AdminTestManagerScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminTestManagerScreen.js"), true ? __vite__mapDeps([22,1,23,3]) : void 0).then((m) => ({ default: m.AdminTestManagerScreen })));
const AdminAnalyticsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminAnalyticsScreen.js"), true ? __vite__mapDeps([24,1]) : void 0).then((m) => ({ default: m.AdminAnalyticsScreen })));
const AdminSystemScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminSystemScreen.js"), true ? __vite__mapDeps([25,1]) : void 0).then((m) => ({ default: m.AdminSystemScreen })));
const DeploymentScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DeploymentScreen.js"), true ? __vite__mapDeps([26,1,3]) : void 0).then((m) => ({ default: m.DeploymentScreen })));
const DiagnosticsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DiagnosticsScreen.js"), true ? __vite__mapDeps([27,1,3]) : void 0).then((m) => ({ default: m.DiagnosticsScreen })));
const ContentManagerScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ContentManagerScreen.js"), true ? __vite__mapDeps([28,1]) : void 0).then((m) => ({ default: m.ContentManagerScreen })));
const AdminBlogScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminBlogScreen.js"), true ? __vite__mapDeps([29,1,21]) : void 0).then((m) => ({ default: m.AdminBlogScreen })));
const PublicBlogScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/PublicBlogScreen.js"), true ? __vite__mapDeps([30,1]) : void 0).then((m) => ({ default: m.PublicBlogScreen })));
const AboutUsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AboutUsScreen.js"), true ? __vite__mapDeps([31,1]) : void 0).then((m) => ({ default: m.AboutUsScreen })));
const ExamGuideScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ExamGuideScreen.js"), true ? __vite__mapDeps([32,1]) : void 0).then((m) => ({ default: m.ExamGuideScreen })));
const ContactUsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ContactUsScreen.js"), true ? __vite__mapDeps([33,1,23]) : void 0).then((m) => ({ default: m.ContactUsScreen })));
const PrivacyPolicyScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/PrivacyPolicyScreen.js"), true ? __vite__mapDeps([34,1]) : void 0).then((m) => ({ default: m.PrivacyPolicyScreen })));
const FeaturesScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/FeaturesScreen.js"), true ? __vite__mapDeps([35,1]) : void 0).then((m) => ({ default: m.FeaturesScreen })));
const ParentFamilyScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ParentFamilyScreen.js"), true ? __vite__mapDeps([36,1,17,3]) : void 0).then((m) => ({ default: m.ParentFamilyScreen })));
const ProfileScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ProfileScreen.js"), true ? __vite__mapDeps([37,1,3]) : void 0).then((m) => ({ default: m.ProfileScreen })));
class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);
    // Fix: Removed redundant constructor and initialized state directly for better type inference.
    __publicField(this, "state", { hasError: false });
  }
  // Fix: Added error parameter to static getDerivedStateFromError to correctly implement the error boundary.
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("App Crash:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-slate-800 mb-2", children: "Something went wrong." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mb-6", children: "The application crashed. Please refresh to try again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.reload(), className: "bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200", children: "Refresh App" })
      ] });
    }
    return this.props.children;
  }
}
const LoadingView = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-slate-400", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest", children: "Loading Module..." })
] });
const App = () => {
  const [user, setUser] = reactExports.useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentScreen, setScreen] = reactExports.useState(() => {
    const saved = localStorage.getItem("last_screen");
    return saved || "dashboard";
  });
  const [progress, setProgress] = reactExports.useState({});
  const [testAttempts, setTestAttempts] = reactExports.useState([]);
  const [goals, setGoals] = reactExports.useState([]);
  const [mistakes, setMistakes] = reactExports.useState([]);
  const [backlogs, setBacklogs] = reactExports.useState([]);
  const [flashcards, setFlashcards] = reactExports.useState([]);
  const [hacks, setHacks] = reactExports.useState([]);
  const [blogs, setBlogs] = reactExports.useState([]);
  const [timetable, setTimetable] = reactExports.useState({});
  const [questionBank, setQuestionBank] = reactExports.useState(generateInitialQuestionBank());
  const [tests, setTests] = reactExports.useState(MOCK_TESTS_DATA);
  const [chapterNotes, setChapterNotes] = reactExports.useState({});
  const [videoMap, setVideoMap] = reactExports.useState({});
  const [linkedData, setLinkedData] = reactExports.useState();
  reactExports.useEffect(() => {
    if (user) {
      const isAdmin = user.role === "ADMIN" || user.role === "ADMIN_EXECUTIVE";
      if (isAdmin && currentScreen === "dashboard") {
        setScreen("overview");
      } else if (user.role === "STUDENT" && currentScreen === "overview") {
        setScreen("dashboard");
      } else if (user.role === "PARENT" && currentScreen === "overview") {
        setScreen("dashboard");
      }
    }
  }, [user == null ? void 0 : user.role, currentScreen]);
  reactExports.useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);
  reactExports.useEffect(() => {
    localStorage.setItem("last_screen", currentScreen);
  }, [currentScreen]);
  const loadDashboard = reactExports.useCallback(async (userId) => {
    try {
      const res = await fetch(`/api/get_dashboard.php?user_id=${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.progress) {
          const progMap = {};
          data.progress.forEach((p) => {
            progMap[p.topic_id] = {
              topicId: p.topic_id,
              status: p.status,
              lastRevised: p.last_revised,
              revisionLevel: p.revision_level,
              nextRevisionDate: p.next_revision_date,
              solvedQuestions: p.solved_questions_json ? JSON.parse(p.solved_questions_json) : []
            };
          });
          setProgress(progMap);
        }
        if (data.attempts) setTestAttempts(data.attempts);
        if (data.goals) setGoals(data.goals.map((g) => ({ ...g, completed: g.completed == 1 })));
        if (data.mistakes) setMistakes(data.mistakes);
        if (data.backlogs) setBacklogs(data.backlogs);
        if (data.timetable) setTimetable(data.timetable);
        if (data.notifications && data.userProfileSync) {
          setUser({ ...data.userProfileSync, notifications: data.notifications });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  reactExports.useEffect(() => {
    if (user) {
      loadDashboard(user.id);
      window.setCurrentScreen = (s) => setScreen(s);
    }
  }, [user == null ? void 0 : user.id, loadDashboard]);
  reactExports.useEffect(() => {
    const loadGlobalContent = async () => {
      try {
        const [bRes, fRes, hRes, nRes] = await Promise.all([
          fetch("/api/manage_content.php?type=blog"),
          fetch("/api/manage_content.php?type=flashcard"),
          fetch("/api/manage_content.php?type=hack"),
          fetch("/api/manage_notes.php")
        ]);
        if (bRes.ok) setBlogs((await bRes.json()).map((b) => ({ ...JSON.parse(b.content_json), id: b.id, date: b.created_at })));
        if (fRes.ok) setFlashcards((await fRes.json()).map((f) => ({ ...JSON.parse(f.content_json), id: f.id })));
        if (hRes.ok) setHacks((await hRes.json()).map((h) => ({ ...JSON.parse(h.content_json), id: h.id })));
        if (nRes.ok) setChapterNotes(await nRes.json());
      } catch (e) {
      }
    };
    loadGlobalContent();
  }, []);
  const handleLogin = (u) => {
    setUser(u);
    const isAdmin = u.role === "ADMIN" || u.role === "ADMIN_EXECUTIVE";
    setScreen(isAdmin ? "overview" : "dashboard");
  };
  const handleLogout = () => {
    setUser(null);
    setScreen("dashboard");
    localStorage.clear();
  };
  const updateProgress = async (topicId, updates) => {
    const current = progress[topicId] || { topicId, status: "NOT_STARTED", lastRevised: null, revisionLevel: 0, nextRevisionDate: null, solvedQuestions: [] };
    const updated = { ...current, ...updates };
    if (updates.status === "COMPLETED" && !updated.nextRevisionDate) {
      updated.lastRevised = (/* @__PURE__ */ new Date()).toISOString();
      updated.nextRevisionDate = calculateNextRevision(0, updated.lastRevised);
    }
    setProgress((prev) => ({ ...prev, [topicId]: updated }));
    if (user) {
      try {
        await fetch("/api/sync_progress.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id, ...updated })
        });
      } catch (e) {
      }
    }
  };
  const handleRevisionComplete = (topicId) => {
    const current = progress[topicId];
    if (!current) return;
    const nextLevel = Math.min(current.revisionLevel + 1, 4);
    const lastRevised = (/* @__PURE__ */ new Date()).toISOString();
    const nextRevisionDate = calculateNextRevision(nextLevel, lastRevised);
    updateProgress(topicId, { revisionLevel: nextLevel, lastRevised, nextRevisionDate });
  };
  const toggleGoal = async (id) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const newState = !goal.completed;
    setGoals(goals.map((g) => g.id === id ? { ...g, completed: newState } : g));
    try {
      await fetch("/api/manage_goals.php", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, completed: newState }) });
    } catch (e) {
    }
  };
  const addGoal = async (text) => {
    const newGoal = { id: `g_${Date.now()}`, text, completed: false };
    setGoals([...goals, newGoal]);
    if (user) {
      try {
        await fetch("/api/manage_goals.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newGoal, user_id: user.id }) });
      } catch (e) {
      }
    }
  };
  if (!user) {
    const publicScreens = ["about", "blog", "exams", "privacy", "contact", "features"];
    if (publicScreens.includes(currentScreen)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { onNavigate: setScreen, currentScreen, children: [
        currentScreen === "about" && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutUsScreen, {}),
        currentScreen === "blog" && /* @__PURE__ */ jsxRuntimeExports.jsx(PublicBlogScreen, { blogs, onBack: () => setScreen("dashboard") }),
        currentScreen === "exams" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExamGuideScreen, {}),
        currentScreen === "privacy" && /* @__PURE__ */ jsxRuntimeExports.jsx(PrivacyPolicyScreen, {}),
        currentScreen === "contact" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactUsScreen, {}),
        currentScreen === "features" && /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesScreen, {})
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthScreen, { onLogin: handleLogin, onNavigate: setScreen }) });
  }
  const isAdminRole = user.role === "ADMIN" || user.role === "ADMIN_EXECUTIVE";
  const renderContent = () => {
    switch (currentScreen) {
      case "dashboard":
      case "overview":
        return isAdminRole ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboardScreen, { user, onNavigate: setScreen, messageCount: 0 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress, testAttempts, goals, toggleGoal, addGoal, setScreen });
      case "syllabus":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SyllabusScreen, { user, subjects: SYLLABUS_DATA, progress, onUpdateProgress: updateProgress, chapterNotes, videoMap, questionBank });
      case "tests":
        return isAdminRole ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTestManagerScreen, { questionBank, tests, syllabus: SYLLABUS_DATA, onAddQuestion: (q) => setQuestionBank([...questionBank, q]), onCreateTest: (t) => setTests([...tests, t]), onDeleteQuestion: (id) => setQuestionBank(questionBank.filter((q) => q.id !== id)), onDeleteTest: (id) => setTests(tests.filter((t) => t.id !== id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TestScreen, { user, addTestAttempt: (a) => setTestAttempts([...testAttempts, a]), history: testAttempts, availableTests: tests });
      case "analytics":
        return isAdminRole ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminAnalyticsScreen, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsScreen, { user, progress, testAttempts });
      case "timetable":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TimetableScreen, { user, savedConfig: timetable.config, savedSlots: timetable.slots, onSave: (c, s) => setTimetable({ config: c, slots: s }) });
      case "revision":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RevisionScreen, { progress, handleRevisionComplete });
      case "mistakes":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MistakesScreen, { mistakes, addMistake: (m) => setMistakes([...mistakes, { ...m, id: `m_${Date.now()}`, date: (/* @__PURE__ */ new Date()).toISOString() }]) });
      case "flashcards":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FlashcardScreen, { flashcards });
      case "backlogs":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BacklogScreen, { backlogs, onAddBacklog: (b) => setBacklogs([...backlogs, { ...b, id: `b_${Date.now()}`, status: "PENDING" }]), onToggleBacklog: (id) => setBacklogs(backlogs.map((b) => b.id === id ? { ...b, status: b.status === "PENDING" ? "COMPLETED" : "PENDING" } : b)), onDeleteBacklog: (id) => setBacklogs(backlogs.filter((b) => b.id !== id)) });
      case "hacks":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HacksScreen, { hacks });
      case "wellness":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(WellnessScreen, {});
      case "profile":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileScreen, { user, onAcceptRequest: () => {
        }, onUpdateUser: (upd) => setUser({ ...user, ...upd }) });
      case "psychometric":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PsychometricScreen, { user });
      case "family":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ParentFamilyScreen, { user, onSendRequest: async (id) => ({ success: true, message: "Request sent" }), linkedData });
      case "users":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminUserManagementScreen, {});
      case "inbox":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminInboxScreen, {});
      case "syllabus_admin":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSyllabusScreen, { syllabus: SYLLABUS_DATA, onAddTopic: () => {
        }, onDeleteTopic: () => {
        }, chapterNotes, onUpdateNotes: (id, p) => setChapterNotes({ ...chapterNotes, [id]: { id: 0, topicId: id, pages: p, lastUpdated: (/* @__PURE__ */ new Date()).toISOString() } }) });
      case "content":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ContentManagerScreen, { flashcards, hacks, blogs, onAddFlashcard: (c) => setFlashcards([...flashcards, { ...c, id: Date.now() }]), onAddHack: (h) => setHacks([...hacks, { ...h, id: Date.now() }]), onAddBlog: (b) => setBlogs([...blogs, { ...b, id: Date.now(), date: (/* @__PURE__ */ new Date()).toISOString() }]), onDelete: () => {
        } });
      case "blog_admin":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminBlogScreen, { blogs, onAddBlog: (b) => setBlogs([...blogs, b]), onDeleteBlog: (id) => setBlogs(blogs.filter((b) => b.id !== id)) });
      case "diagnostics":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DiagnosticsScreen, {});
      case "deployment":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DeploymentScreen, {});
      case "system":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSystemScreen, {});
      case "ai-tutor":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AITutorChat, { isFullScreen: true });
      default:
        return isAdminRole ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboardScreen, { user, onNavigate: setScreen }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress, testAttempts, goals, toggleGoal, addGoal, setScreen });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-50 min-h-screen font-inter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { currentScreen, setScreen, logout: handleLogout, user }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8 max-w-[1600px] mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, {}), children: renderContent() }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavigation, { currentScreen, setScreen, logout: handleLogout, user }),
    user.role === "STUDENT" && currentScreen !== "ai-tutor" && /* @__PURE__ */ jsxRuntimeExports.jsx(AITutorChat, {})
  ] }) });
};
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
