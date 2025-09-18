// components/HomeSection.tsx
"use client";

import Home from "./server/Home.server";

export default function HomeSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const currentScrollY = window.pageYOffset;
        const targetScrollY = rect.top + currentScrollY - 80;
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return <Home scrollToSection={scrollToSection} />;
}
