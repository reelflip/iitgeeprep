import { j as jsxRuntimeExports } from "../node_modules/react/jsx-runtime.js";
import { r as reactExports } from "../node_modules/react/index.js";
import Undo from "../node_modules/lucide-react/dist/esm/icons/undo.js";
import Redo from "../node_modules/lucide-react/dist/esm/icons/redo.js";
import Bold from "../node_modules/lucide-react/dist/esm/icons/bold.js";
import Italic from "../node_modules/lucide-react/dist/esm/icons/italic.js";
import Underline from "../node_modules/lucide-react/dist/esm/icons/underline.js";
import Heading1 from "../node_modules/lucide-react/dist/esm/icons/heading-1.js";
import Heading2 from "../node_modules/lucide-react/dist/esm/icons/heading-2.js";
import Type from "../node_modules/lucide-react/dist/esm/icons/type.js";
import AlignLeft from "../node_modules/lucide-react/dist/esm/icons/align-left.js";
import AlignCenter from "../node_modules/lucide-react/dist/esm/icons/align-center.js";
import AlignRight from "../node_modules/lucide-react/dist/esm/icons/align-right.js";
import List from "../node_modules/lucide-react/dist/esm/icons/list.js";
import ListOrdered from "../node_modules/lucide-react/dist/esm/icons/list-ordered.js";
import Quote from "../node_modules/lucide-react/dist/esm/icons/quote.js";
import Code from "../node_modules/lucide-react/dist/esm/icons/code.js";
import Link from "../node_modules/lucide-react/dist/esm/icons/link.js";
import Image from "../node_modules/lucide-react/dist/esm/icons/image.js";
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
  RichTextEditor
};
