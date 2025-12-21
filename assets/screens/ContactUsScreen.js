import { r as reactExports, j as jsxRuntimeExports, ad as Mail, aS as Phone, aT as MapPin, aM as MessageSquare, S as Send } from "../vendor.js";
import { B as Button } from "../components/Button.js";
const ContactUsScreen = () => {
  const [formData, setFormData] = reactExports.useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent(true);
    try {
      await fetch("/api/contact.php", {
        method: "POST",
        body: JSON.stringify(formData)
      });
    } catch (e2) {
      console.error(e2);
    }
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert("Message sent successfully!");
    }, 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-50 py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Get in Touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mt-2", children: "Have questions about the app? We're here to help." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 p-3 rounded-xl text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Email Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-1", children: "support@iitjeeprep.com" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "admin@iitjeeprep.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 p-3 rounded-xl text-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Call Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Mon-Fri from 9am to 6pm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 font-mono", children: "+91 98765 43210" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 p-3 rounded-xl text-orange-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Office" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mt-1", children: [
              "123 Education Hub,",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Kota, Rajasthan 324005"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-slate-800 mb-6 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 mr-2 text-blue-600" }),
          " Send us a Message"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "text-xs font-bold text-slate-500 uppercase", children: "Your Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "name",
                  type: "text",
                  required: true,
                  className: "w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none",
                  placeholder: "John Doe",
                  value: formData.name,
                  onChange: (e) => setFormData({ ...formData, name: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "text-xs font-bold text-slate-500 uppercase", children: "Your Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "email",
                  type: "email",
                  required: true,
                  className: "w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none",
                  placeholder: "john@example.com",
                  value: formData.email,
                  onChange: (e) => setFormData({ ...formData, email: e.target.value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "subject", className: "text-xs font-bold text-slate-500 uppercase", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "subject",
                type: "text",
                required: true,
                className: "w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none",
                placeholder: "How can we help?",
                value: formData.subject,
                onChange: (e) => setFormData({ ...formData, subject: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "text-xs font-bold text-slate-500 uppercase", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "message",
                required: true,
                className: "w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none h-32 resize-none",
                placeholder: "Type your message here...",
                value: formData.message,
                onChange: (e) => setFormData({ ...formData, message: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              isLoading: sent,
              className: "w-full",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
                " Send Message"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
export {
  ContactUsScreen
};
