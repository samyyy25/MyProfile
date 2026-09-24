import "./Hackathons.css";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaAward, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const hackathons = [
  {
    icon: <FaMedal />,
    badge: "🥈 2nd Position",
    title: "NERDS ROOM: LAUNCH HACKS",
    location: "AIMT, Lucknow",
    date: "Aug 19",
    description:
      "A full-day hackathon by Nerds Room, supported by FlutterFlow. Built an AI Sales Agent platform to help businesses handle leads through AI-powered voice calls and WhatsApp conversations — all in one place. Built and pitched the entire product in a single day, including last-minute fixes before presenting."
  },
  {
  icon: <FaMedal />,
  badge: "🥉 2nd Runner-Up",
  title: "TNX CODATHON",
  location: "SRMCEM, Lucknow",
  date: "Sep 16",
  description:
    "Secured 2nd Runner-Up at the TNX CODATHON held at SRMCEM, Lucknow, as part of Team Cookies. Worked collaboratively on developing and refining our solution within a limited time frame, contributing to the product development, UI design, feature integration, testing, and final presentation. The hackathon challenged us to turn our idea into a working solution while solving problems under time constraints and adapting quickly to feedback from mentors and judges. Our efforts earned us a place among the top-performing teams at the event."
  },
  {
    icon: <FaTrophy />,
    badge: "🏆 5th Position, $100 Prize",
    title: "HackWithUP 2.0 — RocketRide Buildathon",
    location: "Lucknow",
    date: "Recent",
    description:
      "Competed as Team TECHDIVAS against 500+ teams; advanced to the Grand Finale as one of the top 50+ teams."
  },
  {
    icon: <FaAward />,
    badge: "🏅 4th Position among 50 Teams",
    title: "Inter College Hackathon",
    location: "Lucknow",
    date: "Hackathon Achievement",
    description:
      "Built FittyFit, an innovative fitness platform, with a team of collaborators."
  }
];

function Hackathons() {
  return (
    <section className="hackathons-section" id="hackathons">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Hackathons & Achievements
      </motion.h2>

      <div className="hackathons-timeline">
        {hackathons.map((item, index) => (
          <motion.div
            className={`hackathon-item ${index % 2 === 0 ? "left" : "right"}`}
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hackathon-content">
              <div className="hackathon-top">
                <div className="hackathon-icon">{item.icon}</div>
                <div className="hackathon-badge">{item.badge}</div>
              </div>

              <div className="hackathon-meta">
                {item.date && (
                  <span>
                    <FaCalendarAlt style={{ marginRight: "6px" }} />
                    {item.date}
                  </span>
                )}
                {item.location && (
                  <span>
                    <FaMapMarkerAlt style={{ marginRight: "6px" }} />
                    {item.location}
                  </span>
                )}
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Hackathons;
