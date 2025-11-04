import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeaderMenu from "../components/HeaderMenu";
import Section from "../components/Section";
// import ParticleWrapper from "@/components/ParticleWrapper";
import HomeSection from "@/components/HomeSection";
import BurgerMenu from "@/components/BurgerMenu";

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

// Enhanced metadata for SEO
export const metadata: Metadata = {
  title: "Mahdi Delavar | Frontend Developer - React & Next.js Expert",
  description:
    "Frontend Developer specializing in React, Next.js, and TypeScript. Explore 50+ projects and my 3+ years of experience building scalable web apps.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "Web Developer Iran",
    "Mahdi Delavar",
  ],
  alternates: {
    canonical: "https://mahdidelavar.ir",
  },
  openGraph: {
    title: "Mahdi Delavar - Frontend Developer Portfolio",
    description:
      "React & Next.js expert with 3+ years of experience. Explore 50+ web projects built for performance and scalability.",
    url: "https://mahdidelavar.ir",
    siteName: "Mahdi Delavar Portfolio",
    images: [
      {
        url: "https://mahdidelavar.ir/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahdi Delavar Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahdi Delavar - Frontend Developer",
    description:
      "React, Next.js & TypeScript Developer with 3+ years experience and 50+ completed projects.",
    creator: "@mahdi_delavar",
    images: ["https://mahdidelavar.ir/twitter-image.png"],
  },
  robots: { index: true, follow: true },
};


// Comprehensive structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://mahdidelavar.ir/#webpage",
      url: "https://mahdidelavar.ir",
      name: "Mahdi Delavar - Frontend Developer Portfolio",
      isPartOf: {
        "@id": "https://mahdidelavar.ir/#website",
      },
      about: {
        "@id": "https://mahdidelavar.ir/#person",
      },
      dateModified: new Date().toISOString(),
      description:
        "Professional portfolio of Mahdi Delavar, a Frontend Developer specializing in React, Next.js, and modern web technologies.",
      breadcrumb: {
        "@id": "https://mahdidelavar.ir/#breadcrumb",
      },
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "ReadAction",
          target: ["https://mahdidelavar.ir"],
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://mahdidelavar.ir/#person",
      name: "Mahdi Delavar",
      alternateName: "Mahdi",
      image: "https://mahdidelavar.ir/profile-photo.jpg",
      jobTitle: "Senior Frontend Developer",
      description:
        "Experienced Frontend Developer with 3+ years of expertise in React, Next.js, TypeScript, and modern web technologies. Passionate about creating exceptional user experiences and scalable web applications.",
      url: "https://mahdidelavar.ir",
      email: "mdelever77@gmail.com",
      telephone: "+989123456789",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tehran",
        addressRegion: "Tehran Province",
        addressCountry: "IR",
      },
      sameAs: [
        "https://github.com/mahdidelavarz",
        "https://linkedin.com/in/mahdi-delavar",
        "https://twitter.com/mahdi_delavar",
        "https://t.me/mahdi_delavar",
        "https://wa.me/989123456789",
      ],
      knowsAbout: [
        "Frontend Development",
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript ES6+",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Tailwind CSS",
        "Material-UI",
        "Responsive Web Design",
        "Progressive Web Apps",
        "Web Performance Optimization",
        "SEO",
        "UI/UX Design Principles",
        "Agile Methodologies",
        "Git Version Control",
        "CI/CD",
        "Testing (Jest, Cypress)",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Frontend Developer",
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          name: "Frontend Developer Salary",
          currency: "USD",
          duration: "P1Y",
          percentile10: 40000,
          percentile25: 55000,
          median: 75000,
          percentile75: 95000,
          percentile90: 120000,
        },
        occupationLocation: [
          {
            "@type": "City",
            name: "Tehran",
          },
        ],
        experienceRequirements: {
          "@type": "OccupationalExperienceRequirements",
          monthsOfExperience: 36,
        },
        skills: [
          "React.js",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "CSS",
          "HTML",
        ],
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Bachelor's Degree in Computer Science",
          credentialCategory: "degree",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Petco",
        url: "https://petco.com",
      },
      memberOf: [
        {
          "@type": "Organization",
          name: "Frontend Developer Community",
        },
      ],
      nationality: {
        "@type": "Country",
        name: "Iran",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://mahdidelavar.ir/#website",
      url: "https://mahdidelavar.ir",
      name: "Mahdi Delavar Portfolio",
      description:
        "Frontend Developer Portfolio - React, Next.js & TypeScript Expert",
      publisher: {
        "@id": "https://mahdidelavar.ir/#person",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://mahdidelavar.ir/?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://mahdidelavar.ir/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://mahdidelavar.ir",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://mahdidelavar.ir/#skills",
      name: "Technical Skills",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "React.js - 95% Proficiency",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Next.js - 90% Proficiency",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "TypeScript - 88% Proficiency",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Tailwind CSS - 92% Proficiency",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://mahdidelavar.ir/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What services does Mahdi Delavar offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I offer frontend development services specializing in React, Next.js, and TypeScript. This includes building responsive web applications, progressive web apps, e-commerce platforms, and custom web solutions.",
          },
        },
        {
          "@type": "Question",
          name: "What is Mahdi Delavar's experience level?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I have over 3 years of professional experience in frontend development, having delivered 50+ successful projects with a 100% client satisfaction rate.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Mahdi Delavar for a project?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can contact me through the contact form on my portfolio website, email me at mdelever77@gmail.com, or reach out via LinkedIn or GitHub.",
          },
        },
        {
          "@type": "Question",
          name: "What technologies does Mahdi Delavar specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I specialize in React.js, Next.js, TypeScript, JavaScript ES6+, Tailwind CSS, Node.js, and various modern web development tools and frameworks.",
          },
        },
      ],
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
