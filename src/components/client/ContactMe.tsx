"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  SVGProps,
} from "react";
import emailjs from "@emailjs/browser";
import {
  MingcuteAlertCircleFill,
  MingcuteArrowRightUpLine,
  MingcuteCheckCircleFill,
  MingcuteGithubLine,
  MingcuteLinkedinLine,
  MingcuteMailLine,
  MingcuteSendLine,
  MingcuteTelegramLine,
} from "@/icons/icons";

interface ContactMeProps {
  scrollToSection?: (id: string) => void;
}

// Contact form field component
const FormField = memo(
  ({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = false,
    placeholder,
    rows,
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => void;
    required?: boolean;
    placeholder?: string;
    rows?: number;
  }) => {
    const baseClasses =
      "w-full px-4 py-3 bg-slate-700/90  border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300";

    return (
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label} {required && <span className="text-cyan-400">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            className={`${baseClasses} resize-none`}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={baseClasses}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

// Contact method card component
const ContactMethodCard = memo(
  ({
    method,
    index,
    isVisible,
  }: {
    method: {
      id: string;
      label: string;
      value: string;
      icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
      color: string;
      borderColor: string;
      action: () => void;
    };
    index: number;
    isVisible: boolean;
  }) => {
    return (
      <button
        onClick={method.action}
        className={`group relative w-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 flex items-center gap-4 hover:${method.borderColor} transition-all duration-500 text-left hover:-translate-y-1 ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
        />

        <div
          className={`relative w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <method.icon className="w-7 h-7 text-white" />
        </div>

        <div className="relative flex-1">
          <h3 className="font-semibold text-white mb-1">{method.label}</h3>
          <p className="text-sm text-slate-400">{method.value}</p>
        </div>

        <MingcuteArrowRightUpLine className="relative w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
      </button>
    );
  },
);

ContactMethodCard.displayName = "ContactMethodCard";

// Main ContactMe component
const ContactMe = memo<ContactMeProps>(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">(
    "",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const contactMethods = [
    {
      id: "email",
      label: "Email",
      value: "mdelever77@gmail.com",
      icon: MingcuteMailLine,
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-400/50",
      action: () => (window.location.href = "mailto:mdelever77@gmail.com"),
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@mahdi_delavar",
      icon: MingcuteTelegramLine,
      color: "from-sky-500 to-blue-600",
      borderColor: "border-sky-400/50",
      action: () => window.open("https://t.me/osis13", "_blank"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "mahdi-delavar",
      icon: MingcuteLinkedinLine,
      color: "from-purple-500 to-indigo-600",
      borderColor: "border-purple-400/50",
      action: () =>
        window.open(
          "https://www.linkedin.com/in/mahdi-delavar-5338ba280",
          "_blank",
        ),
    },
    {
      id: "github",
      label: "GitHub",
      value: "mahdidelavarz",
      icon: MingcuteGithubLine,
      color: "from-slate-600 to-slate-800",
      borderColor: "border-slate-500/50",
      action: () => window.open("https://github.com/mahdidelavarz", "_blank"),
    },
  ];

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        setSubmitStatus("error");
        setErrorMessage("Please fill in all required fields.");
        setTimeout(() => {
          setSubmitStatus("");
          setErrorMessage("");
        }, 5000);
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus("");
      setErrorMessage("");

      try {
        // Initialize EmailJS
        emailjs.init(EMAILJS_PUBLIC_KEY!);

        // Prepare template parameters
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "mdelever77@gmail.com",
        };

        // Send email using EmailJS
        const response = await emailjs.send(
          EMAILJS_SERVICE_ID!,
          EMAILJS_TEMPLATE_ID!,
          templateParams,
          EMAILJS_PUBLIC_KEY,
        );

        if (response.status === 200) {
          setSubmitStatus("success");
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setTimeout(() => setSubmitStatus(""), 5000);
        }
      } catch (error: any) {
        console.error("EmailJS Error:", error);
        setSubmitStatus("error");

        // Provide more specific error messages
        let errorMsg =
          "Failed to send message. Please try again or contact me directly.";

        if (error.text) {
          errorMsg = error.text;
        } else if (error.message) {
          errorMsg = error.message;
        } else if (typeof error === "string") {
          errorMsg = error;
        }

        setErrorMessage(errorMsg);
        setTimeout(() => {
          setSubmitStatus("");
          setErrorMessage("");
        }, 7000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY],
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen pt-12 pb-40 md:pt-20 overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full  mb-6">
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              Contact
            </span>
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-sky-400 to-white bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            I&apos;m open to frontend opportunities, technical collaboration, and
            conversations around complex product engineering.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <ContactMethodCard
                    key={method.id}
                    method={method}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Message
              </h3>

              <div className="space-y-5">
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <FormField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Frontend opportunity or collaboration"
                />

                {/* Message */}
                <FormField
                  label="Message"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Tell me what you'd like to discuss..."
                />

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group relative w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MingcuteSendLine width="20" height="20" />
                        Send Message
                      </>
                    )}
                  </div>
                </button>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl p-4 flex items-center gap-3">
                    <MingcuteCheckCircleFill
                      width="24"
                      height="24"
                      className="text-emerald-400 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-emerald-400">
                        Message sent successfully!
                      </p>
                      <p className="text-sm text-emerald-400/70">
                        Thanks for reaching out. I&apos;ll reply as soon as I can.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 flex items-center gap-3">
                    <MingcuteAlertCircleFill
                      width="24"
                      height="24"
                      className="text-red-400 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-red-400">
                        Failed to send message
                      </p>
                      <p className="text-sm text-red-400/70">{errorMessage}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

ContactMe.displayName = "ContactMe";

export default ContactMe;
