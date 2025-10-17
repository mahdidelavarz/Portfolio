"use client";
import { Icon } from "@iconify/react";
import { memo, useEffect, useState, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

interface HomeProps {
  scrollToSection: (id: string) => void;
}

const socialLinks = [
  {
    icon: "mingcute:github-line",
    color: "from-slate-600 to-slate-800",
    borderColor: "border-slate-500/50",
    shadowColor: "shadow-slate-600/20",
    link: "https://github.com/mahdidelavarz",
    label: "GitHub",
  },
  {
    icon: "mingcute:telegram-line",
    color: "from-sky-500 to-blue-600",
    borderColor: "border-sky-400/50",
    shadowColor: "shadow-sky-500/20",
    link: "https://t.me/osis13",
    label: "Telegram",
  },
  {
    icon: "mingcute:linkedin-line",
    color: "from-blue-500 to-indigo-600",
    borderColor: "border-blue-400/50",
    shadowColor: "shadow-blue-500/20",
    link: "https://www.linkedin.com/in/mahdi-delavar-5338ba280",
    label: "LinkedIn",
  },
  {
    icon: "mingcute:whatsapp-line",
    color: "from-emerald-500 to-green-600",
    borderColor: "border-emerald-400/50",
    shadowColor: "shadow-emerald-500/20",
    link: "https://wa.me/09025574357",
    label: "WhatsApp",
  },
];

const stats = [
  {
    number: "3+",
    label: "Years Experience",
    icon: "mingcute:time-line",
    color: "from-cyan-500 to-blue-600",
  },
  {
    number: "50+",
    label: "Projects Delivered",
    icon: "mingcute:rocket-line",
    color: "from-purple-500 to-pink-600",
  },
  {
    number: "100%",
    label: "Client Satisfaction",
    icon: "mingcute:star-line",
    color: "from-emerald-500 to-teal-600",
  },
];

const Home = memo(function Home({ scrollToSection }: HomeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-2 pt-16 md:pt-0 md:py-0"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Social Links Sidebar - Desktop Only */}
      <div
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-30 lg:flex flex-col gap-3 transition-all duration-1000 hidden ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        {/* Top line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent mx-auto" />

        {socialLinks.map((social, index) => (
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button
              className={`group relative w-12 h-12 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:${social.borderColor} transition-all duration-300 hover:scale-110 hover:-translate-y-1`}
              aria-label={social.label}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl ${social.shadowColor}`}
              />
              <Icon
                icon={social.icon}
                className={`relative w-5 h-5 mx-auto text-slate-400 group-hover:text-white transition-colors duration-300`}
              />

              {/* Tooltip */}
              {isHovered === index && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg whitespace-nowrap">
                  <span className="text-xs text-white font-medium">
                    {social.label}
                  </span>
                </div>
              )}
            </button>
          </a>
        ))}

        {/* Bottom line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent mx-auto" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Greeting Badge */}
          <div
            className={`inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-8 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              Welcome to my portfolio
            </span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>

          {/* Name */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-8 transition-all duration-1000 delay-100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Mahdi Delavar
            </span>
          </h1>

          {/* Dynamic Role */}
          <div
            className={`text-2xl sm:text-3xl lg:text-4xl font-light mb-8 min-h-[60px] flex items-center justify-center transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-slate-300 mr-3">I'm a</span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              <Typewriter
                words={[
                  "Frontend Developer",
                  "React Specialist",
                  "UI/UX Engineer",
                  "Next.js Expert",
                  "Web Architect",
                  "Problem Solver",
                ]}
                loop={0}
                cursor={true}
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </div>

          {/* Tagline */}
          <p
            className={`text-lg sm:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Crafting exceptional digital experiences with modern technologies.
            <br />
            <span className="text-slate-500">
              Turning complex problems into elegant, performant solutions.
            </span>
          </p>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <a
              href="/resume.pdf"
              download="Mahdi_Delavar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
              aria-label="Download Resume"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="relative flex items-center justify-center gap-3">
                <Icon icon="mingcute:download-2-line" width="22" height="22" />
                <span>Download Resume</span>
              </div>
            </a>

            <button
              onClick={() => scrollToSection("contactme")}
              className="group relative px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
              aria-label="Contact Me"
            >
              <div className="relative flex items-center justify-center gap-3">
                <Icon
                  icon="mingcute:mail-line"
                  width="22"
                  height="22"
                  className="text-cyan-400 group-hover:text-cyan-300 transition-colors"
                />
                <span>Let's Connect</span>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-6 py-4 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                  />
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon icon={stat.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator - Mobile */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 sm:hidden transition-all duration-1000 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-slate-500">Scroll to explore</span>
              <Icon
                icon="mingcute:arrow-down-line"
                className="w-5 h-5 text-cyan-400 animate-bounce"
              />
            </div>
          </div>

          {/* Mobile Social Links */}
          <div
            className={`flex justify-center gap-3 mt-8 sm:hidden transition-all duration-1000 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {socialLinks.map((social, index) => (
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <button
                  className={`group relative w-10 h-10 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:${social.borderColor} transition-all duration-300`}
                  aria-label={social.label}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}
                  />
                  <Icon
                    icon={social.icon}
                    className="relative w-4 h-4 mx-auto text-slate-400 group-hover:text-white transition-colors"
                  />
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for float animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(10px) translateX(-10px);
          }
          75% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
});

export default Home;
