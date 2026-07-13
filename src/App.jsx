import "./App.css";

import Navbar from "./components/Navbar.jsx";
import "./components/Navbar.css";
import Hero from "./components/Hero.jsx";
import "./components/Hero.css";
import About from "./components/About.jsx";
import "./components/About.css";
import Timeline from "./components/Timeline";
import "./components/Timeline.css";
import Projects from "./components/Projects.jsx";
import "./components/Projects.css";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <Timeline />

      <Projects />

      <Contact />

      <Footer />
    </>
  );
}

export default App;