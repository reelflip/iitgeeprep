import { r as reactExports, j as jsxRuntimeExports, E as Undo, J as Redo, K as Bold, N as Italic, O as Underline, Q as Heading1, V as Heading2, W as Type, _ as AlignLeft, $ as AlignCenter, a0 as AlignRight, a1 as List, a2 as ListOrdered, a3 as Quote, a4 as Code, a5 as Link, a6 as Image } from "../vendor.js";
const RichTextEditor = ({ content, onChange, placeholder, className = "" }) => {
  const editorRef = reactExports.useRef(null);
  const execCmd = (command, value = void 0) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  reactExports.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      if (content === "" && editorRef.current.innerHTML !== "") {
        editorRef.current.innerHTML = "";
      } else if (editorRef.current.innerHTML === "") {
        editorRef.current.innerHTML = content;
      }
    }
  }, [content]);
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  const ToolbarButton = ({ icon: Icon, cmd, arg, title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onMouseDown: (e) => {
        e.preventDefault();
        execCmd(cmd, arg);
      },
      className: "p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors",
      title,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 })
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mr-2 border-r border-slate-200 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Undo, cmd: "undo", title: "Undo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Redo, cmd: "redo", title: "Redo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mr-2 border-r border-slate-200 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Bold, cmd: "bold", title: "Bold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Italic, cmd: "italic", title: "Italic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Underline, cmd: "underline", title: "Underline" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mr-2 border-r border-slate-200 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Heading1, cmd: "formatBlock", arg: "H2", title: "Heading 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Heading2, cmd: "formatBlock", arg: "H3", title: "Heading 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Type, cmd: "formatBlock", arg: "P", title: "Paragraph" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mr-2 border-r border-slate-200 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: AlignLeft, cmd: "justifyLeft", title: "Align Left" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: AlignCenter, cmd: "justifyCenter", title: "Align Center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: AlignRight, cmd: "justifyRight", title: "Align Right" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mr-2 border-r border-slate-200 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: List, cmd: "insertUnorderedList", title: "Bullet List" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: ListOrdered, cmd: "insertOrderedList", title: "Numbered List" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Quote, cmd: "formatBlock", arg: "BLOCKQUOTE", title: "Quote" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Code, cmd: "formatBlock", arg: "PRE", title: "Code Block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onMouseDown: (e) => {
              e.preventDefault();
              const url = prompt("Enter Link URL:");
              if (url) execCmd("createLink", url);
            },
            className: "p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors",
            title: "Link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { size: 18 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onMouseDown: (e) => {
              e.preventDefault();
              const url = prompt("Enter Image URL:");
              if (url) execCmd("insertImage", url);
            },
            className: "p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors",
            title: "Image",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 18 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: editorRef,
        contentEditable: true,
        onInput: handleInput,
        className: "p-6 min-h-[500px] outline-none blog-content",
        dangerouslySetInnerHTML: { __html: content },
        suppressContentEditableWarning: true,
        "data-placeholder": placeholder
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          cursor: text;
        }
      ` })
  ] });
};
export {
  RichTextEditor as R
};
