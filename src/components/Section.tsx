import React, { memo } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = memo(({ id, title, children }) => {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center relative"
      aria-label={title}
    >
      <div className="w-full text-center text-white">
        <div className="text-lg md:text-xl leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
});

Section.displayName = "Section";

export default Section;