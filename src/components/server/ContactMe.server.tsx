"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface ContactMeProps {
  scrollToSection?: (id: string) => void;
}

const ContactMe = ({ scrollToSection }: ContactMeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeContact, setActiveContact] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);

  const contactMethods = [
    {
      id: "email",
      label: "Email",
      value: "mahdi.delavar@email.com",
      icon: "ri:mail-line",
      color: "from-blue-400 via-cyan-500 to-teal-400",
      bgGlow: "shadow-blue-500/25",
      description: "Drop me a line anytime",
      action: () => (window.location.href = "mailto:mahdi.delavar@email.com"),
    },
    {
      id: "phone",
      label: "Phone",
      value: "+98 912 345 6789",
      icon: "ri:phone-line",
      color: "from-emerald-400 via-green-500 to-teal-400",
      bgGlow: "shadow-green-500/25",
      description: "Call during work hours",
      action: () => (window.location.href = "tel:+989123456789"),
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@mahdi_delavar",
      icon: "ri:telegram-line",
      color: "from-sky-400 via-blue-500 to-indigo-400",
      bgGlow: "shadow-sky-500/25",
      description: "Quick chat & updates",
      action: () => window.open("https://t.me/mahdi_delavar", "_blank"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "mahdi-delavar-dev",
      icon: "ri:linkedin-line",
      color: "from-violet-400 via-purple-500 to-fuchsia-400",
      bgGlow: "shadow-purple-500/25",
      description: "Professional network",
      action: () =>
        window.open("https://linkedin.com/in/mahdi-delavar", "_blank"),
    },
  ];

  const services = [
    {
      icon: "ri:code-s-slash-line",
      title: "Web Development",
      desc: "Modern, responsive websites",
    },
    {
      icon: "ri:smartphone-line",
      title: "Mobile Apps",
      desc: "Cross-platform solutions",
    },
    {
      icon: "ri:palette-line",
      title: "UI/UX Design",
      desc: "Beautiful user experiences",
    },
    {
      icon: "ri:rocket-line",
      title: "Optimization",
      desc: "Performance & SEO",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % contactMethods.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
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
    }, 2000);
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden  mt-20 "
    >
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
            left: `${20 + mousePosition.x * 5}%`,
            top: `${20 + mousePosition.y * 5}%`,
            transition: "all 2s ease-out",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            right: `${15 + mousePosition.x * -3}%`,
            bottom: `${25 + mousePosition.y * -3}%`,
            transition: "all 2s ease-out",
            animationDelay: "1s",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {/* Hero Section */}
        <div
          className={`text-center pt-20 pb-16 px-8 transition-all duration-1500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Animated Icon */}
            <div className="mb-8 relative">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative w-32 h-32 flex items-center justify-center">
                  
                  {/* Black Hole Core */}
                  <div className="absolute flex items-center justify-center w-28 h-28 rounded-full bg-black bg-opacity-90 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.6)] " >
                 <Icon icon="openmoji:black-hole" width="74" height="74" className="animate- text-gray-700" />
                  </div>
                  {/* Accretion Disk (rotating aura) */}
                  <div className="absolute w-36 h-36 rounded-full border-4 border-transparent border-t-purple-500/40 border-b-pink-500/40 animate-spin-slower" />
                  {/* Center Icon */}
                  <Icon
                    icon="ri:chat-smile-3-line"
                    width="40"
                    height="40"
                    className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text relative z-10"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-200  to-pink-400 bg-clip-text text-transparent">
              LET'S CREATE MAGIC
            </h1>

            <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Ready to transform your ideas into stunning digital experiences?
              I'm here to bring your vision to life with cutting-edge technology
              and creative design.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="backdrop-blur-sm bg-black/40 border border-slate-700/60 rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-slate-400">Projects</div>
              </div>
              <div className="backdrop-blur-sm bg-black/40 border border-slate-700/60 rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-purple-400">24h</div>
                <div className="text-sm text-slate-400">Response</div>
              </div>
              <div className="backdrop-blur-sm bg-black/40 border border-slate-700/60 rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-sm text-slate-400">Satisfaction</div>
              </div>
              <div className="backdrop-blur-sm bg-black/40 border border-slate-700/60 rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-orange-400">3+</div>
                <div className="text-sm text-slate-400">Years Exp</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column - Contact Methods & Info */}
              <div className="lg:col-span-5 space-y-8">
                {/* Contact Cards */}
                <div
                  className={`transition-all duration-1500 delay-300 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-20 opacity-0"
                  }`}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                    <Icon
                      icon="ri:contacts-line"
                      width="36"
                      height="36"
                      className="text-blue-400"
                    />
                    Get In Touch
                  </h2>

                  <div className="grid gap-4">
                    {contactMethods.map((method, index) => (
                      <div
                        key={method.id}
                        className={`group relative backdrop-blur-lg bg-black/40 border border-slate-700/60 rounded-2xl p-6 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:${
                          method.bgGlow
                        } ${
                          activeContact === index
                            ? "ring-2 ring-blue-400/50 scale-105"
                            : ""
                        }`}
                        onClick={method.action}
                      >
                        {/* Gradient Border Animation */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}
                        />

                        <div className="relative z-10 flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                          >
                            <Icon
                              icon={method.icon}
                              width="28"
                              height="28"
                              className="text-white"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-300">
                              {method.label}
                            </h3>
                            <p className="text-blue-300 font-medium">
                              {method.value}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {method.description}
                            </p>
                          </div>

                          <Icon
                            icon="ri:arrow-right-up-line"
                            width="20"
                            height="20"
                            className="text-slate-400 group-hover:text-blue-400 group-hover:scale-125 transition-all duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right Column - Contact Form */}
              <div
                className={`lg:col-span-7 transition-all duration-1500 delay-300 `}
              >
                <div className="backdrop-blur-xl bg-black/40 border border-slate-700/60 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-500 relative overflow-hidden">
                  {/* Form Header */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                      <Icon
                        icon="ri:send-plane-line"
                        width="36"
                        height="36"
                        className="text-blue-400"
                      />
                      Send Message
                    </h2>
                    <p className="text-slate-400">
                      Tell me about your project and let's make it happen!
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className=" text-slate-300 font-medium mb-3 flex items-center gap-2">
                          <Icon icon="ri:user-line" width="16" height="16" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedInput("name")}
                          onBlur={() => setFocusedInput("")}
                          required
                          className={`w-full px-6 py-4 bg-slate-800/30 border-2 rounded-2xl text-white placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                            focusedInput === "name"
                              ? "border-blue-400 shadow-lg shadow-blue-400/20 scale-105"
                              : "border-slate-600/50 hover:border-slate-500"
                          }`}
                          placeholder="Your Name"
                        />
                        {focusedInput === "name" && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>

                      <div className="relative group">
                        <label className=" text-slate-300 font-medium mb-3 flex items-center gap-2">
                          <Icon icon="ri:mail-line" width="16" height="16" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedInput("email")}
                          onBlur={() => setFocusedInput("")}
                          required
                          className={`w-full px-6 py-4 bg-slate-800/30 border-2 rounded-2xl text-white placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                            focusedInput === "email"
                              ? "border-blue-400 shadow-lg shadow-blue-400/20 scale-105"
                              : "border-slate-600/50 hover:border-slate-500"
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {focusedInput === "email" && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="relative group">
                      <label className=" text-slate-300 font-medium mb-3 flex items-center gap-2">
                        <Icon icon="ri:bookmark-line" width="16" height="16" />
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedInput("subject")}
                        onBlur={() => setFocusedInput("")}
                        required
                        className={`w-full px-6 py-4 bg-slate-800/30 border-2 rounded-2xl text-white placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                          focusedInput === "subject"
                            ? "border-blue-400 shadow-lg shadow-blue-400/20 scale-105"
                            : "border-slate-600/50 hover:border-slate-500"
                        }`}
                        placeholder="Project inquiry, collaboration, etc."
                      />
                      {focusedInput === "subject" && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse" />
                      )}
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className=" text-slate-300 font-medium mb-3 flex items-center gap-2">
                          <Icon
                            icon="ri:money-dollar-circle-line"
                            width="16"
                            height="16"
                          />
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-slate-800/30 border-2 border-slate-600/50 rounded-2xl text-white focus:border-blue-400 focus:outline-none transition-all duration-300 hover:border-slate-500"
                        >
                          <option value="">Select Budget</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-plus">$25,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className=" text-slate-300 font-medium mb-3 flex items-center gap-2">
                          <Icon
                            icon="ri:calendar-line"
                            width="16"
                            height="16"
                          />
                          Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-slate-800/30 border-2 border-slate-600/50 rounded-2xl text-white focus:border-blue-400 focus:outline-none transition-all duration-300 hover:border-slate-500"
                        >
                          <option value="">Select Timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <label className=" text-slate-300 font-medium mb-3 flex items-center gap-2">
                        <Icon icon="ri:message-3-line" width="16" height="16" />
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedInput("message")}
                        onBlur={() => setFocusedInput("")}
                        required
                        rows={6}
                        className={`w-full px-6 py-4 bg-slate-800/30 border-2 rounded-2xl text-white placeholder-slate-500 resize-none transition-all duration-300 focus:outline-none ${
                          focusedInput === "message"
                            ? "border-blue-400 shadow-lg shadow-blue-400/20 scale-105"
                            : "border-slate-600/50 hover:border-slate-500"
                        }`}
                        placeholder="Tell me about your project vision, goals, specific requirements, and any other details that would help me understand what you're looking to create..."
                      />
                      {focusedInput === "message" && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse" />
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                      <div className="relative flex items-center justify-center gap-4">
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-lg">Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Icon
                              icon="ri:rocket-line"
                              width="24"
                              height="24"
                              className="group-hover:rotate-12 transition-transform duration-300"
                            />
                            <span className="text-lg">Launch My Project</span>
                            <Icon
                              icon="ri-sparkle-2-line"
                              width="20"
                              height="20"
                              className="group-hover:scale-125 transition-transform duration-300"
                            />
                          </>
                        )}
                      </div>
                    </button>

                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 text-green-400 text-center flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Icon
                          icon="ri:checkbox-circle-line"
                          width="28"
                          height="28"
                        />
                        <div>
                          <div className="font-bold text-lg">
                            Message Sent Successfully!
                          </div>
                          <div className="text-green-300 text-sm">
                            I'll get back to you within 24 hours. Get ready for
                            something amazing!
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
