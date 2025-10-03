// app/page.tsx
import "./globals.css";
import HeaderMenu from "../components/HeaderMenu";
import About from "../components/client/About";
import ContactMe from "../components/client/ContactMe";
import Experiences from "../components/client/Experiences";
import Projects from "../components/client/Projects";
import Skills from "../components/client/Skills";
import Section from "../components/Section";
import ParticleWrapper from "@/components/ParticleWrapper";
import Education from "@/components/client/Education";
import HomeSection from "@/components/HomeSection";
import BurgerMenu from "@/components/BurgerMenu";

export const metadata = {
  title:
    "Mahdi Delavar | Frontend Developer Portfolio - React & Next.js Expert",
  description:
    "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies. 3+ years of experience, 50+ projects delivered. Crafting exceptional digital experiences with modern technologies.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Expert",
    "UI/UX Engineer",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Mahdi Delavar",
  ],
  authors: [{ name: "Mahdi Delavar" }],
  creator: "Mahdi Delavar",
  publisher: "Mahdi Delavar",
  openGraph: {
    title: "Mahdi Delavar - Frontend Developer Portfolio",
    description:
      "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies. View my projects and experience.",
    url: "https://yourdomain.com", // Replace with your actual domain
    siteName: "Mahdi Delavar Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahdi Delavar - Frontend Developer Portfolio",
    description:
      "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add when you have it
  },
};

// JSON-LD structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahdi Delavar",
  jobTitle: "Frontend Developer",
  description:
    "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies",
  url: "https://yourdomain.com", // Replace with your domain
  sameAs: [
    "https://github.com/yourprofile", // Replace with your actual profiles
    "https://linkedin.com/in/yourprofile",
    // Add other social profiles
  ],
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "UI/UX Design",
    "Web Development",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Your University/School", // Add your education
  },
};

export default function Page() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="relative text-white min-h-screen overflow-x-hidden">
        <ParticleWrapper />
        <HeaderMenu />
        <BurgerMenu />

        <main>
          <Section id="home" title="Welcome to My Portfolio">
            <HomeSection />
          </Section>

          <Section id="aboutme" title="About Me">
            <About />
          </Section>

          <Section id="educations" title="Educations">
            <Education />
          </Section>

          <Section id="experiences" title="Experiences">
            <Experiences />
          </Section>

          <Section id="projects" title="Projects">
            <Projects />
          </Section>

          <Section id="skills" title="Skills">
            <Skills />
          </Section>

          <Section id="contactme" title="Contact Me">
            <ContactMe />
          </Section>
        </main>
      </div>
    </>
  );
}
