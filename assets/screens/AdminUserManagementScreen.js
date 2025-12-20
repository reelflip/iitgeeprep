import { r as reactExports, j as jsxRuntimeExports, o as Users, aP as ShieldCheck, at as Search, L as Loader2, az as Mail, i as Calendar, aQ as Shield, aR as XCircle, aS as CheckCircle, av as Trash2 } from "../vendor.js";
const AdminUserManagementScreen = () => {
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [activeGroup, setActiveGroup] = reactExports.useState("USERS");
  const [filterRole, setFilterRole] = reactExports.useState("ALL");
  const [editingUser, setEditingUser] = reactExports.useState(null);
  const fetchUsers = reactExports.useCallback(async (group) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/manage_users.php?group=${group}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchUsers(activeGroup);
  }, [activeGroup, fetchUsers]);
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      await fetch("/api/manage_users.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isVerified: !currentStatus })
      });
      setUsers(users.map((u) => u.id === id ? { ...u, isVerified: !currentStatus } : u));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/manage_users.php?id=${id}`, { method: "DELETE" });
      if (res.status === 403) {
        alert("This account is protected and cannot be deleted.");
        return;
      }
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = activeGroup === "ADMINS" || filterRole === "ALL" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Identity Console" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg opacity-90 max-w-2xl", children: "Manage aspirants, guardians, and system-level administrative privileges." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-2xl" })
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
              placeholder: `Search ${activeGroup.toLowerCase()}...`,
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "User Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "Classification" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "System Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5", children: "Onboarded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-5 text-right", children: "Management" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 text-sm", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 animate-spin text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-400", children: "Synchronizing database entries..." })
        ] }) }) }) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 5, className: "p-20 text-center text-slate-400 italic", children: [
          "No matches found in the ",
          activeGroup.toLowerCase(),
          " group."
        ] }) }) : filteredUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `hover:bg-slate-50 transition-colors group ${activeGroup === "ADMINS" ? "hover:bg-violet-50/30" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm transition-transform group-hover:scale-110 ${activeGroup === "ADMINS" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"}`, children: user.name.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-900 truncate", children: user.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-400 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 12 }),
                " ",
                user.email
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-tighter ${user.role.startsWith("ADMIN") ? "bg-violet-50 text-violet-700 border-violet-200" : user.role === "PARENT" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: user.role === "ADMIN" ? "System Admin" : user.role }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black w-fit uppercase tracking-tighter ${user.isVerified ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${user.isVerified ? "bg-emerald-500" : "bg-rose-500"}` }),
            user.isVerified ? "Live" : "Restricted"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-slate-400 text-xs font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
            user.created_at ? new Date(user.created_at).toLocaleDateString() : "Active"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-5 text-right", children: activeGroup === "ADMINS" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-300 uppercase tracking-widest", children: "Protected Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16, className: "text-slate-200" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleUpdateStatus(user.id, !!user.isVerified),
                className: `p-2 rounded-xl transition-all ${user.isVerified ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`,
                title: user.isVerified ? "Restrict Access" : "Restore Access",
                children: user.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsx(XCircle, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleDelete(user.id),
                className: "p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all",
                title: "Wipe Account Data",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 })
              }
            )
          ] }) })
        ] }, user.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-slate-200 bg-slate-50/30 text-[10px] font-black uppercase tracking-widest text-slate-400 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Listing ",
          filteredUsers.length,
          " entries"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "System v12.42 Identity Core" })
      ] })
    ] }),
    activeGroup === "ADMINS" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-4 items-center animate-in slide-in-from-bottom-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-amber-200 rounded-xl text-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black text-amber-900 uppercase tracking-tight", children: "Privileged Access Warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 font-medium", children: "System administrators have full platform control. Management of these accounts is restricted to the Root Administrator." })
      ] })
    ] })
  ] });
};
export {
  AdminUserManagementScreen
};
