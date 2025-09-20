// ============================================================================
// 3. OPTIMIZED HomeSection.tsx - Memoization & Performance
// ============================================================================
"use client";

import { useCallback, memo } from "react";
import Home from "./server/Home.server";

const HomeSection = memo(() => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset;
      const targetScrollY = rect.top + currentScrollY - 80;
      
      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: "smooth",
      });
    });
  }, []);

  return <Home scrollToSection={scrollToSection} />;
});

HomeSection.displayName = "HomeSection";

export default HomeSection;