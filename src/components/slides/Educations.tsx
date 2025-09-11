import React, { useState, useRef, useEffect } from 'react';
import { Icon } from "@iconify/react";

const Education = () => {
  const [activeTab, setActiveTab] = useState('formal');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const formalEducation = [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Tehran",
      period: "2019 - 2023",
      status: "Graduated",
      grade: "GPA: 3.8/4.0",
      location: "Tehran, Iran",
      description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and system design.",
      subjects: [
        "Data Structures & Algorithms",
        "Software Engineering", 
        "Database Systems",
        "Computer Networks",
        "Web Programming",
        "Object-Oriented Programming"
      ]
    }
  ];

  const onlineCourses = [
    {
      title: "Advanced React Development",
      platform: "Meta Frontend Professional",
      duration: "6 months",
      completed: "2023",
      certificate: "Meta Certified",
      rating: 4.9,
      skills: ["React Hooks", "Context API", "Performance Optimization", "Testing"]
    },
    {
      title: "TypeScript Mastery",
      platform: "TypeScript Deep Dive",
      duration: "3 months", 
      completed: "2022",
      certificate: "Certified",
      rating: 4.8,
      skills: ["Advanced Types", "Generics", "Decorators", "Module Systems"]
    },
    {
      title: "Three.js Journey",
      platform: "Three.js Journey",
      duration: "4 months",
      completed: "2023",
      certificate: "Certified", 
      rating: 4.9,
      skills: ["3D Graphics", "WebGL", "Shaders", "Animation"]
    },
    {
      title: "Full Stack Web Development",
      platform: "The Odin Project",
      duration: "8 months",
      completed: "2021",
      certificate: "Self-Paced",
      rating: 4.7,
      skills: ["JavaScript", "Node.js", "Express", "MongoDB"]
    }
  ];

  const certifications = [
    {
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta",
      date: "2023",
      credentialId: "ABC123XYZ",
      skills: ["React", "JavaScript", "HTML/CSS", "Version Control"]
    },
    {
      name: "TypeScript Essential Training", 
      issuer: "LinkedIn Learning",
      date: "2022",
      credentialId: "DEF456UVW",
      skills: ["TypeScript", "Advanced Types", "Node.js"]
    },
    {
      name: "Three.js Journey Certificate",
      issuer: "Three.js Journey", 
      date: "2023",
      credentialId: "GHI789RST",
      skills: ["Three.js", "WebGL", "3D Graphics"]
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

  const tabs = [
    { id: 'formal', label: 'Formal Education', icon: 'mingcute:graduation-cap-line' },
    { id: 'online', label: 'Online Courses', icon: 'mingcute:computer-line' },
    { id: 'certificates', label: 'Certifications', icon: 'mingcute:certificate-line' }
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-black/50 to-transparent"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <span className="text-cyan-400 font-medium tracking-wider text-lg">Education</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Continuous growth through formal education, online courses, and professional certifications
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-2 flex gap-2 flex-wrap justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon icon={tab.icon} width="20" height="20" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Formal Education */}
          {activeTab === 'formal' && (
            <div className="max-w-4xl mx-auto">
              {formalEducation.map((edu, index) => (
                <div key={index} className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left - Basic Info */}
                    <div className="lg:col-span-1">
                      <div className="text-center lg:text-left">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto lg:mx-0">
                          <Icon icon="mingcute:graduation-cap-fill" width="40" height="40" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                        <p className="text-cyan-400 text-lg font-semibold mb-6">{edu.institution}</p>
                        
                        <div className="space-y-3">
                          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 border border-slate-700/30">
                            <span className="text-slate-400">Period: </span>
                            <span className="text-white font-semibold">{edu.period}</span>
                          </div>
                          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 border border-slate-700/30">
                            <span className="text-slate-400">Status: </span>
                            <span className="text-green-400 font-semibold">{edu.status}</span>
                          </div>
                          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 border border-slate-700/30">
                            <span className="text-slate-400">Grade: </span>
                            <span className="text-white font-semibold">{edu.grade}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle - Description */}
                    <div className="lg:col-span-1">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Icon icon="mingcute:book-2-line" width="24" height="24" className="text-purple-400" />
                        Program Overview
                      </h4>
                      <p className="text-slate-300 leading-relaxed mb-6">{edu.description}</p>
                      <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 border border-slate-700/30">
                        <span className="text-slate-400">Location: </span>
                        <span className="text-white font-semibold">{edu.location}</span>
                      </div>
                    </div>

                    {/* Right - Subjects */}
                    <div className="lg:col-span-1">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Icon icon="mingcute:code-line" width="24" height="24" className="text-cyan-400" />
                        Key Subjects
                      </h4>
                      <div className="space-y-2">
                        {edu.subjects.map((subject, idx) => (
                          <div
                            key={subject}
                            className="backdrop-blur-sm bg-white/5 border border-slate-700/30 rounded-xl p-3 hover:border-cyan-400/30 transition-all duration-300"
                          >
                            <span className="text-slate-300">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Online Courses */}
          {activeTab === 'online' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {onlineCourses.map((course, index) => (
                <div
                  key={course.title}
                  className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-500 hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white">
                      <Icon icon="mingcute:computer-line" width="24" height="24" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Icon icon="mingcute:star-fill" width="16" height="16" className="text-yellow-400" />
                        <span className="text-sm font-semibold text-white">{course.rating}</span>
                      </div>
                      <span className="text-xs text-slate-400">{course.completed}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{course.platform}</p>

                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-slate-400">{course.duration}</span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                      {course.certificate}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-slate-300 hover:border-purple-400/50 hover:text-purple-300 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {activeTab === 'certificates' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-400/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                      <Icon icon="mingcute:certificate-line" width="32" height="32" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white leading-tight">{cert.name}</h3>
                        <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">Verified</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Issuer:</span>
                          <span className="font-semibold text-cyan-400">{cert.issuer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Date:</span>
                          <span className="font-semibold text-white">{cert.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">ID:</span>
                          <span className="font-mono text-sm text-slate-300">{cert.credentialId}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-slate-300 hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-6 max-w-md mx-auto mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { number: "15+", label: "Courses", icon: "mingcute:book-2-line", color: "from-cyan-400 to-blue-500" },
            { number: "500+", label: "Study Hours", icon: "mingcute:time-line", color: "from-purple-400 to-pink-500" },
            { number: "10+", label: "Certificates", icon: "mingcute:certificate-line", color: "from-amber-400 to-orange-500" }
          ].map((stat, index) => (
            <div key={index} className="text-center backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-cyan-400/30 transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon icon={stat.icon} width="24" height="24" className="text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;