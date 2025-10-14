"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface ContactMeProps {
  scrollToSection?: (id: string) => void;
}

const ContactMe = ({ scrollToSection }: ContactMeProps) => {
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
  const [submitStatus, setSubmitStatus] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);

  const contactMethods = [
    {
      id: "email",
      label: "Email",
      value: "mahdi.delavar@email.com",
      icon: "ri:mail-line",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      action: () => (window.location.href = "mailto:mahdi.delavar@email.com"),
    },
    {
      id: "phone",
      label: "Phone",
      value: "+98 912 345 6789",
      icon: "ri:phone-line",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      action: () => (window.location.href = "tel:+989123456789"),
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@mahdi_delavar",
      icon: "ri:telegram-line",
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
      action: () => window.open("https://t.me/mahdi_delavar", "_blank"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "mahdi-delavar-dev",
      icon: "ri:linkedin-line",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      action: () =>
        window.open("https://linkedin.com/in/mahdi-delavar", "_blank"),
    },
  ];

  const stats = [
    { value: "50+", label: "Projects", color: "text-blue-500" },
    { value: "24h", label: "Response", color: "text-purple-500" },
    { value: "100%", label: "Satisfaction", color: "text-green-500" },
    { value: "3+", label: "Years Exp", color: "text-orange-500" },
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

    // Simulate API call
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
      className="relative min-h-screen  mt-20"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10" />

      <div className="relative z-10 w-full min-h-screen">
        {/* Hero Section */}
        <div
          className={`text-center pt-20 pb-12 px-4 sm:px-8 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Icon */}
            <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
              <Icon
                icon="ri:chat-smile-3-line"
                width="48"
                height="48"
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
              Let's Work Together
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Ready to transform your ideas into reality? I'm here to help bring your vision to life.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4"
                >
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Contact Methods */}
              <div className="lg:col-span-5 space-y-6">
                <div
                  className={`transition-all duration-1000 delay-200 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  }`}
                >
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-3">
                    {contactMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={method.action}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200 text-left"
                      >
                        <div className={`${method.bgColor} p-3 rounded-lg`}>
                          <Icon
                            icon={method.icon}
                            width="24"
                            height="24"
                            className={method.color}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 dark:text-white">
                            {method.label}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {method.value}
                          </p>
                        </div>
                        <Icon
                          icon="ri:arrow-right-up-line"
                          className="text-slate-400"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Availability Notice */}
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Available for freelance projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div
                className={`lg:col-span-7 transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                    Send Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Project inquiry"
                      />
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Budget</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-plus">$25,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Icon icon="ri:send-plane-line" width="20" height="20" />
                          Send Message
                        </>
                      )}
                    </button>

                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
                        <Icon
                          icon="ri:checkbox-circle-line"
                          width="24"
                          height="24"
                          className="text-green-600 dark:text-green-400"
                        />
                        <div>
                          <p className="font-medium text-green-800 dark:text-green-300">
                            Message sent successfully!
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            I'll get back to you within 24 hours.
                          </p>
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