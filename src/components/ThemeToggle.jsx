import { AnimatePresence, motion } from "framer-motion";
import { LuMoon, LuSun } from "react-icons/lu";
import Magnetic from "./Magnetic";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  const handleClick = (event) => {
    const r = event.currentTarget.getBoundingClientRect();
    onToggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <Magnetic strength={0.25}>
      <button
        type="button"
        className="chrome-btn chrome-btn--round theme-toggle"
        onClick={handleClick}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        title={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            className="theme-toggle__icon"
            initial={{ rotate: -80, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 80, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {isDark ? <LuMoon aria-hidden="true" /> : <LuSun aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}
