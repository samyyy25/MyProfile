import "./Projects.css";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt
} from "react-icons/fa";

const projects = [
  {
    title: "Scholarly — School ERP Management System",
    image: "/scholarly.png",
    description:
      "A production-ready, role-based School ERP platform with dedicated dashboards for Admins, Faculty, and Students to efficiently manage attendance, exams, marks, timetables, assignments, fees, notices, and academic records. Includes secure authentication, role-specific access, centralized student and staff management, real-time academic insights, and a streamlined interface for managing everyday school operations.",
    tech: [
      "Next.js 14",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth.js",
      "Tailwind CSS"
    ],
    github: "https://github.com/samyyy25/school-erp",
    live: "https://scholarlyerp.vercel.app/",
    featured: true
  },
  {
    title: "SQUAWK — AI-Powered Aircraft Recovery System",
    image: "/squawk.png",
    description:
      "When an aircraft is grounded (AOG), every minute of downtime costs an airline money. SQUAWK replaces the slow, manual 7-step recovery process with three collaborating AI agents — Sourcing, Documentation, and Logistics — plus a Validator that cross-checks pricing, compliance, and risk. It turns a defect report into a vetted recovery plan in minutes, with a human always making the final airworthiness call. \"AI suggests. Human decides.\"",
    tech: [
      "AI Agents",
      "Python",
      "FastAPI",
      "Next.js",
      "Risk Validation"
    ],
    github: "https://github.com/samyyy25/squawk",
    live: ""
  },
  {
    title: "RELAY — AI Emergency Interpreter",
    image: "/relay.png",
    description:
      "An AI-powered emergency communication platform that helps people communicate with responders during high-stress situations. Combines real-time voice AI, AI video triage (detects accidents, falls, injuries, drowsiness), multilingual translation, live GPS sharing, nearest hospital/police finder, and a responder bridge that shares incident summaries and context in real time. \"RELAY ensures communication doesn't fail when everything else does.\"",
    tech: [
      "Real-time Voice AI",
      "Video Triage",
      "GPS Tracking",
      "Next.js",
      "FastAPI"
    ],
    github: "https://github.com/samyyy25/Relay",
    live: ""
  },
  {
    title: "SalesPilot AI — Autonomous AI Sales Employee",
    image: "/salespilot.png",
    description:
      "A multi-agent AI sales employee built with LangGraph and FastAPI. It interviews you about your business, sources and qualifies leads, writes personalized outreach, runs simulated voice calls and WhatsApp conversations, manages a Kanban-style CRM pipeline, and reports on performance — all through a 9-agent pipeline orchestrated end to end. Built at a team hackathon (Team Cookies) as a fully working demo requiring zero setup.",
    tech: [
      "LangGraph",
      "FastAPI",
      "Python",
      "Anthropic",
      "OpenAI",
      "Groq"
    ],
    github: "https://github.com/samyyy25/SalesPilot-AI",
    live: ""
  },
  {
    title: "Vintner Finance — Voice-Powered AI Finance Assistant",
    image: "/vintner.png",
    description:
      "A personal finance dashboard built around a conversational voice AI assistant. Users log in and talk directly to their finances — asking questions like \"How much did I spend today?\" — while the dashboard surfaces total balance, income vs. expenses, category-wise spending breakdowns, live savings tips, and personalized insights. Includes a live voice-call interface for hands-free transaction logging, plus complete transactions, insights, schemes, and analytics views.",
    tech: [
      "Next.js",
      "Voice AI / Web Speech API",
      "FastAPI",
      "Tailwind CSS",
      "Analytics"
    ],
    github: "https://github.com/samyyy25/VINTNER-FINANCE",
    live: ""
  },
  {
    title: "FittyFit",
    image: "/fittyfit.png",
    description:
      "A smart fitness and wellness platform designed to help users track and manage their fitness journey. Users can monitor their health and fitness activities through an interactive dashboard, access personalized workout and nutrition guidance, track progress, and get insights to stay consistent with their goals. Includes an intuitive fitness dashboard, personalized recommendations, progress tracking, and tools to support a healthier lifestyle.",
    tech: [
      "React",
      "Bootstrap",
      "JavaScript",
      "CSS"
    ],
    github: "",
    live: "https://fittyfitt.vercel.app/"
  },

  {
    title: "Pulse – Task Management System",
    image: "/task.png",
    description:
      "Pulse – Task Management System is a full-stack web application designed for companies and employees to efficiently manage daily tasks and improve team productivity. It features secure authentication, task creation, updates, deletion, and tracking through an intuitive interface. Built with React, Node.js, Express.js, PostgreSQL, and Tailwind CSS, the application is deployed using Vercel, Render, and Railway, providing hands-on experience in full-stack development, REST APIs, authentication, and cloud deployment",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    github:
      "https://github.com/samyyy25/pulse-task-management",
    live: "https://pulse-task-management-82rn.vercel.app/"
  },
  {
    title: "LogBook – Tech Blogging Platform",
    image: "/blog.png",
    description:
      "LogBook is a full-stack tech blogging platform that enables users to read, create, edit, and manage blog posts through a secure authentication system. Built with Next.js, TypeScript, PostgreSQL, Prisma ORM, and NextAuth.js, it features responsive design, protected routes, RESTful architecture, and efficient database management. The application is deployed on Vercel and provides hands-on experience in full-stack development, authentication, database integration, and modern web technologies.",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth.js",
      "Tailwind CSS"
    ],
    github: "https://github.com/samyyy25/blog",
    live: "https://blog-six-zeta-35.vercel.app/"
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
            className={`project-card ${project.featured ? "featured" : ""
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