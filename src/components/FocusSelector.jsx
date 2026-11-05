import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { focusCategories } from "../data/portfolioData";

/** "SHIFT YOUR FOCUS" menu: re-frames the graph (or switches the explorer tab) to one theme. */
export default function FocusSelector({ focus, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuId = useId();
  const current = focusCategories.find((c) => c.id === focus);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  // Move focus into the menu on open.
  useEffect(() => {
    if (!open) return;
    const items = rootRef.current?.querySelectorAll('[role="menuitemradio"]');
    const checked = rootRef.current?.querySelector('[role="menuitemradio"][aria-checked="true"]');
    (checked ?? items?.[0])?.focus();
  }, [open]);

  const onMenuKeyDown = (event) => {
    const items = [...rootRef.current.querySelectorAll('[role="menuitemradio"]')];
    const index = items.indexOf(document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1].focus();
    } else if (event.key === "Escape") {
      event.stopPropagation();
      close();
    } else if (event.key === "Tab") {
      close(false);
    }
  };

  const choose = (id) => {
    onChange(id);
    close();
  };

  return (
    <div className="focus" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="focus__button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="focus__dots" aria-hidden="true">
          {(current?.accents ?? ["neutral"]).map((a) => (
            <i key={a} data-accent={a} />
          ))}
        </span>
        <span className="focus__label">
          {current ? (
            current.label
          ) : (
            <>
              <span className="focus__long">Shift your </span>focus
            </>
          )}
        </span>
        <LuChevronDown className="focus__chevron" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Shift your focus"
            className="focus__menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onMenuKeyDown}
          >
            <button
              type="button"
              role="menuitemradio"
              aria-checked={!focus}
              className="focus__item"
              onClick={() => choose(null)}
            >
              <span className="focus__dots" aria-hidden="true">
                <i data-accent="neutral" />
              </span>
              Everything
            </button>
            {focusCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="menuitemradio"
                aria-checked={focus === c.id}
                className="focus__item"
                onClick={() => choose(c.id)}
              >
                <span className="focus__dots" aria-hidden="true">
                  {c.accents.map((a) => (
                    <i key={a} data-accent={a} />
                  ))}
                </span>
                {c.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
