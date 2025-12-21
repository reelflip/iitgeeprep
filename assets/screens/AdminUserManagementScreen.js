import { r as reactExports, j as jsxRuntimeExports, o as Users, aq as ShieldCheck, a1 as Search, L as LoaderCircle, a7 as Mail, i as Calendar, ar as Shield, as as CircleX, at as CircleCheckBig, a3 as Trash2 } from "../vendor.js";
import { a as apiService } from "../shared-core.js";
const AdminUserManagementScreen = () => {
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [activeGroup, setActiveGroup] = reactExports.useState("USERS");
  const [filterRole, setFilterRole] = reactExports.useState("ALL");
  const fetchUsers = reactExports.useCallback(async (group) => {
    setLoading(true);
    try {
      const data = await apiService.request(`/api/manage_users.php?group=${group}`);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchUsers(activeGroup);
  }, [activeGroup, fetchUsers]);
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      await apiService.request("/api/manage_users.php", {
        method: "PUT",
        body: JSON.stringify({ id, isVerified: !currentStatus })
      });
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, isVerified: !currentStatus } : u));
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Update failed. Please try again.");
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This action will permanently wipe all student progress and test data.")) return;
    try {
      await apiService.request(`/api/manage_users.php?id=${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Delete failed. Administrators cannot be deleted via this console.");
    }
  };
  const filteredUsers = (users || []).filter((user) => {
    if (!user) return false;
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const role = user.role || "STUDENT";
    const search = searchTerm.toLowerCase();
    const matchesSearch = name.includes(search) || email.includes(search);
    const matchesRole = activeGroup === "ADMINS" || filterRole === "ALL" || role === filterRole;
    return matchesSearch && matchesRole;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0f172a] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black uppercase tracking-tight", children: "User Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg opacity-90 max-w-2xl font-medium", children: "System v17.0 Admin Core. Monitor aspirant activity, manage identities, and verify system permissions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveGroup("USERS"),
          className: `px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeGroup === "USERS" ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 }),
            " Regular Users"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveGroup("ADMINS"),
          className: `px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeGroup === "ADMINS" ? "bg-violet-600 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }),
            " System Admins"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-slate-200 flex flex-col lg:flex-row gap-4 justify-between items-center bg-slate-50/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full lg:w-96", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: `Filter ${activeGroup.toLowerCase()} by name or email...`,
              className: "w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none bg-white shadow-inner",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          )
        ] }),
        activeGroup === "USERS" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm", children: ["ALL", "STUDENT", "PARENT"].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setFilterRole(role),
            className: `px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded transition-colors ${filterRole === role ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-50"}`,
            children: role
          },
          role
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "Identity Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "Account Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "Sync Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "Onboarded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5 text-right", children: "Administrative Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 text-sm", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-400 uppercase text-xs tracking-widest", children: "Querying MySQL Node..." })
        ] }) }) }) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 5, className: "p-20 text-center text-slate-400 italic", children: [
          "No active records found in the ",
          activeGroup.toLowerCase(),
          " group."
        ] }) }) : filteredUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `hover:bg-slate-50 transition-colors group ${activeGroup === "ADMINS" ? "hover:bg-violet-50/30" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm transition-transform group-hover:scale-110 ${activeGroup === "ADMINS" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"}`, children: (user.name || "U").charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-900 truncate", children: user.name || "Unnamed User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-400 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 12 }),
                " ",
                user.email || "No email"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-tighter ${(user.role || "").startsWith("ADMIN") ? "bg-violet-50 text-violet-700 border-violet-200" : user.role === "PARENT" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: user.role === "ADMIN" ? "System Admin" : user.role || "STUDENT" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black w-fit uppercase tracking-tighter ${user.isVerified ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${user.isVerified ? "bg-emerald-500" : "bg-rose-500"}` }),
            user.isVerified ? "LIVE" : "RESTRICTED"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-slate-400 text-xs font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
            user.created_at ? new Date(user.created_at).toLocaleDateString() : "Historical"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5 text-right", children: (user.role || "").startsWith("ADMIN") ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-300 uppercase tracking-widest", children: "Protected Identity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16, className: "text-slate-200" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleUpdateStatus(user.id, !!user.isVerified),
                className: `p-2 rounded-xl transition-all ${user.isVerified ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`,
                title: user.isVerified ? "Restrict System Access" : "Restore System Access",
                children: user.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleDelete(user.id),
                className: "p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all",
                title: "Delete Master Record",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 })
              }
            )
          ] }) })
        ] }, user.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-slate-200 bg-slate-50/30 text-[10px] font-black uppercase tracking-widest text-slate-400 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Registry Stream: ",
          filteredUsers.length,
          " Entries Detected"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Master Registry v17.0" })
      ] })
    ] }),
    activeGroup === "ADMINS" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-4 items-center animate-in slide-in-from-bottom-2 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-amber-200 rounded-xl text-amber-800 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black text-amber-900 uppercase tracking-tight", children: "Privileged Account Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 font-medium leading-relaxed", children: "System administrators have full platform control. Direct management of admin identities is disabled via this console for security. Contact Root Support for credential overrides." })
      ] })
    ] })
  ] });
};
export {
  AdminUserManagementScreen
};
