import "./App.css";
import BurgerMenu from "./components/BurgerMenu";
import HeaderMenu from "./components/HeaderMenu";
import Particle from "./components/Particle";
import Section from "./components/Section";
import About from "./components/slides/About";
import ContactMe from "./components/slides/ContactMe";
import Education from "./components/slides/Educations";
import Experiences from "./components/slides/Experiences";
import Home from "./components/slides/Home";
import Projects from "./components/slides/Projects";
import Skills from "./components/slides/Skills";

function App() {
  // Unified scroll function that ensures proper section positioning
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use a small timeout to ensure DOM is fully rendered
      setTimeout(() => {
        // Get the current position of the element
        const rect = element.getBoundingClientRect();
        const currentScrollY = window.pageYOffset;
        const elementTop = rect.top + currentScrollY;

        // Set desired offset - distance from top of viewport where section should appear
        const desiredOffset = 80; // 80px from top of viewport
        const targetScrollY = elementTop - desiredOffset;

        console.log({
          id,
          elementTop,
          currentScrollY,
          targetScrollY,
          elementRect: rect,
        });

        // Scroll to the calculated position
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: "smooth",
        });
      }, 100);
    } else {
      console.warn(`Element with ID "${id}" not found.`);
    }
  };

  return (
    <div className="relative text-white min-h-screen overflow-x-hidden">
      {/* Particle Background */}
      <Particle />

      {/* Navigation */}
      <HeaderMenu />
      <BurgerMenu />

      {/* Sections */}
      <Section id="home" title="Welcome to My Portfolio">
        <Home scrollToSection={scrollToSection} />
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
    </div>
  );
}

export default App;
