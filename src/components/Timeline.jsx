import "./Timeline.css";
import { motion } from "framer-motion";
import { title } from "framer-motion/client";
import {
  FaBriefcase,
  FaGraduationCap,
  FaTrophy
} from "react-icons/fa";

const timeline = [
  {
    icon: <FaBriefcase />,
    year: "July 2026",
    title: "Software Development Summer Trainee",
    company: "Shri Ramswaroop Digital Technologies Pvt. Ltd.",
    description:
      "Currently undergoing Software Development Summer Training focused on Full Stack Development. Working with Python, Flask, MySQL, Git, GitHub, Bootstrap and modern frontend technologies while building real-world applications."
  },

  {
    icon: <FaBriefcase />,
    year: "July 2026",
    title: "Generative AI Mastermind",
    company: "OutSkill",
    description: "Completed a 2-day Generative AI Mastermind by Outskill, where I explored Generative AI tools, prompt engineering, AI-powered marketing, SEO automation, and image/video generation. Through over 16 hours of intensive learning, I gained practical knowledge of Large Language Models, including tokenization, embeddings, self-attention, and response generation, while learning how to apply AI effectively in software development and productivity workflows."
  },

  {
    icon: <FaBriefcase />,
    year: "July 2025",
    title: "IBM Developer Skills Network",
    company: "Virtual Internship",
    description:
      "Completed IBM's Virtual Internship on Full Stack Web Development, Mobile Development and Digital Marketing. Learned frontend, backend integration, responsive UI and deployment."
  },

  {
    icon: <FaTrophy />,
    year: "Hackathon Achievement",
    title: "4th Position among 50 Teams",
    company: "Inter College Hackathon",
    description:
      "Worked with my teammates to develop FittyFit, an innovative fitness platform. Secured 4th position among more than 50 participating teams."
  },

  {
  icon: <FaBriefcase />,
  year: "Aug 2025",
  title: "Full-Stack Development Summer Trainee",
  company: "Shri Ramswaroop Digital Technologies Pvt. Ltd. (SRDT Pvt. Ltd.)",
  description:
    "Completed a Full-Stack Development Summer Training focused on Python and modern web technologies. Developed frontend components, backend logic, and basic API integrations while strengthening practical skills in database management, version control (Git & GitHub), and responsive UI development."
},

  {
    icon: <FaGraduationCap />,
    year: "2024 - 2028",
    title: "Bachelor of Technology",
    company: "Shree Ramswaroop Memorial College of Engineering",
    description:
      "Currently pursuing B.Tech in Information Technology while continuously improving programming and software development skills."
  }
];

function Timeline() {
  return (
    <section className="timeline-section" id="experience">

      <motion.h2
        initial={{opacity:0,y:50}}
        whileInView={{opacity:1,y:0}}
      >
        Experience & Journey
      </motion.h2>

      <div className="timeline">

        {timeline.map((item,index)=>(

          <motion.div
            className={`timeline-item ${index%2===0 ? "left":"right"}`}
            key={index}
            initial={{opacity:0,y:80}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:.6}}
          >

            <div className="timeline-content">

              <div className="timeline-icon">
                {item.icon}
              </div>

              <span>{item.year}</span>

              <h3>{item.title}</h3>

              <h4>{item.company}</h4>

              <p>{item.description}</p>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Timeline;