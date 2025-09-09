import "./App.css";
import HeaderMenu from "./components/HeaderMenu";
import Particle from "./components/Particle";
import Section from "./components/Section";
import About from "./components/slides/About";
import Home from "./components/slides/Home";
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
        <ul className="list-disc list-inside text-left inline-block">
          <li className="mb-2">
            🎓 B.Sc. Computer Science — University of Techland (2020–2024)
          </li>
          <li>🏫 High School Diploma — Science Stream (2018)</li>
        </ul>
      </Section>

      <Section id="experiences" title="Experiences">
        <ul className="list-disc list-inside text-left inline-block">
          <li className="mb-2">
            💻 Frontend Developer Intern — TechCorp (Summer 2023)
          </li>
          <li>🛠️ Freelance Web Developer — Remote (2022–Present)</li>
        </ul>
      </Section>

      <Section id="projects" title="Projects">
        <ul className="list-disc list-inside text-left inline-block">
          <li className="mb-2">
            🌱 EcoTracker — React app to track carbon footprint
          </li>
          <li>📚 BookNook — Full-stack book recommendation platform</li>
        </ul>
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
