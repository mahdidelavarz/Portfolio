"use client";

import { memo, useEffect, useRef, useState } from "react";
import {
  SolarCalendarBold,
  SolarCodeSquareBold,
  SolarMapPoindBold,
  SolarUserIcon,
} from "@/icons/icons";

const PERSONAL_INFO = {
  name: "Mahdi Delavar",
  location: "Tabriz, Iran",
  role: "Frontend Developer",
  experience: "3+ Years",
  stack: "React + TypeScript",
} as const;

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
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6">
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              Get to Know Me
            </span>
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 flex items-center justify-center">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Frontend Engineering in Practice
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            React and TypeScript for enterprise workflows and maintainable
            products
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
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden group">
                  <SolarUserIcon
                    width={120}
                    height={120}
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
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                      <SolarCalendarBold className="inline mr-1" width={16} />
                      {PERSONAL_INFO.experience}
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                      <SolarMapPoindBold className="inline mr-1" width={16} />
                      {PERSONAL_INFO.location}
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                      <SolarCodeSquareBold
                        className="inline mr-1"
                        width={16}
                      />
                      {PERSONAL_INFO.stack}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4 text-slate-300 leading-relaxed text-left">
                <p>
                  I&apos;m a frontend developer working mainly with React and
                  TypeScript. Over the past few years, I&apos;ve worked on
                  everything from personal full-stack products to a large,
                  multi-module enterprise ERP.
                </p>
                <p>
                  Most of my professional work has involved turning complex
                  business workflows into maintainable frontend systems:
                  data-heavy interfaces, reusable form and table
                  infrastructure, routed workflows, state management, and
                  shared architecture such as PageShell.
                </p>
                <p>
                  I usually care as much about the structure behind a feature
                  as the UI itself. I try to understand how the workflow and
                  data actually behave, then build the frontend around that
                  instead of duplicating the same logic for every new page. I
                  also use personal projects to explore full-stack development
                  and product engineering end to end.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutMe.displayName = "AboutMe";

export default AboutMe;
