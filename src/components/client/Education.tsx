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

// Move all static data outside component
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

// const CERTIFICATIONS = [
//   {
//     name: "Meta Frontend Developer Professional Certificate",
//     issuer: "Meta",
//     date: "2023",
//     credentialId: "ABC123XYZ",
//     description:
//       "Comprehensive frontend development certification covering React, JavaScript, and modern web technologies",
//     skills: ["React", "JavaScript", "HTML/CSS", "Version Control"],
//   },
//   {
//     name: "TypeScript Essential Training",
//     issuer: "LinkedIn Learning",
//     date: "2022",
//     credentialId: "DEF456UVW",
//     description:
//       "Advanced TypeScript development patterns and enterprise application architecture",
//     skills: ["TypeScript", "Advanced Types", "Node.js"],
//   },
//   {
//     name: "Three.js Journey Certificate",
//     issuer: "Three.js Journey",
//     date: "2023",
//     credentialId: "GHI789RST",
//     description:
//       "Complete 3D web development certification with advanced WebGL and shader programming",
//     skills: ["Three.js", "WebGL", "3D Graphics"],
//   },
// ] as const;

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
    label: "Certificates",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: "mingcute:star-line",
    number: "4.8",
    label: "Avg Rating",
    color: "from-green-400 to-emerald-500",
  },
] as const;

const TABS = [
  {
    id: "formal",
    label: "Education",
    icon: "streamline-flex:graduation-cap",
  },
  {
    id: "online",
    label: "Courses",
    icon: "fluent:phone-desktop-16-regular",
  },
  // {
  //   id: "certificates",
  //   label: "Certificates",
  //   icon: "qlementine-icons:certified-16",
  // },
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
      className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base w-full ${
        isActive
          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-lg"
          : "text-slate-400 hover:text-white hover:bg-slate-700/30"
      }`}
      onClick={handleClick}
      aria-label={`View ${tab.label}`}
    >
      <Icon icon={tab.icon} width={20} height={20} />
      <span>{tab.label}</span>
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
    className="group relative overflow-hidden bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 sm:p-6 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-1"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon
              icon="mingcute:computer-line"
              width={24}
              height={24}
              className="text-white"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm truncate">
              {course.platform}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 mb-1">
            <Icon
              icon="mingcute:star-fill"
              width={14}
              height={14}
              className="text-yellow-400"
            />
            <span className="text-sm font-semibold text-white">
              {course.rating}
            </span>
          </div>
          <span className="text-xs text-slate-400">{course.completed}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-2">
        {course.description}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-700/30 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Duration</p>
          <p className="text-white font-semibold text-sm">{course.duration}</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Status</p>
          <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            {course.certificate}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {course.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:border-purple-400/50 hover:text-purple-300 transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
));

CourseCard.displayName = "CourseCard";

// Memoized CertificationCard
// const CertificationCard = memo<{
//   cert: (typeof CERTIFICATIONS)[number];
//   index: number;
// }>(({ cert, index }) => (
//   <div
//     className="group relative overflow-hidden bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 sm:p-8 hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-1"
//     style={{ animationDelay: `${index * 0.1}s` }}
//   >
//     {/* Gradient overlay */}
//     <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//     <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
//       {/* Left - Certificate Icon & Basic Info */}
//       <div className="lg:col-span-1">
//         <div className="flex lg:flex-col items-start gap-4 mb-6">
//           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//             <Icon
//               icon="mingcute:certificate-line"
//               width={32}
//               height={32}
//               className="text-white"
//             />
//           </div>
//           <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 sm:px-4 py-2">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//             <span className="text-green-400 text-xs sm:text-sm font-medium">
//               Verified
//             </span>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4">
//             <span className="text-slate-400 text-xs sm:text-sm block mb-1">
//               Issuer
//             </span>
//             <p className="font-semibold text-cyan-400 text-sm sm:text-base">
//               {cert.issuer}
//             </p>
//           </div>
//           <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4">
//             <span className="text-slate-400 text-xs sm:text-sm block mb-1">
//               Date
//             </span>
//             <p className="font-semibold text-white text-sm sm:text-base">
//               {cert.date}
//             </p>
//           </div>
//           <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4">
//             <span className="text-slate-400 text-xs sm:text-sm block mb-1">
//               Credential ID
//             </span>
//             <p className="font-mono text-xs sm:text-sm text-slate-300 break-all">
//               {cert.credentialId}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right - Certificate Details */}
//       <div className="lg:col-span-2">
//         <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-amber-400 transition-colors duration-300">
//           {cert.name}
//         </h3>
//         <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
//           {cert.description}
//         </p>

//         <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
//           <Icon
//             icon="mingcute:lightbulb-line"
//             width={20}
//             height={20}
//             className="text-amber-400"
//           />
//           Skills Validated
//         </h4>
//         <div className="flex flex-wrap gap-2 sm:gap-3">
//           {cert.skills.map((skill) => (
//             <span
//               key={skill}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-300 text-xs sm:text-sm hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300 font-medium"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// ));

// CertificationCard.displayName = "CertificationCard";

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
      {
        threshold: 0.1,
        rootMargin: "50px",
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

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // Memoized tab content
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "formal":
        return (
          <div className="space-y-6 sm:space-y-8">
            {FORMAL_EDUCATION.map((edu, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 sm:p-8 hover:border-cyan-400/50 transition-all duration-500"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  {/* Left - Institution Info */}
                  <div>
                    <div className="flex flex-col items-start gap-4 sm:gap-6 mb-6">
                      <div className="flex gap-4 md:items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Icon
                            icon="streamline-flex:graduation-cap"
                            width={32}
                            height={32}
                            className="text-white"
                          />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                          {edu.degree}
                        </h3>
                      </div>
                      <div className="w-full justify-center ">
                        <p className="text-cyan-400 text-base sm:text-lg font-semibold">
                          {edu.institution}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          {edu.location}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-slate-700/30 rounded-xl p-3 sm:p-4">
                        <p className="text-slate-400 text-xs sm:text-sm mb-1">
                          Period
                        </p>
                        <p className="text-white font-semibold text-sm sm:text-base">
                          {edu.period}
                        </p>
                      </div>
                      <div className="bg-slate-700/30 rounded-xl p-3 sm:p-4">
                        <p className="text-slate-400 text-xs sm:text-sm mb-1">
                          Status
                        </p>
                        <p className="text-green-400 font-semibold text-sm sm:text-base">
                          {edu.status}
                        </p>
                      </div>
                      <div className="bg-slate-700/30 rounded-xl p-3 sm:p-4 col-span-2">
                        <p className="text-slate-400 text-xs sm:text-sm mb-1">
                          Performance
                        </p>
                        <p className="text-white font-semibold text-sm sm:text-base">
                          {edu.grade}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right - Description & Highlights */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Icon
                        icon="mingcute:book-2-line"
                        width={24}
                        height={24}
                        className="text-purple-400"
                      />
                      Program Overview
                    </h4>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {edu.description}
                    </p>

                    <h5 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Icon
                        icon="mingcute:trophy-line"
                        width={20}
                        height={20}
                        className="text-amber-400"
                      />
                      Key Achievements
                    </h5>
                    <div className="space-y-2 sm:space-y-3">
                      {edu.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-slate-300 text-sm sm:text-base"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                          <span className="flex-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="relative z-10 border-t border-slate-700/50 pt-6 sm:pt-8">
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                    <Icon
                      icon="mingcute:code-line"
                      width={24}
                      height={24}
                      className="text-cyan-400"
                    />
                    Key Subjects & Performance
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {edu.subjects.map((subject) => (
                      <div
                        key={subject.name}
                        className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-3 sm:p-4 hover:border-cyan-400/30 transition-all duration-300 group"
                      >
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-slate-300 font-medium text-sm sm:text-base flex-1 line-clamp-2">
                            {subject.name}
                          </span>
                          <span className="text-cyan-400 font-bold text-sm sm:text-base flex-shrink-0">
                            {subject.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "online":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {ONLINE_COURSES.map((course, index) => (
              <CourseCard key={course.title} course={course} index={index} />
            ))}
          </div>
        );

      // case "certificates":
      //   return (
      //     <div className="space-y-4 sm:space-y-6">
      //       {CERTIFICATIONS.map((cert, index) => (
      //         <CertificationCard key={cert.name} cert={cert} index={index} />
      //       ))}
      //     </div>
      //   );

      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-10 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-xs sm:text-sm uppercase">
              Education & Learning
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
            Continuous growth through formal education, online courses, and
            professional certifications
          </p>
        </div>

        {/* Learning Stats */}
        <div
          className={`mb-10 sm:mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 sm:p-8 hover:border-cyan-400/30 transition-all duration-500">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center flex items-center justify-center gap-3">
              <Icon
                icon="mingcute:chart-line-line"
                width={24}
                height={24}
                className="text-cyan-400"
              />
              <span>Learning Statistics</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {LEARNING_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="group text-center p-4 sm:p-5 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      icon={stat.icon}
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex justify-center mb-8 sm:mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 flex gap-2 overflow-x-auto w-full ">
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
