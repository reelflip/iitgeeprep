const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/screens/AuthScreen.js","assets/vendor.js","assets/shared-core.js","assets/screens/DashboardScreen.js","assets/screens/AdminDashboardScreen.js","assets/components/StatCard.js","assets/screens/SyllabusScreen.js","assets/components/BookReader.js","assets/components/SyncStatusBadge.js","assets/screens/RevisionScreen.js","assets/screens/TimetableScreen.js","assets/screens/TestScreen.js","assets/screens/FocusScreen.js","assets/screens/FlashcardScreen.js","assets/screens/MistakesScreen.js","assets/screens/AnalyticsScreen.js","assets/screens/WellnessScreen.js","assets/screens/BacklogScreen.js","assets/screens/HacksScreen.js","assets/screens/PsychometricScreen.js","assets/screens/AdminUserManagementScreen.js","assets/screens/AdminInboxScreen.js","assets/screens/AdminSyllabusScreen.js","assets/components/RichTextEditor.js","assets/screens/AdminTestManagerScreen.js","assets/components/Button.js","assets/screens/AdminSystemScreen.js","assets/screens/DeploymentScreen.js","assets/screens/DiagnosticsScreen.js","assets/screens/ProfileScreen.js","assets/screens/ContentManagerScreen.js","assets/screens/AdminBlogScreen.js","assets/screens/ParentFamilyScreen.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, bl as clientExports, bm as React } from "./vendor.js";
import { N as Navigation, M as MobileNavigation } from "./components/Navigation.js";
import { A as AITutorChat } from "./components/AITutorChat.js";
import { S as SyncStatusBadge } from "./components/SyncStatusBadge.js";
import { h as generateInitialQuestionBank, M as MOCK_TESTS_DATA, a as apiService, S as SYLLABUS_DATA } from "./shared-core.js";
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
const SyllabusScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/SyllabusScreen.js"), true ? __vite__mapDeps([6,1,7,8]) : void 0).then((m) => ({ default: m.SyllabusScreen })));
const RevisionScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/RevisionScreen.js"), true ? __vite__mapDeps([9,1,2]) : void 0).then((m) => ({ default: m.RevisionScreen })));
const TimetableScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/TimetableScreen.js"), true ? __vite__mapDeps([10,1,2]) : void 0).then((m) => ({ default: m.TimetableScreen })));
const TestScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/TestScreen.js"), true ? __vite__mapDeps([11,1]) : void 0).then((m) => ({ default: m.TestScreen })));
const FocusScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/FocusScreen.js"), true ? __vite__mapDeps([12,1]) : void 0).then((m) => ({ default: m.FocusScreen })));
const FlashcardScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/FlashcardScreen.js"), true ? __vite__mapDeps([13,1]) : void 0).then((m) => ({ default: m.FlashcardScreen })));
const MistakesScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/MistakesScreen.js"), true ? __vite__mapDeps([14,1]) : void 0).then((m) => ({ default: m.MistakesScreen })));
const AnalyticsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AnalyticsScreen.js"), true ? __vite__mapDeps([15,1,2]) : void 0).then((m) => ({ default: m.AnalyticsScreen })));
const WellnessScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/WellnessScreen.js"), true ? __vite__mapDeps([16,1]) : void 0).then((m) => ({ default: m.WellnessScreen })));
const BacklogScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/BacklogScreen.js"), true ? __vite__mapDeps([17,1]) : void 0).then((m) => ({ default: m.BacklogScreen })));
const HacksScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/HacksScreen.js"), true ? __vite__mapDeps([18,1]) : void 0).then((m) => ({ default: m.HacksScreen })));
const PsychometricScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/PsychometricScreen.js"), true ? __vite__mapDeps([19,1,2]) : void 0).then((m) => ({ default: m.PsychometricScreen })));
const AdminUserManagementScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminUserManagementScreen.js"), true ? __vite__mapDeps([20,1,2]) : void 0).then((m) => ({ default: m.AdminUserManagementScreen })));
const AdminInboxScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminInboxScreen.js"), true ? __vite__mapDeps([21,1]) : void 0).then((m) => ({ default: m.AdminInboxScreen })));
const AdminSyllabusScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminSyllabusScreen.js"), true ? __vite__mapDeps([22,1,23]) : void 0).then((m) => ({ default: m.AdminSyllabusScreen })));
const AdminTestManagerScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminTestManagerScreen.js"), true ? __vite__mapDeps([24,1,25,2]) : void 0).then((m) => ({ default: m.AdminTestManagerScreen })));
const AdminSystemScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminSystemScreen.js"), true ? __vite__mapDeps([26,1]) : void 0).then((m) => ({ default: m.AdminSystemScreen })));
const DeploymentScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DeploymentScreen.js"), true ? __vite__mapDeps([27,1,2]) : void 0).then((m) => ({ default: m.DeploymentScreen })));
const DiagnosticsScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/DiagnosticsScreen.js"), true ? __vite__mapDeps([28,1,2]) : void 0).then((m) => ({ default: m.DiagnosticsScreen })));
const ProfileScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ProfileScreen.js"), true ? __vite__mapDeps([29,1,2]) : void 0).then((m) => ({ default: m.ProfileScreen })));
const ContentManagerScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ContentManagerScreen.js"), true ? __vite__mapDeps([30,1]) : void 0).then((m) => ({ default: m.ContentManagerScreen })));
const AdminBlogScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/AdminBlogScreen.js"), true ? __vite__mapDeps([31,1,23]) : void 0).then((m) => ({ default: m.AdminBlogScreen })));
const ParentFamilyScreen = reactExports.lazy(() => __vitePreload(() => import("./screens/ParentFamilyScreen.js"), true ? __vite__mapDeps([32,1,19,2]) : void 0).then((m) => ({ default: m.ParentFamilyScreen })));
const LoadingView = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-slate-400", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest", children: "Master Node v18.0 Handshake..." })
] });
const App = () => {
  const [user, setUser] = reactExports.useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentScreen, setScreen] = reactExports.useState(() => {
    const saved = localStorage.getItem("last_screen");
    if (saved) return saved;
    return (user == null ? void 0 : user.role.includes("ADMIN")) ? "overview" : "dashboard";
  });
  const [globalSyncStatus, setGlobalSyncStatus] = reactExports.useState("IDLE");
  const [progress, setProgress] = reactExports.useState({});
  const [testAttempts, setTestAttempts] = reactExports.useState([]);
  const [goals, setGoals] = reactExports.useState([]);
  const [backlogs, setBacklogs] = reactExports.useState([]);
  const [timetable, setTimetable] = reactExports.useState({});
  const [psychReport, setPsychReport] = reactExports.useState(null);
  const [flashcards, setFlashcards] = reactExports.useState([]);
  const [hacks, setHacks] = reactExports.useState([]);
  const [blogs, setBlogs] = reactExports.useState([]);
  const [questionBank, setQuestionBank] = reactExports.useState(() => generateInitialQuestionBank());
  const [tests, setTests] = reactExports.useState(MOCK_TESTS_DATA);
  const loadData = reactExports.useCallback(async (userId) => {
    setGlobalSyncStatus("SYNCING");
    try {
      const data = await apiService.request(`/api/get_dashboard.php?user_id=${userId}`);
      if (data.progress) {
        const pm = {};
        data.progress.forEach((p) => pm[p.topicId] = p);
        setProgress(pm);
      }
      setTestAttempts(data.attempts || []);
      setGoals(data.goals || []);
      setBacklogs(data.backlogs || []);
      setTimetable(data.timetable || {});
      setPsychReport(data.psychometric || null);
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      const errorMsg = e.message || (typeof e === "string" ? e : JSON.stringify(e));
      console.error("Master Sync Failure:", errorMsg);
      setGlobalSyncStatus("ERROR");
    }
  }, []);
  reactExports.useEffect(() => {
    if (user) loadData(user.id);
  }, [user == null ? void 0 : user.id, loadData]);
  reactExports.useEffect(() => {
    localStorage.setItem("last_screen", currentScreen);
  }, [currentScreen]);
  const updateProgress = async (topicId, updates) => {
    setGlobalSyncStatus("SYNCING");
    const existing = progress[topicId] || { topicId, status: "NOT_STARTED", lastRevised: null, revisionLevel: 0, nextRevisionDate: null, solvedQuestions: [] };
    const updated = { ...existing, ...updates };
    try {
      await apiService.request("/api/sync_progress.php", { method: "POST", body: JSON.stringify({ userId: user == null ? void 0 : user.id, ...updated }) });
      setProgress((prev) => ({ ...prev, [topicId]: updated }));
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const addTestAttempt = async (attempt) => {
    setGlobalSyncStatus("SYNCING");
    try {
      await apiService.request("/api/save_attempt.php", { method: "POST", body: JSON.stringify({ ...attempt, userId: user == null ? void 0 : user.id }) });
      setTestAttempts((prev) => [attempt, ...prev]);
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const saveTimetable = async (config, slots) => {
    setGlobalSyncStatus("SYNCING");
    try {
      await apiService.request("/api/save_timetable.php", { method: "POST", body: JSON.stringify({ userId: user == null ? void 0 : user.id, config, slots }) });
      setTimetable({ config, slots });
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const addGoal = async (text) => {
    setGlobalSyncStatus("SYNCING");
    const newGoal = { id: `g_${Date.now()}`, text, completed: false };
    try {
      await apiService.request("/api/manage_goals.php", { method: "POST", body: JSON.stringify({ ...newGoal, userId: user == null ? void 0 : user.id }) });
      setGoals((prev) => [...prev, newGoal]);
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const toggleGoal = async (id) => {
    setGlobalSyncStatus("SYNCING");
    const target = goals.find((g) => g.id === id);
    if (!target) return;
    const updated = { ...target, completed: !target.completed };
    try {
      await apiService.request("/api/manage_goals.php", { method: "POST", body: JSON.stringify({ ...updated, userId: user == null ? void 0 : user.id }) });
      setGoals((prev) => prev.map((g) => g.id === id ? updated : g));
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const addBacklog = async (item) => {
    setGlobalSyncStatus("SYNCING");
    const newItem = { ...item, id: `bl_${Date.now()}`, status: "PENDING" };
    try {
      await apiService.request("/api/manage_backlogs.php", { method: "POST", body: JSON.stringify({ ...newItem, userId: user == null ? void 0 : user.id }) });
      setBacklogs((prev) => [...prev, newItem]);
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const toggleBacklog = async (id) => {
    setGlobalSyncStatus("SYNCING");
    const target = backlogs.find((b) => b.id === id);
    if (!target) return;
    const updated = { ...target, status: target.status === "COMPLETED" ? "PENDING" : "COMPLETED" };
    try {
      await apiService.request("/api/manage_backlogs.php", { method: "POST", body: JSON.stringify({ ...updated, userId: user == null ? void 0 : user.id }) });
      setBacklogs((prev) => prev.map((b) => b.id === id ? updated : b));
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const deleteBacklog = async (id) => {
    setGlobalSyncStatus("SYNCING");
    try {
      await apiService.request(`/api/manage_backlogs.php?id=${id}`, { method: "DELETE" });
      setBacklogs((prev) => prev.filter((b) => b.id !== id));
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const handleSavePsychometric = async (report) => {
    setGlobalSyncStatus("SYNCING");
    try {
      await apiService.request("/api/save_psychometric.php", { method: "POST", body: JSON.stringify({ user_id: user == null ? void 0 : user.id, report }) });
      setPsychReport(report);
      setGlobalSyncStatus("SYNCED");
    } catch (e) {
      setGlobalSyncStatus("ERROR");
    }
  };
  const renderContent = () => {
    const role = (user == null ? void 0 : user.role) || "STUDENT";
    const isAdmin = role.includes("ADMIN");
    if (isAdmin) {
      switch (currentScreen) {
        case "overview":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboardScreen, { user, onNavigate: setScreen });
        case "users":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminUserManagementScreen, {});
        case "inbox":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminInboxScreen, {});
        case "syllabus_admin":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSyllabusScreen, { syllabus: SYLLABUS_DATA, onAddTopic: () => {
          }, onDeleteTopic: () => {
          } });
        case "tests_admin":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTestManagerScreen, { questionBank, tests, onAddQuestion: (q) => setQuestionBank([...questionBank, q]), onCreateTest: (t) => setTests([...tests, t]), onDeleteQuestion: (id) => setQuestionBank(questionBank.filter((q) => q.id !== id)), onDeleteTest: (id) => setTests(tests.filter((t) => t.id !== id)), syllabus: SYLLABUS_DATA });
        case "content":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ContentManagerScreen, { flashcards, hacks, blogs, onAddFlashcard: (c) => setFlashcards([...flashcards, { ...c, id: Date.now() }]), onAddHack: (h) => setHacks([...hacks, { ...h, id: Date.now() }]), onAddBlog: (b) => setBlogs([...blogs, { ...b, id: Date.now(), date: (/* @__PURE__ */ new Date()).toISOString() }]), onDelete: (t, id) => {
          } });
        case "blog_admin":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminBlogScreen, { blogs, onAddBlog: (b) => setBlogs([b, ...blogs]) });
        case "diagnostics":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(DiagnosticsScreen, {});
        case "system":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSystemScreen, {});
        case "deployment":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(DeploymentScreen, {});
        case "admin_analytics":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsScreen, { progress, testAttempts });
        case "profile":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileScreen, { user, onAcceptRequest: () => {
          } });
        default:
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboardScreen, { user, onNavigate: setScreen });
      }
    }
    if (role === "PARENT") {
      switch (currentScreen) {
        case "dashboard":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress, testAttempts, goals, toggleGoal, addGoal, setScreen, linkedPsychReport: psychReport || void 0 });
        case "family":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ParentFamilyScreen, { user, onSendRequest: async () => ({ success: true, message: "Request Sent" }) });
        case "analytics":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsScreen, { progress, testAttempts });
        case "tests":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(TestScreen, { user, addTestAttempt: () => {
          }, history: testAttempts, availableTests: [] });
        case "profile":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileScreen, { user, onAcceptRequest: () => {
          } });
        default:
          return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress, testAttempts, goals, toggleGoal, addGoal, setScreen });
      }
    }
    switch (currentScreen) {
      case "dashboard":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress, testAttempts, goals, toggleGoal, addGoal, setScreen, linkedPsychReport: psychReport || void 0 });
      case "syllabus":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SyllabusScreen, { user, subjects: SYLLABUS_DATA, progress, onUpdateProgress: updateProgress, questionBank, addTestAttempt, syncStatus: globalSyncStatus, showIndicators: true });
      case "tests":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TestScreen, { user, addTestAttempt, history: testAttempts, availableTests: tests });
      case "psychometric":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PsychometricScreen, { user, reportData: psychReport || void 0, onSaveReport: handleSavePsychometric });
      case "timetable":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TimetableScreen, { user, savedConfig: timetable.config, savedSlots: timetable.slots, progress, onSave: saveTimetable });
      case "revision":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RevisionScreen, { progress, handleRevisionComplete: (id) => updateProgress(id, { lastRevised: (/* @__PURE__ */ new Date()).toISOString() }) });
      case "backlogs":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BacklogScreen, { backlogs, onAddBacklog: addBacklog, onToggleBacklog: toggleBacklog, onDeleteBacklog: deleteBacklog });
      case "mistakes":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MistakesScreen, { mistakes: [], addMistake: () => {
        } });
      case "flashcards":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FlashcardScreen, { flashcards });
      case "hacks":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HacksScreen, { hacks });
      case "wellness":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(WellnessScreen, {});
      case "profile":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileScreen, { user, onAcceptRequest: () => {
        }, onUpdateUser: (upd) => setUser({ ...user, ...upd }) });
      case "analytics":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsScreen, { user, progress, testAttempts });
      case "ai-tutor":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AITutorChat, { isFullScreen: true });
      case "focus":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FocusScreen, {});
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardScreen, { user, progress, testAttempts, goals, toggleGoal, addGoal, setScreen });
    }
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthScreen, { onLogin: (u) => {
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
      setScreen(u.role.includes("ADMIN") ? "overview" : "dashboard");
    }, onNavigate: (p) => setScreen(p) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-50 min-h-screen font-inter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { currentScreen, setScreen, logout: () => {
      setUser(null);
      localStorage.clear();
      window.location.reload();
    }, user }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8 max-w-[1600px] mx-auto w-full relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SyncStatusBadge, { status: globalSyncStatus, show: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, {}), children: renderContent() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavigation, { currentScreen, setScreen, logout: () => {
      setUser(null);
      localStorage.clear();
      window.location.reload();
    }, user }),
    user.role === "STUDENT" && !["ai-tutor", "tests", "focus", "psychometric"].includes(currentScreen) && /* @__PURE__ */ jsxRuntimeExports.jsx(AITutorChat, {})
  ] });
};
const container = document.getElementById("root");
if (container) {
  const root = clientExports.createRoot(container);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
