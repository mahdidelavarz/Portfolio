"use client";
import { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import AboutMeContent , { skills } from "../server/About.server";


export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Skill bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <AboutMeContent />

      {/* Client-only skill progress bars with animation */}
      <div className="max-w-3xl mx-auto mt-12">
        {skills.map((skill : any, i : any) => (
          <div key={i} className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-2 text-white">
                <Icon icon={skill.icon} width="20" />
                {skill.name}
              </span>
              <span className="text-slate-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ${
                  activeSkill === i ? "animate-pulse" : ""
                }`}
                style={{ width: isVisible ? `${skill.level}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
