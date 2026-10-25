import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeaderMenu from "../components/HeaderMenu";
import Section from "../components/Section";
import HomeSection from "@/components/HomeSection";
import BurgerMenu from "@/components/BurgerMenu";
import ChallengesPreview from "@/components/server/ChallengesPreview.server";
import ArticlesPreview from "@/components/server/ArticlesPreview.server";

// Dynamic imports for better performance
const About = dynamic(() => import("../components/client/About"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
});

const ContactMe = dynamic(() => import("../components/client/ContactMe"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
});

const Experiences = dynamic(() => import("../components/client/Experiences"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
});

const Projects = dynamic(() => import("../components/client/Projects"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
});

const Skills = dynamic(() => import("../components/client/Skills"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
});

const Education = dynamic(() => import("@/components/client/Education"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
});

export const metadata: Metadata = {
  title: { absolute: "Mahdi Delavar | Frontend Developer" },
  alternates: {
    canonical: "https://mahdidelavar.ir",
  },
};

const PERSON_ID = "https://mahdidelavar.ir/#person";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://mahdidelavar.ir/#webpage",
      url: "https://mahdidelavar.ir",
      name: "Mahdi Delavar | Frontend Developer",
      isPartOf: { "@id": "https://mahdidelavar.ir/#website" },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Mahdi Delavar",
      image: "https://mahdidelavar.ir/mahdi-delavar.webp",
      jobTitle: "Frontend Developer",
      description:
        "Frontend Developer building maintainable React and TypeScript systems for enterprise and data-intensive applications.",
      url: "https://mahdidelavar.ir",
      email: "mailto:mdelever77@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tabriz",
        addressRegion: "East Azerbaijan",
        addressCountry: "IR",
      },
      worksFor: {
        "@type": "Organization",
        name: "Pump Turbine Co. (Petco)",
        url: "https://pumpturbine.co/en/",
      },
      sameAs: [
        "https://github.com/mahdidelavarz",
        "https://www.linkedin.com/in/mahdi-delavar-5338ba280",
      ],
      knowsAbout: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "TanStack Query",
        "Zustand",
        "React Hook Form",
        "Frontend Architecture",
        ".NET",
        "SQL Server",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://mahdidelavar.ir/#website",
      url: "https://mahdidelavar.ir",
      name: "Mahdi Delavar",
      publisher: { "@id": PERSON_ID },
      inLanguage: "en-US",
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* Comprehensive JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Main container with semantic HTML */}
      <div className="relative text-white min-h-screen overflow-x-hidden">

        {/* Navigation */}
        <HeaderMenu />
        <BurgerMenu />

        {/* Main content */}
        <main role="main" aria-label="Portfolio Content" >
          {/* Hero Section */}
          <Section
            id="home"
            title="Welcome to My Portfolio"
            aria-label="Home Section"
          >
            <HomeSection />
          </Section>

          {/* About Section */}
          <Section id="aboutme" title="About Me" aria-label="About Me Section">
            <About />
          </Section>

          {/* Education Section */}
          <Section
            id="educations"
            title="Education"
            aria-label="Education Section"
          >
            <Education />
          </Section>

          {/* Experience Section */}
          <Section
            id="experiences"
            title="Professional Experience"
            aria-label="Professional Experience Section"
          >
            <Experiences />
          </Section>

          {/* Projects Section */}
          <Section
            id="projects"
            title="Featured Projects"
            aria-label="Projects Section"
          >
            <Projects />
          </Section>

          {/* Skills Section */}
          <Section
            id="skills"
            title="Technical Skills"
            aria-label="Skills Section"
          >
            <Skills />
          </Section>

          {/* Challenges Section */}
          <Section
            id="challenges"
            title="Frontend Challenges"
            aria-label="Challenges Section"
          >
            <ChallengesPreview />
          </Section>

          {/* Articles Section */}
          <Section
            id="articles"
            title="Engineering Articles"
            aria-label="Engineering Articles Section"
          >
            <ArticlesPreview />
          </Section>

          {/* Contact Section */}
          <Section
            id="contactme"
            title="Get In Touch"
            aria-label="Contact Section"
          >
            <ContactMe />
          </Section>
        </main>

        {/* Footer */}
        <footer
          className="h-25 flex flex-col items-center justify-center text-center text-slate-400 border-t border-slate-800 absolute bottom-0 w-full z-50"
          role="contentinfo"
          aria-label="Footer"
        >
          <p className="text-sm">
            © {new Date().getFullYear()} Mahdi Delavar. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Built with Next.js, React, and TypeScript
          </p>
        </footer>
      </div>
    </>
  );
}
