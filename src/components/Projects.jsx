import "./Projects.css";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt
} from "react-icons/fa";

const projects = [
  {
    title: "FittyFit",
    image: "/public/fittyfit.png",
    description:
      "Fitness web application developed during a Hackathon. Designed to encourage a healthy lifestyle with a clean and responsive interface.",
    tech: [
      "React",
      "Bootstrap",
      "JavaScript",
      "CSS"
    ],
    github: "",
    live: "https://fittyfitt.vercel.app/",
    featured: true
  },

  {
    title: "Bank Management System",
    image: "/public/privatebank.png",
    description:
      "Full Stack Banking Application developed during Software Development Summer Training using Flask, Python, MySQL and Bootstrap.",
    tech: [
      "Python",
      "Flask",
      "MySQL",
      "Bootstrap",
      "Jinja"
    ],
    github:
      "https://github.com/samyyy25/Bank_Management_System",
    live: ""
  },

  {
    title: "Portfolio Website",
    image: "/public/portfolio.png",
    description:
      "Personal portfolio showcasing my projects, achievements, skills and professional journey.",
    tech: [
      "React",
      "Framer Motion",
      "Bootstrap"
    ],
    github:
      "https://github.com/samyyy25/Myportfolio",
    live: ""
  },

  {
    title: "Task Manager",
    image: "/public/task.png",
    description:
      "Responsive task management application demonstrating CRUD operations and clean UI design.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    github:
      "https://github.com/samyyy25/task1",
    live: ""
  }
];

function Projects() {
  return (
    <section
      className="projects"
      id="projects"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Featured Projects
      </motion.h2>

      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.div
            className={`project-card ${
              project.featured ? "featured" : ""
            }`}
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="project-image">
              <img
                src={project.image}
                alt={project.title}
              />
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-stack">
                {project.tech.map((tech, i) => (
                  <span key={i}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="buttons">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;