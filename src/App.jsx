import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMenu, FiX, FiDownload, FiMapPin } from "react-icons/fi";
import "./App.css";

const projects = [
  { title: "SalesPilot", type: "AI product experience", year: "2024", image: "/salespilot.png", accent: "#e2ff65" },
  { title: "Scholarly", type: "Learning platform", year: "2024", image: "/scholarly.png", accent: "#b8a6ff" },
  { title: "Private Bank", type: "Fintech interface", year: "2023", image: "/privatebank.png", accent: "#f4b86a" },
];

const skills = ["React", "Next.js", "TypeScript", "Node.js", "Three.js", "Product Design"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Samriddhi home"><span>SP</span><b>samriddhi.</b></a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {["about", "work", "journey", "contact"].map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}</button>)}
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>Let&apos;s talk <FiArrowUpRight /></button>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Available for select projects · 2026</p>
          <h1>I design & build <em>digital</em> experiences that move people.</h1>
          <p className="hero-lede">Frontend engineer and creative technologist crafting thoughtful interfaces, expressive motion, and products with a pulse.</p>
          <div className="hero-actions"><button className="pill-button light" onClick={() => scrollTo("work")}>Explore my work <FiArrowUpRight /></button><a className="text-link" href="#contact"><FiDownload /> Download resume</a></div>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <motion.div className="portrait-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .3, duration: .8 }}><img src="/logo.png" alt="Samriddhi monogram" /></motion.div>
          <div className="floating-note note-top">creative<br /><strong>developer</strong></div>
          <div className="floating-note note-bottom"><span>01</span> curious by default</div>
        </div>
        <div className="scroll-cue"><span>scroll to wander</span><i /></div>
      </section>

      <section id="about" className="statement-section section-dark">
        <div className="section-label">01 / about</div>
        <div className="statement-grid"><h2>Good design should feel like a <span>conversation.</span></h2><div className="statement-body"><p>I&apos;m Samriddhi, a frontend developer who loves the space where code meets culture. I turn big ideas into digital spaces that are clear, memorable, and a little unexpected.</p><p>My approach is equal parts systems thinking and playful experimentation — always with the people on the other side of the screen in mind.</p><button className="arrow-link" onClick={() => scrollTo("journey")}>More about me <FiArrowUpRight /></button></div></div>
        <div className="ticker" aria-label="Skills">{[...skills, ...skills].map((skill, i) => <span key={`${skill}-${i}`}>{skill} <b>✦</b></span>)}</div>
      </section>

      <section id="work" className="work-section">
        <div className="section-heading"><div><div className="section-label">02 / selected work</div><h2>Built with <em>intention.</em></h2></div><p>A few places where strategy, storytelling, and pixel-level craft came together.</p></div>
        <div className="project-showcase"><div className="project-list">{projects.map((project, i) => <button key={project.title} className={activeProject === i ? "project-item active" : "project-item"} onClick={() => setActiveProject(i)}><span>0{i + 1}</span><strong>{project.title}</strong><small>{project.type}</small><FiArrowUpRight /></button>)}</div><AnimatePresence mode="wait"><motion.div key={projects[activeProject].title} className="project-preview" style={{ background: projects[activeProject].accent }} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: .35 }}><div className="preview-meta"><span>{projects[activeProject].type}</span><span>{projects[activeProject].year}</span></div><img src={projects[activeProject].image} alt={`${projects[activeProject].title} project preview`} /><div className="preview-title">{projects[activeProject].title}<FiArrowUpRight /></div></motion.div></AnimatePresence></div>
      </section>

      <section id="journey" className="journey-section section-dark"><div className="section-label">03 / the journey</div><div className="journey-content"><h2>Always learning.<br /><span>Always making.</span></h2><div className="timeline"><div><b>2024 — now</b><h3>Frontend engineer · Builder</h3><p>Creating expressive product experiences with modern web technologies and a human-first mindset.</p></div><div><b>2022 — 2024</b><h3>Design systems · Open source</h3><p>Exploring the details that make interfaces feel cohesive, accessible, and alive.</p></div></div></div></section>

      <section id="contact" className="contact-section"><div className="section-label">04 / say hello</div><h2>Have an idea?<br /><em>Let&apos;s make it real.</em></h2><a className="email-link" href="mailto:samriddhi@example.com">samriddhi@example.com <FiArrowUpRight /></a><div className="contact-footer"><span><FiMapPin /> India · working globally</span><div className="socials"><a href="https://github.com/samyyy25" aria-label="GitHub"><FiGithub /></a><a href="https://www.linkedin.com" aria-label="LinkedIn"><FiLinkedin /></a><a href="mailto:samriddhi@example.com" aria-label="Email"><FiMail /></a></div></div></section>
      <footer><span>© 2026 Samriddhi PF</span><span>Made with curiosity + code</span></footer>
    </main>
  );
}

export default App;
