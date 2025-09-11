
import "./App.css";
import HeaderMenu from "./components/HeaderMenu";
import Particle from "./components/particle";
import Section from "./components/Section";
import About from "./components/slides/About";
import Education from "./components/slides/Educations";
import Experiences from "./components/slides/Experiences";
import Home from "./components/slides/Home";
import Projects from "./components/slides/Projects";
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
       <About/>
      </Section>

      <Section id="educations" title="Educations">
        <Education/>
      </Section>

      <Section id="experiences" title="Experiences">
       <Experiences/>
      </Section>

      <Section id="projects" title="Projects">
        <Projects/>
      </Section>

      <Section id="skills" title="Skills">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-2xl mx-auto">
          <li>⚛️ React & TypeScript</li>
          <li>🎨 Tailwind CSS</li>
          <li>📡 Node.js & Express</li>
          <li>🐳 Docker & Git</li>
          <li>📱 Responsive Design</li>
          <li>📊 REST APIs</li>
          <li>🔐 Firebase Auth</li>
          <li>📈 Framer Motion</li>
        </ul>
      </Section>

      <Section id="contactme" title="Contact Me">
        <div className="space-y-3">
          <p>📧 Email: youremail@example.com</p>
          <p>🔗 LinkedIn: /in/yourprofile</p>
          <p>🐙 GitHub: /yourusername</p>
        </div>
      </Section>
    </div>
  );
}

export default App;
