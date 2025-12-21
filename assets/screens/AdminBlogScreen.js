import { r as reactExports, j as jsxRuntimeExports, P as PenTool, $ as Eye, X, a0 as Save, V as Image, a1 as Search, a2 as SquarePen, a3 as Trash2 } from "../vendor.js";
import { R as RichTextEditor } from "../components/RichTextEditor.js";
const AdminBlogScreen = ({ blogs = [], onAddBlog, onUpdateBlog, onDeleteBlog }) => {
  const [editingId, setEditingId] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [excerpt, setExcerpt] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [author, setAuthor] = reactExports.useState("Admin");
  const [category, setCategory] = reactExports.useState("Strategy");
  const [isPreview, setIsPreview] = reactExports.useState(false);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const handleSubmit = () => {
    var _a;
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }
    const postData = {
      id: editingId || Date.now(),
      title,
      excerpt,
      content,
      author,
      category,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000",
      date: editingId ? ((_a = blogs.find((b) => b.id === editingId)) == null ? void 0 : _a.date) || (/* @__PURE__ */ new Date()).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    };
    if (editingId && onUpdateBlog) {
      onUpdateBlog(postData);
      alert("Blog Updated!");
    } else if (onAddBlog) {
      onAddBlog(postData);
      alert("Blog Published!");
    }
    resetForm();
  };
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setImageUrl("");
    setAuthor("Admin");
    setCategory("Strategy");
    setIsPreview(false);
  };
  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setImageUrl(blog.imageUrl || "");
    setAuthor(blog.author);
    setCategory(blog.category || "Strategy");
    setIsPreview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const filteredBlogs = blogs.filter((b) => b.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "w-8 h-8 text-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Blog Editor" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-pink-100 text-lg opacity-90 max-w-2xl", children: "Write and publish insightful articles, exam strategies, and updates for students." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setIsPreview(!isPreview),
              className: `px-4 py-2 rounded-lg font-bold flex items-center transition-colors ${isPreview ? "bg-white/90 text-rose-700" : "bg-pink-700 text-white border border-pink-500 hover:bg-pink-800"}`,
              children: isPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { size: 16, className: "mr-2" }),
                " Edit"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16, className: "mr-2" }),
                " Preview"
              ] })
            }
          ),
          editingId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: resetForm,
              className: "bg-white/20 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/30 flex items-center backdrop-blur-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, className: "mr-2" }),
                " Cancel"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleSubmit,
              className: "bg-white text-rose-600 px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-slate-50 flex items-center transition-all active:scale-95",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 18, className: "mr-2" }),
                " ",
                editingId ? "Update Post" : "Publish"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-20 w-32 h-32 rounded-full bg-white opacity-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-4 ${isPreview ? "hidden" : "block"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Article Title",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              className: "w-full text-3xl font-black text-slate-900 placeholder:text-slate-300 border-none outline-none bg-transparent"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "Short excerpt or summary...",
              value: excerpt,
              onChange: (e) => setExcerpt(e.target.value),
              className: "w-full text-lg text-slate-600 placeholder:text-slate-300 border-none outline-none bg-transparent resize-none h-20"
            }
          )
        ] }),
        isPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-xl border border-slate-200 shadow-sm min-h-[600px]", children: [
          imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt: "Cover", className: "w-full h-64 object-cover rounded-xl mb-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-slate-900 mb-4", children: title || "Untitled Post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-600 uppercase", children: author }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (/* @__PURE__ */ new Date()).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-100 px-2 py-0.5 rounded text-xs uppercase font-bold", children: category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "blog-content",
              dangerouslySetInnerHTML: { __html: content }
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          RichTextEditor,
          {
            content,
            onChange: setContent,
            placeholder: "Write your masterpiece here... Use the toolbar for formatting."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `lg:col-span-1 space-y-6 ${isPreview ? "hidden lg:block opacity-50 pointer-events-none" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 sticky top-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 border-b border-slate-100 pb-2", children: "Post Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: category,
              onChange: (e) => setCategory(e.target.value),
              className: "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Strategy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Motivation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Subject-wise" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Updates" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "News" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Author Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: author,
              onChange: (e) => setAuthor(e.target.value),
              className: "w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Cover Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "absolute left-3 top-2.5 text-slate-400 w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: imageUrl,
                onChange: (e) => setImageUrl(e.target.value),
                placeholder: "https://...",
                className: "w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
              }
            )
          ] }) }),
          imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 rounded-lg overflow-hidden h-32 border border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt: "Preview", className: "w-full h-full object-cover" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800", children: "Published Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Manage existing blog posts." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search posts...",
              className: "w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: filteredBlogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-slate-400", children: "No blog posts found." }) : filteredBlogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 sm:p-6 flex flex-col sm:flex-row gap-4 hover:bg-slate-50 transition-colors ${editingId === blog.id ? "bg-blue-50/50 ring-2 ring-inset ring-blue-100" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:w-48 h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200", children: blog.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: blog.imageUrl, alt: blog.title, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-slate-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100", children: blog.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200", children: new Date(blog.date).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold text-slate-800 mb-2", children: blog.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 line-clamp-2 mb-3", children: blog.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => handleEdit(blog),
                className: "flex items-center px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 text-xs font-bold hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all bg-slate-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3 mr-1.5" }),
                  " Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  if (confirm("Are you sure you want to delete this post?")) {
                    if (onDeleteBlog) onDeleteBlog(blog.id);
                  }
                },
                className: "flex items-center px-3 py-1.5 rounded-md border border-red-100 text-red-600 text-xs font-bold hover:bg-red-50 hover:border-red-200 transition-all bg-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1.5" }),
                  " Delete"
                ]
              }
            )
          ] })
        ] })
      ] }, blog.id)) })
    ] })
  ] });
};
export {
  AdminBlogScreen
};
