import "./Navbar.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        ST.
      </div>

      <ul>

        <li><a href="#home">Home</a></li>

        <li><a href="#about">About</a></li>

        <li><a href="#projects">Projects</a></li>

        <li><a href="#experience">Experience</a></li>

        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="icons">

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

    </nav>
  );
}

export default Navbar;