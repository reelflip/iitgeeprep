import { r as reactExports, j as jsxRuntimeExports, bo as CalendarDays, ab as Clock, bp as Map, av as RefreshCw, a8 as CheckCircle2, an as Save, bq as CheckSquare, br as Flag, a as BookOpen, bs as Briefcase, bt as Moon, b1 as Zap, h as Calendar, bu as Sun, bv as Coffee, R as RotateCw, i as Layers, P as PenTool, f as Brain } from "../vendor.js";
import { S as SYLLABUS_DATA } from "../shared-core.js";
const TimetableScreen = ({ user, savedConfig, savedSlots, onSave, progress }) => {
  const [viewMode, setViewMode] = reactExports.useState("DAILY");
  const [coachingDays, setCoachingDays] = reactExports.useState(["Mon", "Wed", "Fri"]);
  const [coachingStart, setCoachingStart] = reactExports.useState("06:00");
  const [coachingEnd, setCoachingEnd] = reactExports.useState("09:00");
  const [schoolEnabled, setSchoolEnabled] = reactExports.useState(true);
  const [schoolStart, setSchoolStart] = reactExports.useState("10:00");
  const [schoolEnd, setSchoolEnd] = reactExports.useState("16:00");
  const [wakeTime, setWakeTime] = reactExports.useState("05:30");
  const [bedTime, setBedTime] = reactExports.useState("22:30");
  const [generatedSchedule, setGeneratedSchedule] = reactExports.useState(null);
  const [planStartDate, setPlanStartDate] = reactExports.useState(() => {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  });
  const [planTargetDate, setPlanTargetDate] = reactExports.useState(() => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() + 6);
    return d.toISOString().split("T")[0];
  });
  const [generatedMasterPlan, setGeneratedMasterPlan] = reactExports.useState(null);
  const [saveStatus, setSaveStatus] = reactExports.useState("IDLE");
  reactExports.useEffect(() => {
    if (savedConfig) {
      setCoachingDays(savedConfig.coachingDays || ["Mon", "Wed", "Fri"]);
      setCoachingStart(savedConfig.coachingStart || "06:00");
      setCoachingEnd(savedConfig.coachingEnd || "09:00");
      setSchoolEnabled(savedConfig.schoolEnabled ?? true);
      setSchoolStart(savedConfig.schoolStart || "10:00");
      setSchoolEnd(savedConfig.schoolEnd || "16:00");
      setWakeTime(savedConfig.wakeTime || "05:30");
      setBedTime(savedConfig.bedTime || "22:30");
      if (savedConfig.planStartDate) setPlanStartDate(savedConfig.planStartDate);
      if (savedConfig.planTargetDate) setPlanTargetDate(savedConfig.planTargetDate);
      if (savedConfig.masterPlan) setGeneratedMasterPlan(savedConfig.masterPlan);
    }
    if (savedSlots && savedSlots.length > 0) {
      setGeneratedSchedule(savedSlots);
    }
  }, [savedConfig, savedSlots]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const toggleDay = (day) => {
    if (coachingDays.includes(day)) {
      setCoachingDays(coachingDays.filter((d) => d !== day));
    } else {
      setCoachingDays([...coachingDays, day]);
    }
  };
  const generateMasterPlan = () => {
    try {
      const start = new Date(planStartDate);
      const end = new Date(planTargetDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert("Invalid date selection.");
        return;
      }
      if (end <= start) {
        alert("Target date must be at least one week after start date.");
        return;
      }
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const totalWeeks = Math.floor(diffTime / (1e3 * 60 * 60 * 24 * 7));
      if (totalWeeks < 2) {
        alert("Study plan too short! Please select a longer duration (at least 2 weeks).");
        return;
      }
      let revisionWeeks = totalWeeks > 8 ? 4 : Math.floor(totalWeeks * 0.2);
      if (revisionWeeks < 1) revisionWeeks = 1;
      const learningWeeks = Math.max(1, totalWeeks - revisionWeeks);
      const physics = SYLLABUS_DATA.filter((t) => t.subject === "Physics");
      const chemistry = SYLLABUS_DATA.filter((t) => t.subject === "Chemistry");
      const maths = SYLLABUS_DATA.filter((t) => t.subject === "Maths");
      const allTopicsCount = physics.length + chemistry.length + maths.length;
      if (allTopicsCount === 0) {
        alert("Syllabus data missing. Please check system configuration.");
        return;
      }
      const topicsPerWeek = Math.ceil(allTopicsCount / learningWeeks);
      const plan = [];
      let pIdx = 0, cIdx = 0, mIdx = 0;
      let currentWeekStart = new Date(start);
      for (let i = 1; i <= learningWeeks; i++) {
        const weekTopics = [];
        let count = 0;
        while (count < topicsPerWeek) {
          if (pIdx >= physics.length && cIdx >= chemistry.length && mIdx >= maths.length) break;
          if (pIdx < physics.length) {
            weekTopics.push(physics[pIdx++]);
            count++;
          }
          if (count >= topicsPerWeek) break;
          if (cIdx < chemistry.length) {
            weekTopics.push(chemistry[cIdx++]);
            count++;
          }
          if (count >= topicsPerWeek) break;
          if (mIdx < maths.length) {
            weekTopics.push(maths[mIdx++]);
            count++;
          }
          if (count >= topicsPerWeek) break;
        }
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        plan.push({
          weekNumber: i,
          startDate: currentWeekStart.toISOString().split("T")[0],
          endDate: weekEnd.toISOString().split("T")[0],
          focus: "LEARNING",
          topics: weekTopics,
          completed: false
        });
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      }
      for (let i = 1; i <= revisionWeeks; i++) {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        plan.push({
          weekNumber: learningWeeks + i,
          startDate: currentWeekStart.toISOString().split("T")[0],
          endDate: weekEnd.toISOString().split("T")[0],
          focus: i % 2 === 0 ? "MOCK" : "REVISION",
          topics: [],
          completed: false
        });
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      }
      setGeneratedMasterPlan(plan);
      saveAllData(plan);
    } catch (err) {
      console.error("Master Plan Generation Failed", err);
      alert("Failed to generate plan. Please verify your dates.");
    }
  };
  const toggleWeekComplete = (weekNum) => {
    if (!generatedMasterPlan) return;
    const updated = generatedMasterPlan.map((w) => w.weekNumber === weekNum ? { ...w, completed: !w.completed } : w);
    setGeneratedMasterPlan(updated);
    saveAllData(updated);
  };
  const saveAllData = (plan, dailySlots) => {
    setSaveStatus("SAVING");
    const configToSave = {
      coachingDays,
      coachingStart,
      coachingEnd,
      schoolEnabled,
      schoolStart,
      schoolEnd,
      wakeTime,
      bedTime,
      masterPlan: plan || generatedMasterPlan || void 0,
      planStartDate,
      planTargetDate
    };
    if (onSave) {
      onSave(configToSave, dailySlots || generatedSchedule || []);
      setTimeout(() => setSaveStatus("SAVED"), 800);
      setTimeout(() => setSaveStatus("IDLE"), 3e3);
    } else {
      setSaveStatus("IDLE");
    }
  };
  const toMins = (t) => {
    if (!t) return 0;
    const [h, m] = t.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  const fromMins = (m) => {
    let h = Math.floor(m / 60);
    const mn = Math.floor(m % 60);
    if (h >= 24) h = h - 24;
    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 || 12;
    return `${displayH}:${mn.toString().padStart(2, "0")} ${ampm}`;
  };
  const getIcon = (slot) => {
    if (slot.iconType === "sun") return /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4" });
    if (slot.iconType === "moon") return /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4" });
    if (slot.iconType === "coffee") return /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { className: "w-4 h-4" });
    if (slot.iconType === "rotate") return /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-4 h-4" });
    switch (slot.type) {
      case "theory":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4" });
      case "practice":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "w-4 h-4" });
      case "revision":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" });
      case "school":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" });
      case "coaching":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" });
      case "sleep":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" });
    }
  };
  const handleGenerateDaily = () => {
    let slots = [];
    let currentMins = toMins(wakeTime);
    const endOfDayMins = toMins(bedTime);
    slots.push({
      time: fromMins(currentMins),
      endTime: fromMins(currentMins + 30),
      label: "Wake Up & Routine",
      type: "routine",
      iconType: "sun"
    });
    currentMins += 30;
    const fixedBlocks = [];
    if (schoolEnabled) {
      fixedBlocks.push({
        start: toMins(schoolStart),
        end: toMins(schoolEnd),
        label: "School / College",
        type: "school",
        subtext: "Try to solve easy MCQs during free periods."
      });
    }
    if (coachingDays.length > 0) {
      fixedBlocks.push({
        start: toMins(coachingStart),
        end: toMins(coachingEnd),
        label: "Coaching Classes",
        type: "coaching"
      });
    }
    fixedBlocks.sort((a, b) => a.start - b.start);
    const fillGap = (start, end, isAfterCoaching) => {
      let now = start;
      let coachingRevisionDone = !isAfterCoaching;
      while (now < end) {
        const duration = end - now;
        const hour = Math.floor(now / 60);
        if (hour >= 7 && hour < 9 && duration >= 20 && !slots.some((s) => s.label.includes("Breakfast"))) {
          const len = Math.min(30, duration);
          slots.push({ time: fromMins(now), endTime: fromMins(now + len), label: "Breakfast", type: "routine", iconType: "coffee" });
          now += len;
          continue;
        }
        if (hour >= 12 && hour < 14 && duration >= 30 && !slots.some((s) => s.label.includes("Lunch"))) {
          const len = Math.min(45, duration);
          slots.push({ time: fromMins(now), endTime: fromMins(now + len), label: "Lunch & Power Nap", type: "routine", iconType: "coffee" });
          now += len;
          continue;
        }
        if (hour >= 19.5 && hour < 21.5 && duration >= 30 && !slots.some((s) => s.label.includes("Dinner"))) {
          const len = Math.min(45, duration);
          slots.push({ time: fromMins(now), endTime: fromMins(now + len), label: "Dinner & Relax", type: "routine", iconType: "coffee" });
          now += len;
          continue;
        }
        if (!coachingRevisionDone && duration >= 20) {
          const revLen = Math.min(60, duration);
          slots.push({
            time: fromMins(now),
            endTime: fromMins(now + revLen),
            label: "Class Notes Revision",
            type: "revision",
            subtext: "Immediately revise today's coaching topics.",
            iconType: "rotate"
          });
          now += revLen;
          coachingRevisionDone = true;
          continue;
        }
        if (duration < 30) {
          slots.push({ time: fromMins(now), endTime: fromMins(end), label: "Transit / Relax", type: "routine" });
          now = end;
        } else if (duration <= 60) {
          slots.push({
            time: fromMins(now),
            endTime: fromMins(now + duration),
            label: "Quick Revision / Flashcards",
            type: "revision",
            subtext: "Use Flashcards feature."
          });
          now += duration;
        } else {
          const workLen = 50;
          let subject = hour >= 12 && hour < 18 ? "Maths" : hour >= 18 ? "Chemistry" : "Physics";
          let type = hour >= 12 && hour < 18 ? "practice" : "theory";
          let label = `${subject}: ${type === "practice" ? "Problem Solving" : "Deep Concepts"}`;
          slots.push({
            time: fromMins(now),
            endTime: fromMins(now + workLen),
            label,
            type,
            subject
          });
          now += workLen;
          if (end - now >= 10) {
            const breakLen = 10;
            slots.push({ time: fromMins(now), endTime: fromMins(now + breakLen), label: "Rest / Stretch", type: "routine" });
            now += breakLen;
          }
        }
      }
    };
    let isAfter = false;
    for (const block of fixedBlocks) {
      if (currentMins < block.start) {
        fillGap(currentMins, block.start, isAfter);
      }
      if (currentMins < block.end) {
        const effectiveStart = Math.max(currentMins, block.start);
        slots.push({
          time: fromMins(effectiveStart),
          endTime: fromMins(block.end),
          label: block.label,
          type: block.type,
          subtext: block.subtext
        });
        currentMins = block.end;
        isAfter = block.type === "coaching";
      } else {
        isAfter = false;
      }
    }
    if (currentMins < endOfDayMins) {
      fillGap(currentMins, endOfDayMins, isAfter);
    }
    slots.push({
      time: fromMins(endOfDayMins),
      label: "Sleep & Recovery",
      type: "sleep",
      iconType: "moon"
    });
    setGeneratedSchedule(slots);
    saveAllData(void 0, slots);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto pb-10 space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-8 h-8 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Schedule & Planner" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-emerald-100 text-lg opacity-90 max-w-2xl", children: "Manage your daily routine and generate a long-term master plan for syllabus completion." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setViewMode("DAILY"),
            className: `px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === "DAILY" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
              " Daily Routine"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setViewMode("MASTER"),
            className: `px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === "MASTER" ? "bg-blue-600 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "w-4 h-4" }),
              " Full Course Plan"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => saveAllData(),
          className: `flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${saveStatus === "SAVED" ? "bg-green-100 text-green-700" : saveStatus === "SAVING" ? "bg-blue-50 text-blue-600" : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"}`,
          children: [
            saveStatus === "SAVING" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }) : saveStatus === "SAVED" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            saveStatus === "SAVING" ? "Saving..." : saveStatus === "SAVED" ? "Saved" : "Save Changes"
          ]
        }
      )
    ] }),
    viewMode === "MASTER" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-right-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "w-6 h-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Long-Term Strategy Generator" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-sm opacity-90", children: "Auto-distributes syllabus into weeks until your exam date." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Start Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "date",
                  value: planStartDate,
                  onChange: (e) => setPlanStartDate(e.target.value),
                  className: "w-full p-3 border border-slate-200 rounded-lg text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Target Exam Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "date",
                  value: planTargetDate,
                  onChange: (e) => setPlanTargetDate(e.target.value),
                  className: "w-full p-3 border border-slate-200 rounded-lg text-sm"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: generateMasterPlan,
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5 mr-2" }),
                " Generate Master Plan"
              ]
            }
          )
        ] })
      ] }),
      generatedMasterPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-800 ml-1", children: [
          "Your Roadmap (",
          generatedMasterPlan.length,
          " Weeks)"
        ] }),
        generatedMasterPlan.map((week, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white rounded-xl border transition-all ${week.completed ? "border-green-200 bg-green-50/30 opacity-70" : "border-slate-200 shadow-sm hover:shadow-md"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 font-bold ${week.focus === "REVISION" ? "bg-amber-100 text-amber-700" : week.focus === "MOCK" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase", children: "Week" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: week.weekNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-slate-800", children: [
                    new Date(week.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    " - ",
                    new Date(week.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${week.focus === "REVISION" ? "bg-amber-50 text-amber-600 border-amber-200" : week.focus === "MOCK" ? "bg-red-50 text-red-600 border-red-200" : "bg-blue-50 text-blue-600 border-blue-200"}`, children: week.focus })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: week.focus === "LEARNING" ? `${week.topics.length} Chapters Assigned` : "Review weak areas and take full-length tests." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => toggleWeekComplete(week.weekNumber),
                className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${week.completed ? "bg-green-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`,
                children: [
                  week.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckSquare, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4" }),
                  week.completed ? "Completed" : "Mark Done"
                ]
              }
            )
          ] }),
          week.topics.length > 0 && !week.completed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-0 border-t border-slate-100 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: week.topics.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-1 rounded border ${t.subject === "Physics" ? "bg-purple-50 border-purple-100 text-purple-700" : t.subject === "Chemistry" ? "bg-amber-50 border-amber-100 text-amber-700" : "bg-cyan-50 border-cyan-100 text-cyan-700"}`, children: t.name }, t.id)) }) })
        ] }, idx))
      ] })
    ] }) : (
      // DAILY MODE
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in fade-in slide-in-from-left-4", children: !generatedSchedule ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Daily Routine Generator" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm opacity-90", children: "Auto-allocates Revision based on your progress history." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 mr-2" }),
              " Coaching Schedule"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-2 mb-6 overflow-x-auto no-scrollbar pb-1", children: days.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => toggleDay(day),
                className: `px-4 py-1.5 rounded-full text-xs font-bold transition-all ${coachingDays.includes(day) ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`,
                children: day
              },
              day
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "coachingStart", className: "text-xs text-slate-400 font-medium ml-1", children: "Start Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "coachingStart", type: "time", value: coachingStart, onChange: (e) => setCoachingStart(e.target.value), className: "w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 outline-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute right-3 top-3 text-slate-300 w-4 h-4 pointer-events-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "coachingEnd", className: "text-xs text-slate-400 font-medium ml-1", children: "End Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "coachingEnd", type: "time", value: coachingEnd, onChange: (e) => setCoachingEnd(e.target.value), className: "w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 outline-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute right-3 top-3 text-slate-300 w-4 h-4 pointer-events-none" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-slate-100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4 mr-2" }),
                " School / College"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSchoolEnabled(!schoolEnabled), className: `w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${schoolEnabled ? "bg-green-500" : "bg-slate-200"}`, "aria-label": "Toggle School", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${schoolEnabled ? "translate-x-6" : "translate-x-0"}` }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 gap-4 transition-opacity duration-200 ${schoolEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "schoolStart", className: "text-xs text-slate-400 font-medium ml-1", children: "Starts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "schoolStart", type: "time", value: schoolStart, onChange: (e) => setSchoolStart(e.target.value), className: "w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 outline-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute right-3 top-3 text-slate-300 w-4 h-4 pointer-events-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "schoolEnd", className: "text-xs text-slate-400 font-medium ml-1", children: "Ends" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "schoolEnd", type: "time", value: schoolEnd, onChange: (e) => setSchoolEnd(e.target.value), className: "w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 outline-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute right-3 top-3 text-slate-300 w-4 h-4 pointer-events-none" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-slate-100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4 mr-2" }),
              " Sleep Cycle"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "wakeTime", className: "text-xs text-slate-400 font-medium ml-1", children: "Wake Up" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "wakeTime", type: "time", value: wakeTime, onChange: (e) => setWakeTime(e.target.value), className: "w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 outline-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute right-3 top-3 text-slate-300 w-4 h-4 pointer-events-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "bedTime", className: "text-xs text-slate-400 font-medium ml-1", children: "Bed Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "bedTime", type: "time", value: bedTime, onChange: (e) => setBedTime(e.target.value), className: "w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 outline-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute right-3 top-3 text-slate-300 w-4 h-4 pointer-events-none" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleGenerateDaily, className: "w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-yellow-400 fill-yellow-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Generate Daily Schedule" })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg border border-slate-100 p-6 animate-in fade-in zoom-in-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 flex items-center text-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-100 text-blue-700 p-2 rounded-lg mr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) }),
            "Optimized Daily Schedule"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setGeneratedSchedule(null), className: "flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            "Regenerate"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative border-l-2 border-slate-100 ml-3 space-y-8 pb-4", children: generatedSchedule.map((slot, idx) => {
          let bg = "bg-slate-50";
          let border = "border-slate-100";
          let text = "text-slate-700";
          if (slot.type === "theory") {
            bg = "bg-purple-50";
            border = "border-purple-100";
            text = "text-purple-900";
          } else if (slot.type === "practice") {
            bg = "bg-blue-50";
            border = "border-blue-100";
            text = "text-blue-900";
          } else if (slot.type === "revision") {
            bg = "bg-amber-50";
            border = "border-amber-100";
            text = "text-amber-900";
          } else if (slot.type === "school") {
            bg = "bg-green-50";
            border = "border-green-100";
            text = "text-green-900";
          } else if (slot.type === "coaching") {
            bg = "bg-orange-50";
            border = "border-orange-100";
            text = "text-orange-900";
          }
          const icon = getIcon(slot);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${slot.type === "sleep" ? "bg-slate-800" : slot.type === "theory" ? "bg-purple-500" : slot.type === "practice" ? "bg-blue-500" : slot.type === "revision" ? "bg-amber-500" : slot.type === "school" ? "bg-green-500" : slot.type === "coaching" ? "bg-orange-500" : "bg-slate-400"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono font-bold text-slate-400 mb-1 flex items-center", children: [
              slot.time,
              slot.endTime && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 mx-1", children: "-" }),
              slot.endTime
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg p-4 relative group transition-all hover:shadow-md border ${bg} ${border}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-bold flex items-start justify-between ${text}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                icon,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: slot.label })
              ] }) }),
              slot.subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs mt-1 font-medium opacity-80 leading-relaxed ${text}`, children: slot.subtext }),
              slot.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/50 border border-white/20", children: slot.subject })
            ] })
          ] }, idx);
        }) })
      ] }) })
    )
  ] });
};
export {
  TimetableScreen
};
