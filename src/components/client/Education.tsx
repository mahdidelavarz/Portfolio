"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";

import {
  LogosJavascriptIcon,
  LogosReactIcon,
  LogosThreeJsIcon,
  LogosTypescriptBold,
  SolarBookBold,
  SolarCalendarBold,
  SolarCheckCircleBold,
  SolarClockCircleBoldIcon,
  SolarDiplomaBold,
  SolarDiplomaVerifiedBold,
  SolarDocumentText,
  SolarMapPoindBold,
  SolarMonitorBold,
  SolarStarBold,
  SolarStarShineBold,
} from "@/icons/icons";

// Formal Education Data
const FORMAL_EDUCATION = [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "Azad University of Tabriz",
    period: "2021 - Present",
    status: "Currently enrolled",
    grade: "GPA: 17/20",
    location: "Tabriz, Iran",
    description:
      "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and system design.",
    highlights: [
      "Currently enrolled in Bachelor's degree program",
      "Completed key coursework in software engineering",
      "Active participant in university projects and teamwork",
      "Developing skills in software engineering and system design",
    ],
    subjects: [
      { name: "Data Structures & Algorithms", grade: "A" },
      { name: "Software Engineering", grade: "A-" },
      { name: "Database Systems", grade: "A" },
      { name: "Computer Networks", grade: "B+" },
      { name: "Web Programming", grade: "A" },
      { name: "Object-Oriented Programming", grade: "A" },
    ],
  },
] as const;

// Online Courses Data
const ONLINE_COURSES = [
  {
    title: "Advanced React Development",
    platform: "Meta Frontend Professional",
    duration: "6 months",
    completed: "2022",
    certificate: "Meta Certified",
    rating: 4.9,
    description:
      "Advanced patterns, performance optimization, and modern React ecosystem",
    skills: [
      "React Hooks",
      "Context API",
      "Performance Optimization",
      "Testing",
    ],
    icon: LogosReactIcon,
    color: "from-blue-400 to-cyan-500",
  },
  {
    title: "TypeScript Mastery",
    platform: "TypeScript Deep Dive",
    duration: "3 months",
    completed: "2022",
    certificate: "Certified",
    rating: 4.8,
    description:
      "Deep dive into TypeScript's advanced type system and best practices",
    skills: ["Advanced Types", "Generics", "Decorators", "Module Systems"],
    icon: LogosTypescriptBold,
    color: "from-blue-600 to-blue-400",
  },
  {
    title: "Three.js Journey",
    platform: "Three.js Journey",
    duration: "4 months",
    completed: "2023",
    certificate: "Self-Paced",
    rating: 4.9,
    description:
      "Complete 3D web development course covering fundamentals to advanced techniques",
    skills: ["3D Graphics", "WebGL", "Shaders", "Animation"],
    icon: LogosThreeJsIcon,
    color: "from-slate-600 to-slate-400",
  },
  {
    title: "Full Stack Web Development",
    platform: "The Odin Project",
    duration: "8 months",
    completed: "2021",
    certificate: "Self-Paced",
    rating: 4.7,
    description: "Comprehensive full-stack curriculum with hands-on projects",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB"],
    icon: LogosJavascriptIcon,
    color: "from-yellow-400 to-orange-500",
  },
] as const;

// Learning Stats
const LEARNING_STATS = [
  {
    icon: SolarBookBold,
    number: "15+",
    label: "Courses",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: SolarClockCircleBoldIcon,
    number: "500+",
    label: "Study Hours",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: SolarDiplomaVerifiedBold,
    number: "10+",
    label: "Certificates",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: SolarStarBold,
    number: "4.8",
    label: "Avg Rating",
    color: "from-green-400 to-emerald-500",
  },
] as const;

// Tabs
const TABS = [
  { id: "formal", label: "University", icon: SolarDiplomaBold },
  { id: "online", label: "Online Courses", icon: SolarMonitorBold },
] as const;

// Memoized TabButton
const TabButton = memo<{
  tab: (typeof TABS)[number];
  isActive: boolean;
  onClick: (id: string) => void;
}>(({ tab, isActive, onClick }) => {
  const handleClick = useCallback(() => onClick(tab.id), [tab.id, onClick]);

  return (
    <button
      className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base flex-1 ${
        isActive
          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
          : "text-slate-400 hover:text-white hover:bg-slate-700/30"
      }`}
      onClick={handleClick}
      aria-label={`View ${tab.label}`}
    >
      <tab.icon width={18} height={18} />
      <span className="hidden sm:inline">{tab.label}</span>
      <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
    </button>
  );
});

TabButton.displayName = "TabButton";

// Memoized CourseCard
const CourseCard = memo<{
  course: (typeof ONLINE_COURSES)[number];
  index: number;
}>(({ course, index }) => (
  <div
    className="group relative overflow-hidden bg-slate-800/40  border border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-1"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
    />

    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div
          className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${course.color} rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
        >
          <course.icon width={28} height={28} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-slate-400 text-xs md:text-sm">{course.platform}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <SolarStarBold width={14} height={14} className="text-yellow-400" />
          <span className="text-sm font-semibold text-white">
            {course.rating}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-xs md:text-sm mb-4 leading-relaxed line-clamp-2">
        {course.description}
      </p>

      {/* Info Row */}
      <div className="flex items-center gap-3 mb-4 text-xs md:text-sm">
        <div className="flex items-center gap-1.5 text-slate-400">
          <SolarClockCircleBoldIcon width={16} height={16} />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <SolarCalendarBold width={16} height={16} />
          <span>{course.completed}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs">{course.certificate}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {course.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2.5 py-1 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
));

CourseCard.displayName = "CourseCard";

const Education = memo(() => {
  const [activeTab, setActiveTab] = useState("formal");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isVisible]);

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // Memoized tab content
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "formal":
        return (
          <div className="space-y-6">
            {FORMAL_EDUCATION.map((edu, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-slate-800/40 backdrop-blur-3xl  border border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-500"
              >
                <div className="relative z-10">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <SolarDiplomaBold
                        width={32}
                        height={32}
                        className="text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-cyan-400 text-base md:text-lg font-semibold mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-slate-400 text-sm flex items-center gap-1.5">
                        <SolarMapPoindBold width={16} height={16} />
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <p className="text-slate-400 text-xs mb-1">Period</p>
                      <p className="text-white font-semibold text-sm">
                        {edu.period}
                      </p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <p className="text-slate-400 text-xs mb-1">Status</p>
                      <p className="text-green-400 font-semibold text-sm">
                        {edu.status}
                      </p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 col-span-2">
                      <p className="text-slate-400 text-xs mb-1">Performance</p>
                      <p className="text-white font-semibold text-sm">
                        {edu.grade}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-base md:text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <SolarDocumentText
                        width={20}
                        height={20}
                        className="text-purple-400"
                      />
                      Program Overview
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h5 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <SolarStarShineBold
                        width={20}
                        height={20}
                        className="text-amber-400"
                      />
                      Key Achievements
                    </h5>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {edu.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-300 text-xs md:text-sm bg-slate-700/20 rounded-lg p-2.5"
                        >
                          <SolarCheckCircleBold
                            width={16}
                            height={16}
                            className="text-green-400 flex-shrink-0 mt-0.5"
                          />
                          <span className="flex-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subjects Grid */}
                  <div className="border-t border-slate-700/50 pt-6">
                    <h4 className="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <SolarBookBold
                        width={20}
                        height={20}
                        className="text-cyan-400"
                      />
                      Key Subjects & Grades
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {edu.subjects.map((subject) => (
                        <div
                          key={subject.name}
                          className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3 hover:border-cyan-400/30 transition-all duration-300"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-slate-300 font-medium text-xs md:text-sm line-clamp-1 flex-1">
                              {subject.name}
                            </span>
                            <span className="text-cyan-400 font-bold text-sm flex-shrink-0">
                              {subject.grade}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "online":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {ONLINE_COURSES.map((course, index) => (
              <CourseCard key={course.title} course={course} index={index} />
            ))}
          </div>
        );

      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950"
    >
      {/* Background */}
      <div className="absolute inset-0 " />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full  mb-6">
            {/* <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> */}
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              Education & Learning
            </span>
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            {/* <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> */}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-sky-400 to-white bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4">
            Continuous growth through formal education and professional courses
          </p>
        </div>

        {/* Learning Stats */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {LEARNING_STATS.map((stat) => (
              <div
                key={stat.label}
                className="group text-center p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-400/30 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon width={22} height={22} className="text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-xs md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-1.5 flex gap-2 w-full max-w-md">
            {TABS.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={handleTabClick}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {tabContent}
        </div>
      </div>
    </div>
  );
});

Education.displayName = "Education";

export default Education;
