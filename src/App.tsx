import "./App.css";
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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative text-white min-h-screen overflow-x-hidden">
      {/* Particle Background */}
      <Particle />

      {/* Navigation */}
      <HeaderMenu />

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
        <ContactMe/>
      </Section>
    </div>
  );
}

export default App;
