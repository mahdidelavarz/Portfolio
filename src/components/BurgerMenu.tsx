"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect, useCallback, memo } from "react";

interface NavItem {
  id: string;
  title: string;
  icon: string;
}

interface SocialLink {
  icon: string;
  color: string;
  bg: string;
  link: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", title: "Home", icon: "solar:home-2-bold" },
  { id: "aboutme", title: "About Me", icon: "mingcute:user-warning-fill" },
  { id: "educations", title: "Educations", icon: "mdi:account-student" },
  { id: "experiences", title: "Experiences", icon: "mingcute:user-star-fill" },
  { id: "projects", title: "Projects", icon: "streamline-flex:keyboard-option-setting-gear-solid" },
  { id: "skills", title: "Skills", icon: "streamline-flex:artificial-intelligence-brain-chip-solid" },
  { id: "contactme", title: "Contact Me", icon: "streamline-ultimate:phone-retro-1-bold" },
];

const socialLinks: SocialLink[] = [
  {
    icon: "line-md:github-loop",
    color: "text-slate-300 hover:text-white",
    bg: "hover:bg-slate-800/50",
    link: "https://github.com/mahdidelavarz",
    label: "GitHub",
  },
  {
    icon: "hugeicons:telegram",
    color: "text-cyan-400 hover:text-cyan-300",
    bg: "hover:bg-cyan-900/30",
    link: "https://t.me/osis13",
    label: "Telegram",
  },
  {
    icon: "streamline:linkedin",
    color: "text-blue-500 hover:text-blue-400",
    bg: "hover:bg-blue-900/30",
    link: "https://www.linkedin.com/in/mahdi-delavar-5338ba280",
    label: "LinkedIn",
  },
  {
    icon: "lineicons:whatsapp",
    color: "text-green-500 hover:text-green-400",
    bg: "hover:bg-green-900/30",
    link: "https://wa.me/09025574357",
    label: "WhatsApp",
  },
];

// Memoized menu item component
const MenuItem = memo(({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: NavItem; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
        : "text-gray-300 hover:bg-white/5 hover:text-white"
    }`}
  >
    <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
      <Icon icon={item.icon} width="22" height="22" />
    </div>
    <span className="text-base font-medium tracking-wide">{item.title}</span>
    {isActive && (
      <div className="absolute right-3 w-2 h-2 rounded-full bg-white animate-pulse" />
    )}
  </button>
));

MenuItem.displayName = "MenuItem";

// Memoized social link component
const SocialLink = memo(({ social }: { social: SocialLink }) => (
  <a
    href={social.link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={social.label}
    className={`group relative p-3 rounded-xl transition-all duration-300 ${social.color} ${social.bg}`}
  >
    <Icon icon={social.icon} width="24" height="24" />
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {social.label}
    </span>
  </a>
));

SocialLink.displayName = "SocialLink";

const BurgerMenu: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string>("home");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const scrollToSlide = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset;
      const elementTop = rect.top + currentScrollY;
      const targetScrollY = Math.max(0, elementTop - 80);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });

      setActiveSlide(id);
      setIsOpen(false);
    }
  }, []);

  // Optimized scroll detection
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const triggerPoint = scrollY + viewportHeight * 0.3;

        for (const item of navItems) {
          const section = document.getElementById(item.id);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (triggerPoint >= sectionTop && triggerPoint < sectionBottom) {
              setActiveSlide(item.id);
              break;
            }
          }
        }
        
        rafId = 0;
      });
    };

    const timer = setTimeout(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Initial scroll to top on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="fixed top-5 right-5 z-50 p-3 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-white backdrop-blur-xl shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 lg:hidden border border-white/10"
      >
        <Icon icon="solar:hamburger-menu-bold" width="26" height="26" />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-all duration-500 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Slide-in Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white shadow-2xl transform transition-all duration-500 z-50 border-l border-white/10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Icon icon="solar:user-bold" width="20" height="20" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Menu</h3>
              <p className="text-xs text-gray-400">Navigation</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width="28" height="28" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col h-[calc(100%-88px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Menu Items */}
          <div className="flex-1 px-6 py-6 space-y-2">
            {navItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={activeSlide === item.id}
                onClick={() => scrollToSlide(item.id)}
              />
            ))}
          </div>

          {/* Social Links Section */}
          <div className="px-6 pb-6 pt-4 border-t border-white/10">
            <p className="text-sm font-medium text-gray-400 mb-4">Connect with me</p>
            <div className="flex justify-center gap-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.label} social={social} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BurgerMenu;