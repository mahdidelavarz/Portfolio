// components/Section.tsx
import React from "react";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center relative"
      aria-label={title} // improves accessibility & SEO
    >
      <div className="w-full text-center text-white">
        <div className="text-lg md:text-xl leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
