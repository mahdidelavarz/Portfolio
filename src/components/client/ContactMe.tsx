"use client";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { Icon } from "@iconify/react";
import emailjs from "@emailjs/browser";

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
    options,
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    options?: { value: string; label: string }[];
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
        ) : type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={baseClasses }
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
      icon: string;
      color: string;
      borderColor: string;
      shadowColor: string;
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
          <Icon icon={method.icon} className="w-7 h-7 text-white" />
        </div>

        <div className="relative flex-1">
          <h3 className="font-semibold text-white mb-1">{method.label}</h3>
          <p className="text-sm text-slate-400">{method.value}</p>
        </div>

        <Icon
          icon="mingcute:arrow-right-up-line"
          className="relative w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors"
        />
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
    budget: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");
  const [errorMessage, setErrorMessage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  // EmailJS Configuration - Replace with your actual IDs from https://dashboard.emailjs.com
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ;

  const contactMethods = [
    {
      id: "email",
      label: "Email",
      value: "mdelever77@gmail.com",
      icon: "mingcute:mail-line",
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-400/50",
      shadowColor: "shadow-cyan-500/20",
      action: () => (window.location.href = "mailto:mdelever77@gmail.com"),
    },
    {
      id: "phone",
      label: "Phone",
      value: "+98 902 557 4357",
      icon: "mingcute:phone-line",
      color: "from-emerald-500 to-teal-600",
      borderColor: "border-emerald-400/50",
      shadowColor: "shadow-emerald-500/20",
      action: () => (window.location.href = "tel:+989025574357"),
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@mahdi_delavar",
      icon: "mingcute:telegram-line",
      color: "from-sky-500 to-blue-600",
      borderColor: "border-sky-400/50",
      shadowColor: "shadow-sky-500/20",
      action: () => window.open("https://t.me/osis13", "_blank"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "mahdi-delavar",
      icon: "mingcute:linkedin-line",
      color: "from-purple-500 to-indigo-600",
      borderColor: "border-purple-400/50",
      shadowColor: "shadow-purple-500/20",
      action: () =>
        window.open("https://www.linkedin.com/in/mahdi-delavar-5338ba280", "_blank"),
    },
    {
      id: "github",
      label: "GitHub",
      value: "mahdidelavarz",
      icon: "mingcute:github-line",
      color: "from-slate-600 to-slate-800",
      borderColor: "border-slate-500/50",
      shadowColor: "shadow-slate-600/20",
      action: () => window.open("https://github.com/mahdidelavarz", "_blank"),
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Projects",
      icon: "mingcute:rocket-line",
      color: "from-cyan-500 to-blue-600",
    },
    {
      value: "24h",
      label: "Response",
      icon: "mingcute:time-line",
      color: "from-purple-500 to-pink-600",
    },
    {
      value: "100%",
      label: "Satisfaction",
      icon: "mingcute:star-line",
      color: "from-emerald-500 to-teal-600",
    },
    {
      value: "3+",
      label: "Years Exp",
      icon: "mingcute:trophy-line",
      color: "from-orange-500 to-red-600",
    },
  ];

  const budgetOptions = [
    { value: "under-5k", label: "Under $5,000" },
    { value: "5k-10k", label: "$5,000 - $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-plus", label: "$25,000+" },
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP" },
    { value: "1-month", label: "Within 1 month" },
    { value: "2-3-months", label: "2-3 months" },
    { value: "flexible", label: "Flexible" },
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
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" || 
        EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" || 
        EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      setSubmitStatus("error");
      setErrorMessage("EmailJS is not configured. Please check the setup instructions.");
      setTimeout(() => {
        setSubmitStatus("");
        setErrorMessage("");
      }, 7000);
      return;
    }
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
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
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        budget: formData.budget || "Not specified",
        timeline: formData.timeline || "Not specified",
        to_email: "mdelever77@gmail.com",
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          budget: "",
          timeline: "",
        });
        setTimeout(() => setSubmitStatus(""), 5000);
      }
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
      
      // Provide more specific error messages
      let errorMsg = "Failed to send message. Please try again or contact me directly.";
      
      if (error.text) {
        errorMsg = error.text;
      } else if (error.message) {
        errorMsg = error.message;
      } else if (typeof error === 'string') {
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
  }, [formData, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950"
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
              Let's Work Together
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? I'm here to help bring
            your vision to life with modern technologies.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-300 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
              />
              <div className="relative">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon icon={stat.icon} className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
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

              {/* Availability Notice */}
              <div className="mt-6 p-4 bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-sm text-emerald-400 font-medium">
                    Available for freelance projects
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-6 p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Icon
                    icon="mingcute:time-line"
                    className="w-5 h-5 text-cyan-400"
                  />
                  Working Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-slate-500">Closed</span>
                  </div>
                </div>
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
                  placeholder="Project inquiry"
                />

                {/* Budget & Timeline */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Budget Range"
                    name="budget"
                    type="select"
                    value={formData.budget}
                    onChange={handleInputChange}
                    options={budgetOptions}
                  />
                  <FormField
                    label="Timeline"
                    name="timeline"
                    type="select"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    options={timelineOptions}
                  />
                </div>

                {/* Message */}
                <FormField
                  label="Project Details"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
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
                        <Icon
                          icon="mingcute:send-line"
                          width="20"
                          height="20"
                        />
                        Send Message
                      </>
                    )}
                  </div>
                </button>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl p-4 flex items-center gap-3">
                    <Icon
                      icon="mingcute:check-circle-fill"
                      width="24"
                      height="24"
                      className="text-emerald-400 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-emerald-400">
                        Message sent successfully!
                      </p>
                      <p className="text-sm text-emerald-400/70">
                        I'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 flex items-center gap-3">
                    <Icon
                      icon="mingcute:alert-circle-fill"
                      width="24"
                      height="24"
                      className="text-red-400 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-red-400">
                        Failed to send message
                      </p>
                      <p className="text-sm text-red-400/70">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className={`mt-16 mb-15 transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-700/60  border border-slate-700/50 rounded-2xl p-8 md:p-12 text-center hover:border-cyan-400/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Build Something Amazing
              </h3>
              <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Whether you have a project in mind or just want to chat about
                possibilities, I'm always open to discussing new opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:mdelever77@gmail.com"
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Icon icon="mingcute:mail-line" width={20} height={20} />
                    <span>Email Me</span>
                  </div>
                </a>

                <a
                  href="https://calendly.com/your-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Icon
                      icon="mingcute:calendar-line"
                      width={20}
                      height={20}
                    />
                    <span>Schedule Call</span>
                  </div>
                </a>
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