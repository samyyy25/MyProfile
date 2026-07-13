import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <h2>Samriddhi Tripathi</h2>

      <p>
        Full Stack Developer • React Enthusiast • Python Learner
      </p>

      <small>
        © {new Date().getFullYear()} Samriddhi Tripathi.
        All Rights Reserved.
      </small>

    </footer>
  );
}

export default Footer;