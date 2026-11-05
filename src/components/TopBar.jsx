import { LuDownload, LuMail } from "react-icons/lu";
import { profile } from "../data/portfolioData";
import FocusSelector from "./FocusSelector";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

/** Floating top chrome: monogram + focus selector on the left, theme / resume / contact on the right. */
export default function TopBar({ theme, onToggleTheme, focus, onFocusChange, onContact, onHome }) {
  return (
    <header className="topbar">
      <div className="topbar__group">
        <Magnetic strength={0.25}>
          <button type="button" className="logo" onClick={onHome} aria-label={`${profile.name} — back to start`}>
            {profile.initials}
          </button>
        </Magnetic>
        <FocusSelector focus={focus} onChange={onFocusChange} />
      </div>

      <div className="topbar__group">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Magnetic strength={0.2}>
          <a
            className="chrome-btn chrome-btn--pill"
            href={profile.resume}
            download={profile.resumeFilename}
            aria-label="Download resume"
          >
            <LuDownload aria-hidden="true" />
            <span className="chrome-btn__text">Resume</span>
          </a>
        </Magnetic>
        <Magnetic strength={0.2}>
          <button type="button" className="chrome-btn chrome-btn--pill chrome-btn--solid" onClick={onContact} aria-label="Contact">
            <LuMail aria-hidden="true" />
            <span className="chrome-btn__text">Contact</span>
          </button>
        </Magnetic>
      </div>
    </header>
  );
}
