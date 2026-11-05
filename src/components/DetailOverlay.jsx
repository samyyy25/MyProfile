import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FULL = "inset(0px 0px 0px 0px round 0px)";
const EASE = [0.22, 1, 0.36, 1];

const insetFrom = (o) =>
  `inset(${Math.max(0, o.t)}px ${Math.max(0, o.r)}px ${Math.max(0, o.b)}px ${Math.max(0, o.l)}px round 20px)`;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen dialog that grows out of the card that opened it (a clip-path reveal from the
 * card's rectangle) and shrinks back into it on close. Handles Escape, focus trapping and
 * returning focus to the opener. `origin` is the card's insets `{t, r, b, l}` or null.
 */
export default function DetailOverlay({ label, origin, reduced, inert, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const root = ref.current;
    // Detail content is lazy-loaded and focuses its own back button on mount (autoFocus);
    // until then, the dialog itself holds focus so keyboard users are never left behind it.
    if (!root.contains(document.activeElement)) root.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = [...root.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [onClose]);

  const variants = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.12 } },
      }
    : origin
      ? {
          initial: { clipPath: insetFrom(origin) },
          animate: { clipPath: FULL, transition: { duration: 0.65, ease: EASE } },
          exit: {
            clipPath: insetFrom(origin),
            opacity: 0,
            transition: { clipPath: { duration: 0.5, ease: EASE }, opacity: { delay: 0.38, duration: 0.14 } },
          },
        }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
          exit: { opacity: 0, y: 20, transition: { duration: 0.28 } },
        };

  return (
    <motion.div
      ref={ref}
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      inert={inert}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
