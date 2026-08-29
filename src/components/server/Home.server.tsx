import {
  HugeIconsNote,
  LineMdGithubLoop,
  StLinkedin,
  StreamlineKeyboardSolid,
} from "@/icons/icons";
import { memo } from "react";

interface HomeProps {
  scrollToSection: (id: string) => void;
}

const socialLinks = [
  {
    icon: LineMdGithubLoop,
    color: "text-slate-300 hover:text-white",
    bg: "hover:bg-slate-800/50",
    link: "https://github.com/mahdidelavarz",
    label: "GitHub",
  },
  {
    icon: StLinkedin,
    color: "text-blue-500 hover:text-blue-400",
    bg: "hover:bg-blue-900/30",
    link: "https://www.linkedin.com/in/mahdi-delavar-5338ba280",
    label: "LinkedIn",
  },
];

const Home = memo(function Home({ scrollToSection }: HomeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950">
      {/* Desktop Social Links Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 lg:flex flex-col gap-3 transition-all duration-1000 hidden">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent mx-auto"></div>

        {socialLinks.map((social, index) => (
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <button
              className={`group relative w-12 h-12 rounded-xl backdrop-blur-md bg-black/20 border border-white/10 ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-white/20 cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={social.label}
            >
              <social.icon
                width="20"
                height="20"
                className="mx-auto transition-all duration-300"
              />
            </button>
          </a>
        ))}

        <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-200/40 to-transparent mx-auto"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="transition-all duration-1000 delay-300">
            {/* Name - Responsive sizing */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-cyan-200 via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                Mahdi Delavar
              </div>
            </h1>

            {/* Role */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-5 sm:mb-6 bg-gradient-to-r from-cyan-400 via-orange-400 to-purple-500 bg-clip-text text-transparent">
              Frontend Developer
            </p>

            {/* Engineering focus */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-100 mb-4 sm:mb-5 max-w-4xl mx-auto leading-tight px-2">
              Building complex, data-intensive products with React &amp;
              TypeScript.
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-400 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
              I build maintainable frontend systems for complex products, with
              a focus on reusable architecture, data-intensive interfaces, and
              real business workflows.
            </p>

            {/* Action Buttons - Compact on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center px-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="group cursor-pointer relative px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/20 hover:-translate-y-1 border border-cyan-500/30"
                aria-label="View My Work"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <StreamlineKeyboardSolid width="20" height="20" />
                  <span>View My Work</span>
                </div>
              </button>

              <a
                href="https://mahdidelavar.ir/Mahdi_Delavar.pdf"
                download="Mahdi_Delavar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer px-6 sm:px-10 py-3 sm:py-4 border-2 border-slate-600/50 backdrop-blur-md bg-white/5 rounded-xl sm:rounded-2xl font-semibold text-slate-300 text-sm sm:text-base hover:text-white hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-300 hover:-translate-y-1"
                aria-label="Download Résumé"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <HugeIconsNote
                    width="20"
                    height="20"
                    className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                  />
                  <span>Download Résumé</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;
