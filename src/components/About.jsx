import "./About.css";
import { motion } from "framer-motion";

import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaBootstrap, 
  FaNodeJs
} from "react-icons/fa";

import {
  SiFlask,
  SiMysql,
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiVercel,
  SiRender,
  SiRailway,
  SiAuth0
} from "react-icons/si";

const skills = [
  {
    icon: <FaHtml5 />,
    title: "HTML5"
  },
  {
    icon: <FaCss3Alt />,
    title: "CSS3"
  },
  {
    icon: <FaJs />,
    title: "JavaScript"
  },
  {
    icon: <FaReact />,
    title: "React"
  },
  {
    icon: <FaBootstrap />,
    title: "Bootstrap"
  },
  {
    icon: <FaPython />,
    title: "Python"
  },
  {
    icon: <SiFlask />,
    title: "Flask"
  },
  {
    icon: <SiMysql />,
    title: "MySQL"
  },
  {
    icon: <FaGitAlt />,
    title: "Git"
  },
  {
    icon: <FaGithub />,
    title: "GitHub"
  },
 {
  icon: "🎨",
  title: "Canva"
},

  {
    icon: <FaReact />,
    title: "React.js",
  },
  {
    icon: <SiNextdotjs />,
    title: "Next.js",
  },
  {
    icon: <FaNodeJs />,
    title: "Node.js",
  },
  {
    icon: <SiExpress />,
    title: "Express.js",
  },
  {
    icon: <SiTailwindcss />,
    title: "Tailwind CSS",
  },
   {
    icon: <SiPostgresql />,
    title: "PostgreSQL",
  },
  {
    icon: <SiPrisma />,
    title: "Prisma ORM",
  },
  {
    icon: "🔗",
    title: "REST APIs",
  },
  {
    icon: <SiAuth0 />,
    title: "NextAuth.js",
  },
  {
    icon: <SiVercel />,
    title: "Vercel",
  },
  {
    icon: <SiRender />,
    title: "Render",
  },
  {
    icon: <SiRailway />,
    title: "Railway",
  },
  {
    icon: "📱",
    title: "Responsive Design",
  }
];

function About() {
  return (
    <section
      className="about"
      id="about"
    >
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          About Me
        </motion.h2>

        <div className="about-wrapper">

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >

            <h3>
              Full Stack Developer &
              Creative Problem Solver
            </h3>

            <p>
              I'm Samriddhi Tripathi, a passionate
              Full Stack Developer currently pursuing
              B.Tech in Information Technology.
            </p>

            <p>
              I'm currently undergoing Software
              Development Summer Training at
              Shri Ramswaroop Digital Technologies Pvt. Ltd.
              where I build real-world projects using
              Python, Flask, MySQL and modern web technologies.
            </p>

            <p>
              I enjoy designing beautiful user
              interfaces while building efficient
              backend systems.
            </p>

            <div className="stats">

              <div className="stat-card">
                <h1>6+</h1>
                <span>Projects</span>
              </div>

              <div className="stat-card">
                <h1>15+</h1>
                <span>Skills</span>
              </div>

              <div className="stat-card">
                <h1>4th</h1>
                <span>Hackathon Rank</span>
              </div>

            </div>

          </motion.div>

          <motion.div
            className="skills-grid"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >

            {
              skills.map((skill, index) => (

                <div
                  className="skill-card"
                  key={index}
                >
                  <div className="icon">
                    {skill.icon}
                  </div>

                  <h4>
                    {skill.title}
                  </h4>

                </div>

              ))
            }

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;
