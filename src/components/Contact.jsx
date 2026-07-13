import "./Contact.css";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  return (
    <section className="contact" id="contact">

      <div className="contact-heading">
        <span>LET'S CONNECT</span>
        <h2>Let's Build Something Amazing Together</h2>
        <p>
          I'm currently looking for internship opportunities,
          exciting projects and collaborations.
        </p>
      </div>

      <div className="contact-wrapper">

        <div className="contact-info">

          <div className="info-card">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>tripathisamriddhi20@gmail.com</p>
            </div>
          </div>

          <div className="info-card">
            <FaPhoneAlt />
            <div>
              <h4>Phone</h4>
              <p>+91 95808 83197</p>
            </div>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt />
            <div>
              <h4>Location</h4>
              <p>Uttar Pradesh, India</p>
            </div>
          </div>

        </div>

        <div className="contact-social">

          <a
            href="https://github.com/samyyy25"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/samriddhi-tripathi-b41029341"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>

          <a href="mailto:tripathisamriddhi20@gmail.com">
            <FaEnvelope />
            Email Me
          </a>

        </div>

      </div>

    </section>
  );
}

export default Contact;