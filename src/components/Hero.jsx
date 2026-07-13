import "./Hero.css";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import profile from "../assets/portfolio image.jpeg";
import resume from "../assets/resume 2.pdf";
import { FaGithub, FaLinkedin, FaArrowDown } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">

      <div className="shape shape1"></div>
      <div className="shape shape2"></div>

      <div className="hero-left">

        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="welcome"
        >
          HELLO THERE 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          I'm <span>Samriddhi</span>
          <br />
          Tripathi
        </motion.h1>

        <TypeAnimation
          sequence={[
            "Full Stack Developer",
            2000,
            "React Developer",
            2000,
            "UI Designer",
            2000,
            "Python Enthusiast",
            2000,
          ]}
          speed={40}
          repeat={Infinity}
          className="typing"
        />

        <motion.p
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
        >
          Passionate about building beautiful,
          responsive and user-friendly web
          applications using modern technologies.
          Currently pursuing Software Development
          Summer Training while continuously
          learning Full Stack Development.
        </motion.p>

        <div className="hero-buttons">

          <a href={resume} download>
            <button className="btn primary">
              Download Resume
            </button>
          </a>

          <a href="#projects">
            <button className="btn secondary">
              View Projects
            </button>
          </a>

        </div>

        <div className="socials">

          <a
            href="https://github.com/samyyy25"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/samriddhi-tripathi-b41029341"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

        </div>

      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity:0, scale:.8 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:1 }}
      >

        <div className="blob">

          <img
            src={profile}
            alt="Samriddhi"
          />

        </div>

        <div className="floating-card">

          🏆

          <h3>Hackathon</h3>

          <p>
            4th Position
            <br />
            among 50 Teams
          </p>

        </div>

      </motion.div>

      <a href="#about" className="scroll">

        <FaArrowDown />

      </a>

    </section>
  );
}

export default Hero;