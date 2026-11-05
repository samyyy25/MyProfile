import { motion } from "framer-motion";
import { LuLayoutGrid, LuNetwork } from "react-icons/lu";
import Magnetic from "./Magnetic";

/** Bottom-left switch between the graph universe and the grid explorer. */
export default function ViewToggle({ view, onChange }) {
  const options = [
    { id: "graph", label: "Universe", icon: LuNetwork },
    { id: "grid", label: "Grid", icon: LuLayoutGrid },
  ];
  return (
    <Magnetic strength={0.15}>
      <div className="view-toggle" role="group" aria-label="Choose how to explore">
        {options.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="view-toggle__btn"
            aria-pressed={view === id}
            onClick={() => onChange(id)}
          >
            {view === id && (
              <motion.span
                layoutId="view-toggle-pill"
                className="view-toggle__pill"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </Magnetic>
  );
}
