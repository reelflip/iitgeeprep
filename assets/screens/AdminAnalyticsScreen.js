import { r as reactExports, j as jsxRuntimeExports, h as Calendar, o as Activity, m as Users, aa as MousePointerClick, ab as Clock, ac as ResponsiveContainer, ad as AreaChart, ae as CartesianGrid, af as XAxis, ag as YAxis, ah as Tooltip, ai as Area, aj as BarChart, ak as Bar, al as ArrowUp } from "../vendor.js";
const AdminAnalyticsScreen = () => {
  const [stats, setStats] = reactExports.useState({
    totalVisits: 12450,
    activeUsers: 85,
    bounceRate: "42%",
    avgSession: "4m 12s",
    dailyTraffic: [
      { date: "Mon", visits: 1200 },
      { date: "Tue", visits: 1350 },
      { date: "Wed", visits: 1250 },
      { date: "Thu", visits: 1580 },
      { date: "Fri", visits: 1900 },
      { date: "Sat", visits: 1750 },
      { date: "Sun", visits: 1600 }
    ],
    devices: [
      { name: "Mobile", value: 65 },
      { name: "Desktop", value: 30 },
      { name: "Tablet", value: 5 }
    ]
  });
  reactExports.useEffect(() => {
    fetch("/api/get_admin_stats.php").then((res) => res.json()).then((data) => {
      if (data && data.dailyTraffic && data.dailyTraffic.length > 0 && data.totalVisits > 0) {
        setStats((prev) => ({
          ...prev,
          totalVisits: data.totalVisits,
          activeUsers: data.totalUsers,
          // Map total users to active for now
          dailyTraffic: data.dailyTraffic
        }));
      }
    }).catch((err) => {
      console.log("Using seeded analytics data due to fetch error:", err);
    });
  }, []);
  const StatCard = ({ label, value, sub, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 right-0 p-4 opacity-10 ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 48 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-xs font-bold uppercase tracking-wider", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-black text-slate-800 my-2", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-bold px-2 py-1 rounded bg-green-50 text-green-700 flex items-center w-fit`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { size: 12, className: "mr-1" }),
        " ",
        sub
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "System Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500", children: "Real-time traffic and usage insights." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 text-sm font-medium text-slate-600 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "ml-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2", children: "Last 7 Days" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Visits",
          value: stats.totalVisits.toLocaleString(),
          sub: "+12% this week",
          icon: Activity,
          color: "text-blue-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Users",
          value: stats.activeUsers,
          sub: "+5 new today",
          icon: Users,
          color: "text-purple-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Bounce Rate",
          value: stats.bounceRate,
          sub: "-2% improvement",
          icon: MousePointerClick,
          color: "text-orange-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Avg. Session",
          value: stats.avgSession,
          sub: "Healthy engagement",
          icon: Clock,
          color: "text-green-600"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-6 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 mr-2 text-blue-600" }),
          " Traffic Trends"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "85%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: stats.dailyTraffic, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorVisits", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", axisLine: false, tickLine: false, tick: { fill: "#64748b", fontSize: 12 }, dy: 10 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: "#64748b", fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: { borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
              cursor: { stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "visits",
              stroke: "#3b82f6",
              strokeWidth: 3,
              fillOpacity: 1,
              fill: "url(#colorVisits)"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-6", children: "Device Usage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "85%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stats.devices, layout: "vertical", margin: { left: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", horizontal: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", hide: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "name", type: "category", width: 60, tick: { fontSize: 12, fill: "#64748b" }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { cursor: { fill: "#f1f5f9" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "#8b5cf6", radius: [0, 4, 4, 0], barSize: 24 })
        ] }) })
      ] })
    ] })
  ] });
};
export {
  AdminAnalyticsScreen
};
