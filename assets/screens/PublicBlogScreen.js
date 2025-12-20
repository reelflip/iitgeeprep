import { r as reactExports, j as jsxRuntimeExports, u as ArrowLeft, aN as Tag, U as User, i as Calendar } from "../vendor.js";
const PublicBlogScreen = ({ blogs, onBack }) => {
  const [selectedPost, setSelectedPost] = reactExports.useState(null);
  if (selectedPost) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white font-inter", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "border-b sticky top-0 bg-white/95 backdrop-blur-md z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelectedPost(null),
            className: "flex items-center text-slate-600 hover:text-blue-600 transition-colors text-sm font-bold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
              " Back to Blog"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Reading Mode" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4", children: [
        selectedPost.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedPost.imageUrl, alt: selectedPost.title, className: "w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-slate-500 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 mr-1" }),
            " ",
            selectedPost.category || "General"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 mr-1" }),
            " ",
            selectedPost.author
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 mr-1" }),
            " ",
            new Date(selectedPost.date).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight", children: selectedPost.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-slate-100 my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blog-content prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-blue-600",
            dangerouslySetInnerHTML: { __html: selectedPost.content }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-slate-100 my-12" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedPost(null),
            className: "text-slate-500 hover:text-slate-800 text-sm font-bold",
            children: "Read more articles"
          }
        ) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white animate-in fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "border-b sticky top-0 bg-white/80 backdrop-blur-md z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: [
          "IIT",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "JEE" }),
          "Prep"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-bold uppercase", children: "Blog" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onBack,
          className: "text-sm font-bold text-slate-600 hover:text-blue-600",
          children: "← Back to Login"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 text-white py-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: "Insights for Aspirants" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg", children: "Exam strategies, motivational stories, and subject deep-dives." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 py-12", children: blogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl", children: "No posts published yet." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: blogs.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "flex flex-col group cursor-pointer",
        onClick: () => setSelectedPost(post),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-slate-200 rounded-xl overflow-hidden mb-4 relative", children: post.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.imageUrl, alt: post.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl opacity-20", children: "✍️" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-500 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-600 uppercase", children: post.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.date).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed", children: post.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setSelectedPost(post);
                },
                className: "text-blue-600 font-bold text-sm underline decoration-blue-200 hover:decoration-blue-600 transition-all",
                children: "Read Article"
              }
            )
          ] })
        ]
      },
      post.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-slate-50 border-t py-12 text-center text-slate-400 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " IITGEEPrep. All rights reserved."
    ] }) })
  ] });
};
export {
  PublicBlogScreen
};
