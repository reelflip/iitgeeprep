import { r as reactExports, j as jsxRuntimeExports, h as Layers } from "../vendor.js";
const ContentManagerScreen = ({
  flashcards,
  hacks,
  blogs,
  onAddFlashcard,
  onAddHack,
  onAddBlog,
  onDelete,
  initialTab = "flashcards"
}) => {
  const [activeTab, setActiveTab] = reactExports.useState(initialTab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-8 h-8 text-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Content Manager" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-lg opacity-90 max-w-2xl", children: "Manage flashcards, memory hacks, and other educational resources." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex bg-white/20 p-1 rounded-xl backdrop-blur-sm border border-white/20 hidden md:flex", children: ["flashcards", "hacks", "blog"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab(tab),
            className: `px-4 py-2 text-sm font-bold capitalize rounded-lg transition-all ${activeTab === tab ? "bg-white text-blue-700 shadow-md" : "text-blue-100 hover:bg-white/10"}`,
            children: tab
          },
          tab
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden flex bg-slate-100 p-1 rounded-lg", children: ["flashcards", "hacks", "blog"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setActiveTab(tab),
        className: `flex-1 px-4 py-2 text-sm font-bold capitalize rounded-md transition-all ${activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
        children: tab
      },
      tab
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[500px]", children: [
      activeTab === "flashcards" && /* @__PURE__ */ jsxRuntimeExports.jsx(FlashcardManager, { cards: flashcards, onAdd: onAddFlashcard, onDelete }),
      activeTab === "hacks" && /* @__PURE__ */ jsxRuntimeExports.jsx(HacksManager, { hacks, onAdd: onAddHack, onDelete }),
      activeTab === "blog" && /* @__PURE__ */ jsxRuntimeExports.jsx(BlogManager, { blogs, onAdd: onAddBlog, onDelete })
    ] })
  ] });
};
const FlashcardManager = ({ cards, onAdd, onDelete }) => {
  const [front, setFront] = reactExports.useState("");
  const [back, setBack] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ front, back });
    setFront("");
    setBack("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col md:flex-row gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Front (Question)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: front, onChange: (e) => setFront(e.target.value), className: "w-full p-2 border rounded", placeholder: "e.g. Unit of Force" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Back (Answer)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: back, onChange: (e) => setBack(e.target.value), className: "w-full p-2 border rounded", placeholder: "e.g. Newton (N)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 w-full md:w-auto", children: "Add Card" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 border rounded hover:bg-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-800", children: [
          "Q: ",
          c.front
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm", children: [
          "A: ",
          c.back
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete("flashcard", c.id), className: "text-red-500 hover:bg-red-50 p-2 rounded", children: "🗑️" })
    ] }, c.id)) })
  ] });
};
const HacksManager = ({ hacks, onAdd, onDelete }) => {
  const [title, setTitle] = reactExports.useState("");
  const [tag, setTag] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description: desc, tag });
    setTitle("");
    setDesc("");
    setTag("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: title, onChange: (e) => setTitle(e.target.value), className: "w-full p-2 border rounded", placeholder: "e.g. Periodic Table Trick" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Tag" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: tag, onChange: (e) => setTag(e.target.value), className: "w-full p-2 border rounded", placeholder: "e.g. Chemistry" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: desc, onChange: (e) => setDesc(e.target.value), className: "w-full p-2 border rounded", rows: 3, placeholder: "Describe the hack..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700", children: "Add Memory Hack" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: hacks.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 border rounded hover:bg-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800", children: h.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600", children: h.tag })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm truncate max-w-lg", children: h.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete("hack", h.id), className: "text-red-500 hover:bg-red-50 p-2 rounded", children: "🗑️" })
    ] }, h.id)) })
  ] });
};
const BlogManager = ({ blogs, onAdd, onDelete }) => {
  const [title, setTitle] = reactExports.useState("");
  const [excerpt, setExcerpt] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [image, setImage] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, excerpt, content, imageUrl: image, author: "Admin" });
    setTitle("");
    setExcerpt("");
    setContent("");
    setImage("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Blog Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: title, onChange: (e) => setTitle(e.target.value), className: "w-full p-2 border rounded", placeholder: "e.g. How to crack JEE in 3 months" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Excerpt (Short Summary)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: excerpt, onChange: (e) => setExcerpt(e.target.value), className: "w-full p-2 border rounded", placeholder: "A brief overview..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Full Content (HTML Supported)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: content, onChange: (e) => setContent(e.target.value), className: "w-full p-2 border rounded font-mono text-sm", rows: 5, placeholder: "<p>Write your blog post here...</p>" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 mb-1", children: "Cover Image URL (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: image, onChange: (e) => setImage(e.target.value), className: "w-full p-2 border rounded", placeholder: "https://..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700", children: "Publish Post" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: blogs.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 border rounded hover:bg-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800", children: b.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-xs", children: [
          "By ",
          b.author,
          " • ",
          new Date(b.date).toLocaleDateString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete("blog", b.id), className: "text-red-500 hover:bg-red-50 p-2 rounded", children: "🗑️" })
    ] }, b.id)) })
  ] });
};
export {
  ContentManagerScreen
};
