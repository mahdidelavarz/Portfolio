"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import { Icon } from "@iconify/react";

// Move all static data outside component to prevent recreation
const FORMAL_EDUCATION = [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "Azad University of Tabriz",
    period: "2021 - 2023",
    status: "Currently enrolled",
    grade: "GPA: 17/20",
    location: "Tabriz, Iran",
    description:
      "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and system design.",
    highlights: [
      "Currently enrolled in Bachelor's degree program",
      "Completed key coursework in software",
      "Active participant in university projects and teamwork",
      "Developing skills in software engineering",
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

const ONLINE_COURSES = [
  {
    title: "Advanced React Development",
    platform: "Meta Frontend Professional",
    duration: "6 months",
    completed: "2023",
    certificate: "Meta Certified",
    rating: 4.9,
    instructor: "Meta Engineering Team",
    description:
      "Advanced patterns, performance optimization, and modern React ecosystem",
    skills: [
      "React Hooks",
      "Context API",
      "Performance Optimization",
      "Testing",
    ],
  },
  {
    title: "TypeScript Mastery",
    platform: "TypeScript Deep Dive",
    duration: "3 months",
    completed: "2022",
    certificate: "Certified",
    rating: 4.8,
    instructor: "Basarat Ali Syed",
    description:
      "Deep dive into TypeScript's advanced type system and best practices",
    skills: ["Advanced Types", "Generics", "Decorators", "Module Systems"],
  },
  {
    title: "Three.js Journey",
    platform: "Three.js Journey",
    duration: "4 months",
    completed: "2023",
    certificate: "Certified",
    rating: 4.9,
    instructor: "Bruno Simon",
    description:
      "Complete 3D web development course covering fundamentals to advanced techniques",
    skills: ["3D Graphics", "WebGL", "Shaders", "Animation"],
  },
  {
    title: "Full Stack Web Development",
    platform: "The Odin Project",
    duration: "8 months",
    completed: "2021",
    certificate: "Self-Paced",
    rating: 4.7,
    instructor: "Community Driven",
    description: "Comprehensive full-stack curriculum with hands-on projects",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB"],
  },
] as const;

const CERTIFICATIONS = [
  {
    name: "Meta Frontend Developer Professional Certificate",
    issuer: "Meta",
    date: "2023",
    credentialId: "ABC123XYZ",
    description:
      "Comprehensive frontend development certification covering React, JavaScript, and modern web technologies",
    skills: ["React", "JavaScript", "HTML/CSS", "Version Control"],
  },
  {
    name: "TypeScript Essential Training",
    issuer: "LinkedIn Learning",
    date: "2022",
    credentialId: "DEF456UVW",
    description:
      "Advanced TypeScript development patterns and enterprise application architecture",
    skills: ["TypeScript", "Advanced Types", "Node.js"],
  },
  {
    name: "Three.js Journey Certificate",
    issuer: "Three.js Journey",
    date: "2023",
    credentialId: "GHI789RST",
    description:
      "Complete 3D web development certification with advanced WebGL and shader programming",
    skills: ["Three.js", "WebGL", "3D Graphics"],
  },
] as const;

const LEARNING_STATS = [
  {
    icon: "mingcute:book-2-line",
    number: "15+",
    label: "Courses Completed",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: "mingcute:time-line",
    number: "500+",
    label: "Study Hours",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: "mingcute:certificate-line",
    number: "10+",
    label: "Certificates Earned",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: "mingcute:star-line",
    number: "4.8",
    label: "Average Rating",
    color: "from-green-400 to-emerald-500",
  },
] as const;

const TABS = [
  {
    id: "formal",
    label: "Formal Education",
    icon: "streamline-flex:graduation-cap",
  },
  {
    id: "online",
    label: "Online Courses",
    icon: "fluent:phone-desktop-16-regular",
  },
  {
    id: "certificates",
    label: "Certifications",
    icon: "qlementine-icons:certified-16",
  },
] as const;

// Memoized components to prevent unnecessary re-renders
const TabButton = memo<{
  tab: {
    id: string;
    label: string;
    icon: string;
  };
  isActive: boolean;
  onClick: (id: string) => void;
}>(({ tab, isActive, onClick }) => {
  const handleClick = useCallback(() => onClick(tab.id), [tab.id, onClick]);

  return (
    <button
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
        isActive
          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
      onClick={handleClick}
      aria-label={`View ${tab.label}`}
    >
      <Icon icon={tab.icon} width={22} height={22} />
      <span className="hidden sm:inline">{tab.label}</span>
    </button>
  );
});

TabButton.displayName = "TabButton";

const CourseCard = memo<{
  course: {
    title: string;
    platform: string;
    duration: string;
    completed: string;
    certificate: string;
    rating: number;
    instructor: string;
    description: string;
    skills: Readonly<string[]>;
  };
}>(({ course }) => (
  <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-500 hover:-translate-y-1 group">
    {/* Course Header */}
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white">
          <Icon icon="mingcute:computer-line" width={28} height={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
            {course.title}
          </h3>
          <p className="text-slate-400 text-sm">{course.platform}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 mb-1">
          <Icon
            icon="mingcute:star-fill"
            width={16}
            height={16}
            className="text-yellow-400"
          />
          <span className="text-sm font-semibold text-white">
            {course.rating}
          </span>
        </div>
        <span className="text-xs text-slate-400">{course.completed}</span>
      </div>
    </div>

    {/* Course Info */}
    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
      {course.description}
    </p>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-slate-700/30 rounded-lg p-3">
        <p className="text-slate-400 text-xs mb-1">Duration</p>
        <p className="text-white font-semibold text-sm">{course.duration}</p>
      </div>
      <div className="bg-slate-700/30 rounded-lg p-3">
        <p className="text-slate-400 text-xs mb-1">Instructor</p>
        <p className="text-white font-semibold text-sm">{course.instructor}</p>
      </div>
    </div>

    <div className="flex justify-between items-center mb-4">
      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs border border-green-500/30">
        {course.certificate}
      </span>
    </div>

    {/* Skills */}
    <div className="flex flex-wrap gap-2">
      {course.skills.map((skill) => (
        <span
          key={skill}
          className="text-xs px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-slate-300 hover:border-purple-400/50 hover:text-purple-300 transition-all duration-300"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
));

CourseCard.displayName = "CourseCard";

const CertificationCard = memo<{
  cert: {
    name: string;
    issuer: string;
    date: string;
    credentialId: string;
    description: string;
    skills: Readonly<string[]>;
  };
}>(({ cert }) => (
  <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-400/30 transition-all duration-500 hover:-translate-y-1">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Certificate Icon & Basic Info */}
      <div className="lg:col-span-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white">
            <Icon icon="mingcute:certificate-line" width={32} height={32} />
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Verified</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-700/30 rounded-lg p-3">
            <span className="text-slate-400 text-sm">Issuer</span>
            <p className="font-semibold text-cyan-400">{cert.issuer}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3">
            <span className="text-slate-400 text-sm">Date</span>
            <p className="font-semibold text-white">{cert.date}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3">
            <span className="text-slate-400 text-sm">Credential ID</span>
            <p className="font-mono text-sm text-slate-300">
              {cert.credentialId}
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
          {cert.name}
        </h3>
        <p className="text-slate-300 leading-relaxed mb-6">
          {cert.description}
        </p>

        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Icon
            icon="mingcute:lightbulb-line"
            width={20}
            height={20}
            className="text-amber-400"
          />
          Skills Validated
        </h4>
        <div className="flex flex-wrap gap-3">
          {cert.skills.map((skill: string) => (
            <span
              key={skill}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-300 hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
));

CertificationCard.displayName = "CertificationCard";

const Education = memo(() => {
  const [activeTab, setActiveTab] = useState("formal");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Preload animations
      }
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
  }, [isVisible]);

  // Memoized tab click handler
  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // Memoized animation classes
  const animationClasses = useMemo(
    () => ({
      header: `text-center mb-16 transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
      stats: `mb-16 transition-all duration-1000 delay-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
      tabs: `flex justify-center mb-12 transition-all duration-1000 delay-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
      content: `transition-all duration-1000 delay-400 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
    }),
    [isVisible]
  );

  // Memoized tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "formal":
        return (
          <div className="space-y-8">
            {FORMAL_EDUCATION.map((edu, index) => (
              <div key={index}>
                {/* Main Education Card */}
                <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500 mb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Left - Institution Info */}
                    <div>
                      <div className="flex items-start gap-6 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                          <Icon
                            icon="streamline-flex:graduation-cap"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {edu.degree}
                          </h3>
                          <p className="text-cyan-400 text-lg font-semibold">
                            {edu.institution}
                          </p>
                          <p className="text-slate-400 text-sm mt-1">
                            {edu.location}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700/30 rounded-xl p-4">
                          <p className="text-slate-400 text-sm mb-1">Period</p>
                          <p className="text-white font-semibold">
                            {edu.period}
                          </p>
                        </div>
                        <div className="bg-slate-700/30 rounded-xl p-4">
                          <p className="text-slate-400 text-sm mb-1">Status</p>
                          <p className="text-green-400 font-semibold">
                            {edu.status}
                          </p>
                        </div>
                        <div className="bg-slate-700/30 rounded-xl p-4 col-span-2">
                          <p className="text-slate-400 text-sm mb-1">
                            Academic Performance
                          </p>
                          <p className="text-white font-semibold">
                            {edu.grade}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right - Description & Highlights */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Icon
                          icon="mingcute:book-2-line"
                          width={24}
                          height={24}
                          className="text-purple-400"
                        />
                        Program Overview
                      </h4>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        {edu.description}
                      </p>

                      <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Icon
                          icon="mingcute:trophy-line"
                          width={20}
                          height={20}
                          className="text-amber-400"
                        />
                        Key Achievements
                      </h5>
                      <div className="space-y-2">
                        {edu.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-slate-300"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subjects Grid */}
                  <div className="border-t border-slate-700/50 pt-8">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Icon
                        icon="mingcute:code-line"
                        width={24}
                        height={24}
                        className="text-cyan-400"
                      />
                      Key Subjects & Performance
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {edu.subjects.map((subject) => (
                        <div
                          key={subject.name}
                          className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 hover:border-cyan-400/30 transition-all duration-300 group"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 font-medium">
                              {subject.name}
                            </span>
                            <span className="text-cyan-400 font-bold">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ONLINE_COURSES.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        );

      case "certificates":
        return (
          <div className="space-y-6">
            {CERTIFICATIONS.map((cert) => (
              <CertificationCard key={cert.name} cert={cert} />
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
      className="relative min-h-screen py-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={animationClasses.header}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <span className="text-cyan-400 font-medium tracking-wider text-lg uppercase">
              Education
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-300 via-slate-200 to-cyan-300 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Continuous growth through formal education, online courses, and
            professional certifications
          </p>
        </div>

        {/* Learning Stats */}
        <div className={animationClasses.stats}>
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <Icon
                icon="mingcute:chart-line-line"
                width={28}
                height={28}
                className="text-cyan-400"
              />
              Learning Statistics
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {LEARNING_STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      icon={stat.icon}
                      width={28}
                      height={28}
                      className="text-white"
                    />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={animationClasses.tabs}>
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-2 flex gap-2 flex-wrap justify-center">
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
        <div className={animationClasses.content}>{tabContent}</div>
      </div>
    </div>
  );
});

Education.displayName = "Education";

export default Education;
