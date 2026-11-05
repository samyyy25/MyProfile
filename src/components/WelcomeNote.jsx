import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";
import { profile } from "../data/portfolioData";

/** Discreet first-visit introduction. Dismisses on the first canvas interaction. */
export default function WelcomeNote({ visible, onDismiss }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="welcome"
          aria-label="Introduction"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
        >
          <button type="button" className="welcome__close" onClick={onDismiss} aria-label="Dismiss introduction">
            <LuX aria-hidden="true" />
          </button>
          <p className="welcome__title">Hi, I'm {profile.name.split(" ")[0]}.</p>
          <p className="welcome__text">{profile.headline}</p>
          <p className="welcome__text welcome__text--dim">
            Explore my professional universe — every node connects to something I've built or learned.
          </p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
