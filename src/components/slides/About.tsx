import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

interface AboutMeProps {
  scrollToSection?: (id: string) => void;
}

function AboutMe({ scrollToSection }: AboutMeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "React.js", level: 95, icon: "logos:react", color: "from-cyan-400 to-blue-500" },
    { name: "Next.js", level: 80, icon: "logos:nextjs-icon", color: "from-slate-400 to-slate-600" },
    { name: "TypeScript", level: 85, icon: "logos:typescript-icon", color: "from-blue-500 to-blue-700" },
    { name: "Tailwind CSS", level: 95, icon: "logos:tailwindcss-icon", color: "from-cyan-400 to-teal-500" },
    { name: "JavaScript", level: 90, icon: "logos:javascript", color: "from-yellow-400 to-yellow-600" },
    { name: ".NET Core", level: 40, icon: "devicon:csharp", color: "from-purple-500 to-purple-700" }
  ];

  const personalInfo = [
    { 
      icon: "mingcute:location-line", 
      label: "Based in", 
      value: "Tehran, Iran",
      color: "from-red-400 to-pink-500" 
    },
    { 
      icon: "streamline-flex:graduation-cap", 
      label: "Education", 
      value: "Computer Science",
      color: "from-blue-400 to-cyan-500" 
    },
    { 
      icon: "mingcute:calendar-line", 
      label: "Experience", 
      value: "3+ Years",
      color: "from-green-400 to-emerald-500" 
    },
    { 
      icon: "mingcute:heart-line", 
      label: "Passion", 
      value: "Clean Code & UX",
      color: "from-purple-400 to-pink-500" 
    }
  ];

  const interests = [
    { name: "UI/UX Design", icon: "mingcute:palette-line", color: "from-pink-400 to-rose-500" },
    { name: "Open Source", icon: "mingcute:git-branch-line", color: "from-green-400 to-emerald-500" },
    { name: "Mobile Development", icon: "mingcute:phone-line", color: "from-blue-400 to-cyan-500" },
    { name: "AI & Machine Learning", icon: "mingcute:ai-line", color: "from-purple-400 to-violet-500" },
    { name: "Performance Optimization", icon: "mingcute:lightning-line", color: "from-yellow-400 to-orange-500" },
    { name: "Team Leadership", icon: "mingcute:group-line", color: "from-indigo-400 to-blue-500" }
  ];

  const journeyPoints = [
    {
      title: "The Beginning",
      content: "Started as a curious problem-solver with a passion for creating beautiful, functional web experiences.",
      icon: "mingcute:rocket-line",
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Growth & Learning",
      content: "Evolved from writing basic HTML to architecting complex React applications and scalable solutions.",
      icon: "mingcute:trending-up-line", 
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Core Values",
      content: "Believe in continuous learning, clean code, and the power of collaboration in every project.",
      icon: "mingcute:heart-line",
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Beyond Coding",
      content: "When not coding, I explore new technologies, contribute to open source, and share knowledge with the community.",
      icon: "mingcute:share-2-line",
      color: "from-orange-400 to-red-500"
    }
  ];

  const philosophyPoints = [
    {
      title: "User-Centric",
      description: "Every line of code should enhance user experience and solve real problems",
      icon: "mingcute:user-heart-line",
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Performance First",
      description: "Optimized, scalable solutions that deliver exceptional performance outcomes",
      icon: "mingcute:lightning-line",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Continuous Learning",
      description: "Staying updated with latest technologies and industry best practices",
      icon: "mingcute:book-line",
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Clean Code",
      description: "Maintainable, readable, and well-documented solutions for long-term success",
      icon: "mingcute:code-line",
      color: "from-orange-400 to-red-500"
    }
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
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden backdrop-blur-xs">
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            <span className="text-orange-400 font-medium tracking-wider text-lg">About Me</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#158288] via-slate-200 to-orange-300 bg-clip-text text-transparent text-shadow-xs ">
              Passionate Developer
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed text-shadow-xs text-shadow-slate-900">
            Crafting digital experiences that blend creativity with functionality. 
            I turn ideas into elegant, performant web applications.
          </p>
        </div>

        {/* Journey Section */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-xl flex items-center justify-center">
                <Icon icon="mingcute:user-star-fill" width="28" height="28" className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">My Journey</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {journeyPoints.map((point, index) => (
                <div key={index} className="flex gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group">
                  <div className={`w-10 h-10 bg-gradient-to-br ${point.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon icon={point.icon} width="24" height="24" className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">{point.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{point.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Info & Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Personal Information */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-purple-400/30 transition-all duration-500 h-full">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon icon="mingcute:information-line" width="32" height="32" className="text-purple-400" />
                Personal Info
              </h3>
              <div className="space-y-4">
                {personalInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon icon={info.icon} width="24" height="24" className="text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">{info.label}</p>
                      <p className="text-white font-semibold text-lg">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500 h-full">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon icon="mingcute:code-line" width="32" height="32" className="text-cyan-400" />
                Technical Skills
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${activeSkill === index ? 'scale-105' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon icon={skill.icon} width="24" height="24" />
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-slate-400 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ${
                          activeSkill === index ? 'animate-pulse' : ''
                        }`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-400/30 transition-all duration-500">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
              <Icon icon="mingcute:sparkles-line" width="32" height="32" className="text-amber-400" />
              Interests & Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${interest.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon icon={interest.icon} width="20" height="20" className="text-white" />
                  </div>
                  <span className="text-slate-300 font-medium">{interest.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats & Philosophy Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Stats Section */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-500 h-full">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon icon="mingcute:trophy-line" width="28" height="28" className="text-green-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "mingcute:trophy-line", number: "50+", label: "Projects", color: "from-yellow-400 to-orange-500" },
                  { icon: "mingcute:group-line", number: "30+", label: "Happy Clients", color: "from-green-400 to-emerald-500" },
                  { icon: "mingcute:time-line", number: "3+", label: "Years Experience", color: "from-blue-400 to-cyan-500" },
                  { icon: "mingcute:star-line", number: "5.0", label: "Rating", color: "from-purple-400 to-pink-500" }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon icon={stat.icon} width="20" height="20" className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-slate-400 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Development Philosophy */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-500 h-full">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon icon="mingcute:lightbulb-line" width="32" height="32" className="text-green-400" />
                Development Philosophy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {philosophyPoints.map((point, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${point.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon icon={point.icon} width="20" height="20" className="text-white" />
                      </div>
                      <h4 className="text-white font-semibold">{point.title}</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-md bg-gradient-to-br from-slate-800/30 to-slate-700/30 border border-slate-700/50 rounded-2xl p-8 text-center hover:border-cyan-400/30 transition-all duration-500">
            <h3 className="text-3xl font-bold text-white mb-4">Let's Work Together</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing together and push the boundaries of what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection?.("contactme")}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center gap-3">
                  <Icon icon="mingcute:send-line" width="20" height="20" />
                  <span>Get In Touch</span>
                </div>
              </button>
              <button
                onClick={() => scrollToSection?.("experiences")}
                className="group relative px-8 py-4 bg-transparent border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative flex items-center gap-3">
                  <Icon icon="mingcute:time-line" width="20" height="20" />
                  <span>View Experience</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;