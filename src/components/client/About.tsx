"use client";
import { useState, useEffect, useRef, memo } from "react";
import {
  FaSolidPuzzlePieceIcon,
  SolarBookBold,
  SolarCalendarBold,
  SolarChatRoundBoldIcon,
  SolarCheckCircleBold,
  SolarClockCircleBoldIcon,
  SolarCodeSquareBold,
  SolarDocumentBold,
  SolarEyeBoldIcon,
  SolarGlobalBoldIcon,
  SolarGraphUpBoldIcon,
  SolarHeartBold,
  SolarLightBlubMinimalisticBold,
  SolarLightbulbBultIcon,
  SolarMapPoindBold,
  SolarRefreshCircleBold,
  SolarRefreshSquareBold,
  SolarRocketBold,
  SolarStarBold,
  SolarTargetBold,
  SolarUserGroupRoundedBoldIcon,
  SolarUserIcon,
} from "@/icons/icons";

// Personal info data
const PERSONAL_INFO = {
  name: "Mahdi Delavar",
  age: 26,
  location: "Iran",
  role: "Frontend Developer",
  experience: "3+ Years",
  availability: "Open to opportunities",
} as const;

// Core values
const CORE_VALUES = [
  {
    icon: SolarHeartBold,
    title: "Passion for Code",
    description:
      "I love what I do. Every project is an opportunity to learn and grow.",
    color: "from-red-500 to-pink-600",
  },
  {
    icon: SolarUserGroupRoundedBoldIcon,
    title: "Collaboration",
    description:
      "Great products are built by great teams. I value open communication and teamwork.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: SolarLightbulbBultIcon,
    title: "Innovation",
    description:
      "Always exploring new technologies and approaches to solve problems creatively.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: SolarGraphUpBoldIcon,
    title: "Continuous Learning",
    description:
      "The tech world evolves fast. I stay curious and keep learning every day.",
    color: "from-purple-500 to-indigo-600",
  },
] as const;

// Soft skills
const SOFT_SKILLS = [
  { name: "Problem Solving", icon: FaSolidPuzzlePieceIcon, level: 80 },
  { name: "Communication", icon: SolarChatRoundBoldIcon, level: 80 },
  { name: "Time Management", icon: SolarClockCircleBoldIcon, level: 85 },
  { name: "Adaptability", icon: SolarRefreshCircleBold, level: 92 },
  {
    name: "Team Collaboration",
    icon: SolarUserGroupRoundedBoldIcon,
    level: 90,
  },
  { name: "Attention to Detail", icon: SolarEyeBoldIcon, level: 95 },
] as const;

// Goals and aspirations
const GOALS = [
  {
    icon: SolarRocketBold,
    title: "Master Advanced React Patterns",
    description:
      "Deep dive into advanced state management, performance optimization, and architectural patterns.",
  },
  {
    icon: SolarGlobalBoldIcon,
    title: "Contribute to Open Source",
    description:
      "Give back to the community by contributing to meaningful open-source projects.",
  },
  {
    icon: SolarBookBold,
    title: "Share Knowledge",
    description:
      "Write technical articles and mentor aspiring developers on their journey.",
  },
  {
    icon: SolarStarBold,
    title: "Build Impactful Products",
    description:
      "Create solutions that make a real difference in people's lives and businesses.",
  },
] as const;

// Work approach
const WORK_APPROACH = [
  {
    step: "01",
    title: "Understand",
    description:
      "I start by deeply understanding the problem, user needs, and business goals.",
    icon: SolarLightBlubMinimalisticBold,
  },
  {
    step: "02",
    title: "Plan",
    description:
      "Strategic planning with clear milestones, considering scalability and maintainability.",
    icon: SolarDocumentBold,
  },
  {
    step: "03",
    title: "Build",
    description:
      "Clean, efficient code with modern best practices and attention to every detail.",
    icon: SolarCodeSquareBold,
  },
  {
    step: "04",
    title: "Iterate",
    description:
      "Continuous improvement through testing, feedback, and optimization.",
    icon: SolarRefreshSquareBold,
  },
] as const;

// Memoized components
const ValueCard = memo<{
  value: (typeof CORE_VALUES)[number];
  index: number;
  isVisible: boolean;
}>(({ value, index, isVisible }) => (
  <div
    className={`group relative overflow-hidden rounded-xl md:rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-500 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
    style={{ transitionDelay: `${index * 0.1}s` }}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
    />
    <div className="relative z-10 flex flex-col items-center">
      <div
        className={`w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${value.color} rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <value.icon
          width={20}
          height={20}
          className="text-white md:w-7 md:h-7"
        />
      </div>
      <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
        {value.title}
      </h4>
      <p className="text-slate-400 leading-relaxed text-xs md:text-sm">
        {value.description}
      </p>
    </div>
  </div>
));

ValueCard.displayName = "ValueCard";

const SoftSkillBar = memo<{
  skill: (typeof SOFT_SKILLS)[number];
  index: number;
  isVisible: boolean;
}>(({ skill, index, isVisible }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <skill.icon width={18} height={18} className="text-white" />
        </div>
        <span className="text-white font-medium text-sm">{skill.name}</span>
      </div>
      <span className="text-cyan-400 font-semibold text-sm">
        {skill.level}%
      </span>
    </div>
    <div className="w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
      <div
        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-1000"
        style={{
          width: isVisible ? `${skill.level}%` : "0%",
          transitionDelay: `${index * 0.1}s`,
        }}
      />
    </div>
  </div>
));

SoftSkillBar.displayName = "SoftSkillBar";

const AboutMe = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950"
    >
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
              Get to Know Me
            </span>
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            {/* <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> */}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 flex items-center justify-center">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              More Than Just Code
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            A passionate developer who believes in creating meaningful digital
            experiences
          </p>
        </div>

        {/* Personal Introduction */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-cyan-400/30 transition-all duration-500">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Profile Image Placeholder */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden group">
                  <SolarUserIcon
                    width={80}
                    height={80}
                    className="text-white"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-cyan-400 font-medium mb-6 text-2xl">
                    {PERSONAL_INFO.role}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-">
                    <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                      <SolarCalendarBold className="inline mr-1" width={16} />
                      {PERSONAL_INFO.age} years old
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                      <SolarMapPoindBold className="inline mr-1" width={16} />
                      {PERSONAL_INFO.location}
                    </span>
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg">
                      <SolarCheckCircleBold
                        className="inline mr-1"
                        width={16}
                      />
                      {PERSONAL_INFO.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* About Text */}
              <div className="md:col-span-2 space-y-4 text-slate-300 leading-relaxed">
                <p>
                  👋 Hi! I'm Mahdi, a frontend developer who's been crafting
                  digital experiences for over 3 years. What started as
                  curiosity about how websites work has turned into a genuine
                  passion for creating beautiful, functional interfaces that
                  people love to use.
                </p>
                <p>
                  💡 I believe great software isn't just about clean code—it's
                  about understanding people, solving real problems, and
                  creating experiences that feel natural and intuitive. Every
                  pixel, every interaction, and every line of code matters.
                </p>
                <p>
                  🚀 When I'm not coding, you'll find me exploring new
                  technologies, reading about UX psychology, or thinking about
                  how to make the web a better place. I'm always excited to
                  collaborate with people who share the same passion for
                  excellence.
                </p>
                <p className="text-cyan-400 font-medium">
                  My goal? To build products that not only work flawlessly but
                  also bring joy to the people who use them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12 md:mb-16">
          <h3
            className={`text-3xl md:text-4xl font-bold text-white mb-8 text-center transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            What Drives Me
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CORE_VALUES.map((value, index) => (
              <ValueCard
                key={value.title}
                value={value}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-purple-400/30 transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <SolarStarBold
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Soft Skills
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-y-8 gap-x-20">
              {SOFT_SKILLS.map((skill, index) => (
                <SoftSkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Work Approach */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            My Approach to Work
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {WORK_APPROACH.map((step, index) => (
              <div key={step.step} className="relative group">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-500 h-full">
                  <div className="text-cyan-400 text-3xl md:text-5xl font-bold opacity-20 mb-2 md:mb-4">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon
                      width={20}
                      height={20}
                      className="text-white md:w-6 md:h-6"
                    />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                    {step.title}
                  </h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < WORK_APPROACH.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-7 w-7.5 h-0.5 bg-gradient-to-l from-transparent via-cyan-400 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div
          className={`hidden lg:flex mb-12 md:mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-orange-400/30 transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <SolarTargetBold
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Goals & Aspirations
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {GOALS.map((goal) => (
                <div
                  key={goal.title}
                  className="flex gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <goal.icon width={20} height={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {goal.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutMe.displayName = "AboutMe";

export default AboutMe;
