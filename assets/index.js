const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/screens/AuthScreen.js","assets/vendor.js","assets/shared-core.js","assets/screens/DashboardScreen.js","assets/screens/AdminDashboardScreen.js","assets/components/StatCard.js","assets/screens/SyllabusScreen.js","assets/components/BookReader.js","assets/screens/RevisionScreen.js","assets/screens/TimetableScreen.js","assets/screens/TestScreen.js","assets/screens/FlashcardScreen.js","assets/screens/MistakesScreen.js","assets/screens/AnalyticsScreen.js","assets/screens/WellnessScreen.js","assets/screens/BacklogScreen.js","assets/screens/HacksScreen.js","assets/screens/PsychometricScreen.js","assets/screens/AdminUserManagementScreen.js","assets/screens/AdminInboxScreen.js","assets/screens/AdminSyllabusScreen.js","assets/components/RichTextEditor.js","assets/screens/AdminTestManagerScreen.js","assets/components/Button.js","assets/screens/AdminAnalyticsScreen.js","assets/screens/AdminSystemScreen.js","assets/screens/DeploymentScreen.js","assets/screens/DiagnosticsScreen.js","assets/screens/ContentManagerScreen.js","assets/screens/AdminBlogScreen.js","assets/screens/PublicBlogScreen.js","assets/screens/AboutUsScreen.js","assets/screens/ExamGuideScreen.js","assets/screens/ContactUsScreen.js","assets/screens/PrivacyPolicyScreen.js","assets/screens/FeaturesScreen.js","assets/screens/ParentFamilyScreen.js","assets/screens/ProfileScreen.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as reactExports, ba as React, j as jsxRuntimeExports, bB as createRoot } from "./vendor.js";
import { N as Navigation, M as MobileNavigation } from "./components/Navigation.js";
import { A as AITutorChat } from "./components/AITutorChat.js";
import { P as PublicLayout } from "./components/PublicLayout.js";
import { d as generateInitialQuestionBank, M as MOCK_TESTS_DATA, S as SYLLABUS_DATA } from "./shared-core.js";
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
const AuthScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AuthScreen.js"), true ? __vite__mapDeps([0,1,2]) : void 0).then((m) => ({ default: m.AuthScreen })));
const DashboardScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DashboardScreen.js"), true ? __vite__mapDeps([3,1,2]) : void 0).then((m) => ({ default: m.DashboardScreen })));
const AdminDashboardScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminDashboardScreen.js"), true ? __vite__mapDeps([4,1,5]) : void 0).then((m) => ({ default: m.AdminDashboardScreen })));
const SyllabusScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/SyllabusScreen.js"), true ? __vite__mapDeps([6,1,7]) : void 0).then((m) => ({ default: m.SyllabusScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/RevisionScreen.js"), true ? __vite__mapDeps([8,1,2]) : void 0).then((m) => ({ default: m.RevisionScreen })));
const TimetableScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/TimetableScreen.js"), true ? __vite__mapDeps([9,1,2]) : void 0).then((m) => ({ default: m.TimetableScreen })));
const TestScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/TestScreen.js"), true ? __vite__mapDeps([10,1]) : void 0).then((m) => ({ default: m.TestScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/FlashcardScreen.js"), true ? __vite__mapDeps([11,1]) : void 0).then((m) => ({ default: m.FlashcardScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/MistakesScreen.js"), true ? __vite__mapDeps([12,1]) : void 0).then((m) => ({ default: m.MistakesScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/AnalyticsScreen.js"), true ? __vite__mapDeps([13,1,2]) : void 0).then((m) => ({ default: m.AnalyticsScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/WellnessScreen.js"), true ? __vite__mapDeps([14,1]) : void 0).then((m) => ({ default: m.WellnessScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/BacklogScreen.js"), true ? __vite__mapDeps([15,1]) : void 0).then((m) => ({ default: m.BacklogScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/HacksScreen.js"), true ? __vite__mapDeps([16,1]) : void 0).then((m) => ({ default: m.HacksScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/PsychometricScreen.js"), true ? __vite__mapDeps([17,1,2]) : void 0).then((m) => ({ default: m.PsychometricScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/AdminUserManagementScreen.js"), true ? __vite__mapDeps([18,1]) : void 0).then((m) => ({ default: m.AdminUserManagementScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/AdminInboxScreen.js"), true ? __vite__mapDeps([19,1]) : void 0).then((m) => ({ default: m.AdminInboxScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/AdminSyllabusScreen.js"), true ? __vite__mapDeps([20,1,21]) : void 0).then((m) => ({ default: m.AdminSyllabusScreen })));
const AdminTestManagerScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminTestManagerScreen.js"), true ? __vite__mapDeps([22,1,23,2]) : void 0).then((m) => ({ default: m.AdminTestManagerScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/AdminAnalyticsScreen.js"), true ? __vite__mapDeps([24,1]) : void 0).then((m) => ({ default: m.AdminAnalyticsScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/AdminSystemScreen.js"), true ? __vite__mapDeps([25,1]) : void 0).then((m) => ({ default: m.AdminSystemScreen })));
const DeploymentScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DeploymentScreen.js"), true ? __vite__mapDeps([26,1,2]) : void 0).then((m) => ({ default: m.DeploymentScreen })));
const DiagnosticsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DiagnosticsScreen.js"), true ? __vite__mapDeps([27,1,2]) : void 0).then((m) => ({ default: m.DiagnosticsScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/ContentManagerScreen.js"), true ? __vite__mapDeps([28,1]) : void 0).then((m) => ({ default: m.ContentManagerScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/AdminBlogScreen.js"), true ? __vite__mapDeps([29,1,21]) : void 0).then((m) => ({ default: m.AdminBlogScreen })));
const PublicBlogScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/PublicBlogScreen.js"), true ? __vite__mapDeps([30,1]) : void 0).then((m) => ({ default: m.PublicBlogScreen })));
const AboutUsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AboutUsScreen.js"), true ? __vite__mapDeps([31,1]) : void 0).then((m) => ({ default: m.AboutUsScreen })));
const ExamGuideScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ExamGuideScreen.js"), true ? __vite__mapDeps([32,1]) : void 0).then((m) => ({ default: m.ExamGuideScreen })));
const ContactUsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ContactUsScreen.js"), true ? __vite__mapDeps([33,1,23]) : void 0).then((m) => ({ default: m.ContactUsScreen })));
const PrivacyPolicyScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/PrivacyPolicyScreen.js"), true ? __vite__mapDeps([34,1]) : void 0).then((m) => ({ default: m.PrivacyPolicyScreen })));
const FeaturesScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/FeaturesScreen.js"), true ? __vite__mapDeps([35,1]) : void 0).then((m) => ({ default: m.FeaturesScreen })));
reactExports.lazy(() => __vitePreload(() => import("./screens/ParentFamilyScreen.js"), true ? __vite__mapDeps([36,1,17,2]) : void 0).then((m) => ({ default: m.ParentFamilyScreen })));
const ProfileScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ProfileScreen.js"), true ? __vite__mapDeps([37,1,2]) : void 0).then((m) => ({ default: m.ProfileScreen })));
class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", { hasError: false });
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-slate-800 mb-6", children: "Persistence Sync Error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.reload(), className: "bg-blue-600 text-white px-8 py-3 rounded-xl font-bold", children: "Restart App" })
      ] });
    }
    return this.props.children;
  }
}
const LoadingView = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-slate-400", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest", children: "Synchronizing Persistence..." })
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
  const clearState = reactExports.useCallback(() => {
    setProgress({});
    setTestAttempts([]);
    setGoals([]);
    setMistakes([]);
    setBacklogs([]);
    setTimetable({});
    setLinkedData(void 0);
  }, []);
  const mapProgress = (p) => ({
    topicId: p.topic_id || p.topicId,
    status: p.status,
    lastRevised: p.last_revised || p.lastRevised,
    revisionLevel: Number(p.revision_level || p.revisionLevel || 0),
    nextRevisionDate: p.next_revision_date || p.nextRevisionDate,
    solvedQuestions: p.solved_questions_json ? JSON.parse(p.solved_questions_json) : p.solvedQuestions || []
  });
  const mapAttempt = (a) => ({
    id: a.id,
    date: a.date,
    title: a.title || "Mock Test",
    score: Number(a.score),
    totalMarks: Number(a.total_marks || a.totalMarks),
    accuracy: Number(a.accuracy || a.accuracy_percent),
    accuracy_percent: Number(a.accuracy_percent || a.accuracy),
    testId: a.test_id || a.testId,
    totalQuestions: Number(a.total_questions || a.totalQuestions),
    correctCount: Number(a.correct_count || a.correctCount),
    incorrectCount: Number(a.incorrect_count || a.incorrectCount),
    unattemptedCount: Number(a.unattempted_count || a.unattemptedCount),
    topicId: a.topic_id || a.topicId,
    difficulty: a.difficulty,
    detailedResults: a.detailed_results ? JSON.parse(a.detailed_results) : a.detailedResults || []
  });
  const loadDashboard = reactExports.useCallback(async (userId) => {
    var _a, _b;
    try {
      const res = await fetch(`/api/get_dashboard.php?user_id=${userId}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) {
          const progMap = {};
          data.progress.forEach((p) => {
            const mapped = mapProgress(p);
            progMap[mapped.topicId] = mapped;
          });
          setProgress(progMap);
        }
        if (data.attempts) setTestAttempts(data.attempts.map(mapAttempt));
        if (data.goals) setGoals(data.goals.map((g) => ({ ...g, completed: g.completed == 1 })));
        if (data.timetable) setTimetable({
          config: data.timetable.config_json ? JSON.parse(data.timetable.config_json) : void 0,
          slots: data.timetable.slots_json ? JSON.parse(data.timetable.slots_json) : []
        });
        if (data.userProfileSync) {
          const updatedUser = { ...data.userProfileSync, notifications: data.notifications || [] };
          setUser(updatedUser);
          if (updatedUser.role === "PARENT" && updatedUser.linkedStudentId) {
            const sRes = await fetch(`/api/get_dashboard.php?user_id=${updatedUser.linkedStudentId}`);
            if (sRes.ok) {
              const sData = await sRes.json();
              const sProgMap = {};
              (_a = sData.progress) == null ? void 0 : _a.forEach((p) => {
                const mapped = mapProgress(p);
                sProgMap[mapped.topicId] = mapped;
              });
              setLinkedData({ progress: sProgMap, tests: (sData.attempts || []).map(mapAttempt), studentName: ((_b = sData.userProfileSync) == null ? void 0 : _b.name) || "Student" });
            }
          }
        }
      }
    } catch (e) {
      console.error("Persistence Sync Failed:", e);
    }
  }, []);
  reactExports.useEffect(() => {
    if (user) {
      loadDashboard(user.id);
      window.setCurrentScreen = (s) => setScreen(s);
    }
  }, [user == null ? void 0 : user.id, loadDashboard]);
  reactExports.useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);
  reactExports.useEffect(() => {
    localStorage.setItem("last_screen", currentScreen);
  }, [currentScreen]);
  const handleLogin = (u) => {
    clearState();
    setUser(u);
    setScreen(u.role.includes("ADMIN") ? "overview" : "dashboard");
  };
  const handleLogout = () => {
    setUser(null);
    clearState();
    setScreen("dashboard");
    localStorage.clear();
  };
  const handleAddTestAttempt = async (attempt) => {
    setTestAttempts((prev) => [attempt, ...prev]);
    if (user && !user.id.startsWith("demo_")) {
      await fetch("/api/save_attempt.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...attempt, user_id: user.id })
      });
    }
  };
  const updateProgress = async (topicId, updates) => {
    const current = progress[topicId] || { topicId, status: "NOT_STARTED", lastRevised: null, revisionLevel: 0, nextRevisionDate: null, solvedQuestions: [] };
    const updated = { ...current, ...updates };
    setProgress((prev) => ({ ...prev, [topicId]: updated }));
    if (user && !user.id.startsWith("demo_")) {
      await fetch("/api/sync_progress.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, ...updated })
      });
    }
  };
  const handleSaveTimetable = async (config, slots) => {
    setTimetable({ config, slots });
    if (user && !user.id.startsWith("demo_")) {
      await fetch("/api/save_timetable.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, config, slots })
      });
    }
  };
  const renderContent = () => {
    const isAdminRole = (user == null ? void 0 : user.role) === "ADMIN" || (user == null ? void 0 : user.role) === "ADMIN_EXECUTIVE";
    switch (currentScreen) {
      case "dashboard":
      case "overview":
        return isAdminRole ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboardScreen, { user, onNavigate: setScreen }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress: (linkedData == null ? void 0 : linkedData.progress) || progress, testAttempts: (linkedData == null ? void 0 : linkedData.tests) || testAttempts, goals, toggleGoal: (id) => {
        }, addGoal: (t) => {
        }, setScreen, viewingStudentName: linkedData == null ? void 0 : linkedData.studentName });
      case "syllabus":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SyllabusScreen, { user, subjects: SYLLABUS_DATA, progress: (linkedData == null ? void 0 : linkedData.progress) || progress, onUpdateProgress: updateProgress, chapterNotes, videoMap, questionBank, viewingStudentName: linkedData == null ? void 0 : linkedData.studentName, readOnly: user.role === "PARENT", addTestAttempt: handleAddTestAttempt, testAttempts: (linkedData == null ? void 0 : linkedData.tests) || testAttempts });
      case "tests":
        return isAdminRole ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTestManagerScreen, { questionBank, tests, syllabus: SYLLABUS_DATA, onAddQuestion: (q) => {
        }, onCreateTest: (t) => {
        }, onDeleteQuestion: (id) => {
        }, onDeleteTest: (id) => {
        } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TestScreen, { user, addTestAttempt: handleAddTestAttempt, history: (linkedData == null ? void 0 : linkedData.tests) || testAttempts, availableTests: tests });
      case "timetable":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TimetableScreen, { user, savedConfig: timetable.config, savedSlots: timetable.slots, onSave: handleSaveTimetable, progress });
      case "diagnostics":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DiagnosticsScreen, {});
      case "deployment":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DeploymentScreen, {});
      case "profile":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileScreen, { user, onAcceptRequest: (id) => {
        }, onUpdateUser: (upd) => setUser({ ...user, ...upd }) });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress, testAttempts, goals: [], toggleGoal: (id) => {
        }, addGoal: (t) => {
        }, setScreen });
    }
  };
  if (!user) {
    const publicScreens = ["about", "blog", "exams", "privacy", "contact", "features"];
    if (publicScreens.includes(currentScreen)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { onNavigate: (p) => setScreen(p), currentScreen, children: [
        currentScreen === "about" && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutUsScreen, {}),
        currentScreen === "blog" && /* @__PURE__ */ jsxRuntimeExports.jsx(PublicBlogScreen, { blogs, onBack: () => setScreen("dashboard") }),
        currentScreen === "exams" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExamGuideScreen, {}),
        currentScreen === "privacy" && /* @__PURE__ */ jsxRuntimeExports.jsx(PrivacyPolicyScreen, {}),
        currentScreen === "contact" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactUsScreen, {}),
        currentScreen === "features" && /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesScreen, {})
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthScreen, { onLogin: handleLogin, onNavigate: (p) => setScreen(p) }) });
  }
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
