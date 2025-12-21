import { r as reactExports, j as jsxRuntimeExports, a9 as Trash2, ae as Plus, a6 as Save, af as Youtube, X, ag as Book, ah as FolderPlus, ai as FilePlus, F as FileText, aj as Video } from "../vendor.js";
import { R as RichTextEditor } from "../components/RichTextEditor.js";
const AdminSyllabusScreen = ({
  syllabus,
  onAddTopic,
  onDeleteTopic,
  chapterNotes = {},
  onUpdateNotes,
  videoMap = {},
  onUpdateVideo
}) => {
  const [subject, setSubject] = reactExports.useState("Physics");
  const [chapter, setChapter] = reactExports.useState("");
  const [topicName, setTopicName] = reactExports.useState("");
  const [editingNoteTopic, setEditingNoteTopic] = reactExports.useState(null);
  const [pages, setPages] = reactExports.useState([]);
  const [activePageIndex, setActivePageIndex] = reactExports.useState(0);
  const [editingVideoTopic, setEditingVideoTopic] = reactExports.useState(null);
  const [videoUrl, setVideoUrl] = reactExports.useState("");
  const [videoDesc, setVideoDesc] = reactExports.useState("");
  const grouped = syllabus.filter((t) => t.subject === subject).reduce((acc, topic) => {
    if (!acc[topic.chapter]) acc[topic.chapter] = [];
    acc[topic.chapter].push(topic);
    return acc;
  }, {});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chapter || !topicName) return;
    onAddTopic({ name: topicName, chapter, subject });
    setTopicName("");
  };
  const openNoteEditor = (topic) => {
    const existing = chapterNotes[topic.id];
    setPages(existing ? [...existing.pages] : [""]);
    setEditingNoteTopic({ id: topic.id, name: topic.name });
    setActivePageIndex(0);
  };
  const saveNotes = () => {
    if (editingNoteTopic && onUpdateNotes) {
      onUpdateNotes(editingNoteTopic.id, pages);
      setEditingNoteTopic(null);
    }
  };
  const updateCurrentPage = (content) => {
    const newPages = [...pages];
    newPages[activePageIndex] = content;
    setPages(newPages);
  };
  const addPage = () => {
    setPages([...pages, ""]);
    setActivePageIndex(pages.length);
  };
  const deletePage = (index) => {
    if (pages.length <= 1) {
      setPages([""]);
      return;
    }
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
    if (activePageIndex >= newPages.length) setActivePageIndex(newPages.length - 1);
  };
  const openVideoEditor = (topic) => {
    const existing = videoMap[topic.id];
    setVideoUrl(existing ? existing.videoUrl : "");
    setVideoDesc(existing ? existing.description || "" : "");
    setEditingVideoTopic({ id: topic.id, name: topic.name });
  };
  const saveVideo = () => {
    if (editingVideoTopic && onUpdateVideo) {
      let finalUrl = videoUrl;
      if (finalUrl.includes("watch?v=")) {
        finalUrl = finalUrl.replace("watch?v=", "embed/");
      } else if (finalUrl.includes("youtu.be/")) {
        finalUrl = finalUrl.replace("youtu.be/", "www.youtube.com/embed/");
      }
      onUpdateVideo(editingVideoTopic.id, finalUrl, videoDesc);
      setEditingVideoTopic(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in relative", children: [
    editingNoteTopic && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex overflow-hidden shadow-2xl animate-in zoom-in-95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64 bg-slate-50 border-r border-slate-200 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 text-sm truncate", children: editingNoteTopic.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
            "Managing ",
            pages.length,
            " Pages"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-2 space-y-2", children: [
          pages.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => setActivePageIndex(idx),
              className: `p-3 rounded-lg border cursor-pointer flex justify-between items-center transition-all ${activePageIndex === idx ? "bg-blue-50 border-blue-200 shadow-sm" : "bg-white border-slate-200 hover:border-blue-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-bold ${activePageIndex === idx ? "text-blue-700" : "text-slate-600"}`, children: [
                  "Page ",
                  idx + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      deletePage(idx);
                    },
                    className: "text-slate-400 hover:text-red-500 p-1",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ]
            },
            idx
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: addPage,
              className: "w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-400 hover:text-blue-600 text-sm font-bold transition-all flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add Page"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-slate-200 flex justify-between items-center bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-slate-500 uppercase tracking-wider", children: [
            "Editing Page ",
            activePageIndex + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingNoteTopic(null), className: "px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: saveNotes, className: "px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              " Save All"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto bg-slate-50 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          RichTextEditor,
          {
            content: pages[activePageIndex],
            onChange: updateCurrentPage,
            placeholder: "Start typing your chapter notes here...",
            className: "h-full min-h-[500px]"
          }
        ) })
      ] })
    ] }) }),
    editingVideoTopic && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6 border-b border-slate-100 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-5 h-5 text-red-600" }),
          "Video Lesson: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 font-normal", children: editingVideoTopic.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingVideoTopic(null), className: "text-slate-400 hover:text-slate-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "YouTube URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100",
              placeholder: "https://www.youtube.com/watch?v=...",
              value: videoUrl,
              onChange: (e) => setVideoUrl(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 mt-1", children: "Paste any YouTube link. We'll convert it automatically." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100 h-24 resize-none",
              placeholder: "Short description of the video...",
              value: videoDesc,
              onChange: (e) => setVideoDesc(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveVideo, className: "flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors", children: "Save Video" }),
          videoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setVideoUrl("");
                setVideoDesc("");
              },
              className: "px-4 py-3 border border-red-200 text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors",
              children: "Clear"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 rounded-xl p-8 text-white shadow-lg flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Syllabus & Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Manage topics, chapter notes, and video lessons." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white/10 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Book, { className: "w-8 h-8 text-blue-400" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 mb-6 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5 mr-2 text-blue-600" }),
          " Add New Topic"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex bg-slate-50 p-1 rounded-lg border border-slate-200", children: ["Physics", "Chemistry", "Maths"].map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSubject(sub),
                className: `flex-1 py-2 text-xs font-bold rounded-md transition-all ${subject === sub ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}`,
                children: sub
              },
              sub
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Chapter Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "absolute left-3 top-2.5 w-4 h-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: chapter,
                  onChange: (e) => setChapter(e.target.value),
                  placeholder: "e.g. Electromagnetism",
                  className: "w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none",
                  required: true,
                  list: "existing-chapters"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "existing-chapters", children: Object.keys(grouped).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c }, c)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase mb-2", children: "Topic Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlus, { className: "absolute left-3 top-2.5 w-4 h-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: topicName,
                  onChange: (e) => setTopicName(e.target.value),
                  placeholder: "e.g. Gauss's Law",
                  className: "w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                " Add to Syllabus"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800", children: [
            "Existing Syllabus (",
            syllabus.filter((t) => t.subject === subject).length,
            " Items)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-500", children: subject })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2", children: [
          Object.entries(grouped).map(([chap, topics]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-700 text-sm", children: chap }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400", children: [
                topics.length,
                " Topics"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: topics.map((t) => {
              const hasNotes = chapterNotes && chapterNotes[t.id];
              const hasVideo = videoMap && videoMap[t.id];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex justify-between items-center hover:bg-slate-50 transition-colors group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-600", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                    hasNotes && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-green-100 text-green-700 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase", children: "Note" }),
                    hasVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-100 text-red-700 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase", children: "Video" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => openNoteEditor(t),
                      className: "flex items-center gap-1 bg-white border border-slate-200 text-slate-600 hover:text-blue-700 hover:border-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                        " Notes"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => openVideoEditor(t),
                      className: "flex items-center gap-1 bg-white border border-slate-200 text-slate-600 hover:text-red-700 hover:border-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3" }),
                        " Video"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        if (confirm(`Delete topic "${t.name}"?`)) onDeleteTopic(t.id);
                      },
                      className: "text-slate-300 hover:text-red-500 p-1.5 rounded transition-all bg-white hover:bg-red-50 border border-transparent hover:border-red-200",
                      title: "Delete Topic",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }, t.id);
            }) })
          ] }, chap)),
          Object.keys(grouped).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 bg-slate-50 rounded-xl border border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400", children: [
            "No chapters found for ",
            subject,
            "."
          ] }) })
        ] })
      ] })
    ] })
  ] });
};
export {
  AdminSyllabusScreen
};
